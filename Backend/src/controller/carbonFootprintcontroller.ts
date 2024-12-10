import { Request, Response } from "express";
import CarbonFootprint from "../models/carbonFootprintmodel";
import { ICarbonFootprint } from "../models/carbonFootprintmodel";
import { calculateEmissions } from "../utils/calculateEmission";

// Save carbon footprint data (including daily calculations)
export const saveCarbonFootprint = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, transport, energy, food, waste, water } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Emission factors (adjust based on your data)
    const emissionFactors = {
      transport: { emissionFactor: 2.31 }, // kg CO2 per liter for petrol
      energy: { emissionFactor: 0.5 }, // kg CO2 per kWh
      food: {
        meatEmissionFactor: 27.0, // kg CO2 per kg of meat
        wasteEmissionFactor: 0.5, // kg CO2 per kg of waste
      },
      waste: { wasteEmissionFactor: 1.2 }, // kg CO2 per kg of waste
      water: { waterEmissionFactor: 0.002 }, // kg CO2 per liter
    };

    const totalEmissions = calculateEmissions({
      transport: { ...transport, ...emissionFactors.transport },
      energy: { ...energy, ...emissionFactors.energy },
      food: { ...food, ...emissionFactors.food },
      waste: { ...waste, ...emissionFactors.waste },
      water: { ...water, ...emissionFactors.water },
    });

    const carbonFootprint: ICarbonFootprint = new CarbonFootprint({
      userId,
      transport,
      energy,
      food,
      waste,
      water,
      totalEmissions,
      date: new Date(), // Save current date for daily aggregation
    });

    await carbonFootprint.save();
    res.status(201).json({
      message: "Carbon Footprint saved successfully.",
      carbonFootprint,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error saving data.", details: error.message });
  }
};

// Retrieve Quick Stats for daily data
export const getQuickStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Fetch daily emissions
    const dailyData = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          emissions: { $sum: "$totalEmissions" },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: { $substr: ["$_id.month", 0, 2] } },
              "-",
              { $toString: { $substr: ["$_id.day", 0, 2] } },
            ],
          },
          emissions: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Fetch total emissions
    const totalEmissions = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalEmissions" },
        },
      },
    ]);

    const totalEmissionValue = totalEmissions[0]?.total || 0;

    // Fetch emissions by category
    const categoryData = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          transport: { $sum: "$transport.emissions" },
          energy: { $sum: "$energy.emissions" },
          food: { $sum: "$food.emissions" },
          waste: { $sum: "$waste.emissions" },
          water: { $sum: "$water.emissions" },
        },
      },
    ]);

    const categoryStats = categoryData[0] || {
      transport: 0,
      energy: 0,
      food: 0,
      waste: 0,
      water: 0,
    };

    res.status(200).json({
      message: "Quick stats retrieved successfully.",
      data: {
        dailyData, // Daily emissions with date
        totalEmissions: totalEmissionValue, // Total emissions
        categoryStats, // Emissions by category
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving quick stats.",
      details: error.message,
    });
  }
};

// Get carbon footprint data (daily emissions)
export const getCarbonFootprintData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Aggregate daily emissions
    const dailyEmissions = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          emissions: { $sum: "$totalEmissions" },
        },
      },
      {
        $project: {
          _id: 0,
          day: "$_id.day",
          month: "$_id.month",
          year: "$_id.year",
          emissions: 1,
        },
      },
      { $sort: { year: 1, month: 1, day: 1 } },
    ]);

    // Aggregate emissions by category for daily data
    const categoryEmissions = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $project: {
          transport: "$transport.emissions",
          energy: "$energy.emissions",
          food: "$food.emissions",
          waste: "$waste.emissions",
          water: "$water.emissions",
          date: 1, // Include date for daily aggregation
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          transport: { $sum: "$transport" },
          energy: { $sum: "$energy" },
          food: { $sum: "$food" },
          waste: { $sum: "$waste" },
          water: { $sum: "$water" },
        },
      },
      {
        $project: {
          _id: 0,
          day: "$_id.day",
          month: "$_id.month",
          year: "$_id.year",
          transport: { category: "Transport", value: "$transport" },
          energy: { category: "Energy", value: "$energy" },
          food: { category: "Food", value: "$food" },
          waste: { category: "Waste", value: "$waste" },
          water: { category: "Water", value: "$water" },
        },
      },
      { $unwind: "$transport" },
      { $unwind: "$energy" },
      { $unwind: "$food" },
      { $unwind: "$waste" },
      { $unwind: "$water" },
      { $replaceRoot: { newRoot: "$data" } },
    ]);

    res.status(200).json({
      message: "Daily carbon footprint data retrieved successfully.",
      data: { dailyEmissions, categoryEmissions },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving daily carbon footprint data.",
      details: error.message,
    });
  }
};

// Get emission breakdown for daily data
export const getEmissionBreakdown = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Aggregate emissions by category on a daily basis
    const breakdown = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $project: {
          transport: "$transport.emissions",
          energy: "$energy.emissions",
          food: "$food.emissions",
          waste: "$waste.emissions",
          water: "$water.emissions",
          date: 1, // Include date for breakdown
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          transport: { $sum: "$transport" },
          energy: { $sum: "$energy" },
          food: { $sum: "$food" },
          waste: { $sum: "$waste" },
          water: { $sum: "$water" },
        },
      },
      {
        $project: {
          _id: 0,
          breakdown: [
            { name: "Transport", value: "$transport" },
            { name: "Energy", value: "$energy" },
            { name: "Food", value: "$food" },
            { name: "Waste", value: "$waste" },
            { name: "Water", value: "$water" },
          ],
        },
      },
      { $unwind: "$breakdown" },
      { $replaceRoot: { newRoot: "$breakdown" } },
    ]);

    res.status(200).json(breakdown);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving daily emission breakdown.",
      details: error.message,
    });
  }
};

// Get emission trends for daily data
export const getDailyEmissionTrends = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const trends = await CarbonFootprint.aggregate([
      { $match: { userId } },
      {
        $project: {
          transport: { $ifNull: ["$transport.emissions", 0] },
          energy: { $ifNull: ["$energy.emissions", 0] },
          food: { $ifNull: ["$food.emissions", 0] },
          waste: { $ifNull: ["$waste.emissions", 0] },
          water: { $ifNull: ["$water.emissions", 0] },
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
        },
      },
      {
        $group: {
          _id: "$date",
          transport: { $sum: "$transport" },
          energy: { $sum: "$energy" },
          food: { $sum: "$food" },
          waste: { $sum: "$waste" },
          water: { $sum: "$water" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          transport: 1,
          energy: 1,
          food: 1,
          waste: 1,
          water: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    if (!trends.length) {
      res.status(404).json({
        message: "No daily emission trends found.",
        data: [],
      });
      return;
    }

    res.status(200).json({
      message: "Daily emission trends retrieved successfully.",
      data: trends,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving daily emission trends.",
      details: error.message,
    });
  }
};
