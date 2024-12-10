import mongoose, { Schema, Document } from "mongoose";

interface Transport {
  mode: string;
  distance: number;
  fuelType: string;
  fuelEfficiency: number;
  emissions: number;
}

interface Energy {
  electricityConsumption: number;
  renewablePercentage: number;
  cookingFuelType: string;
  cookingFuelConsumption: number;
  emissions: number;
}

interface Food {
  dietType: string;
  weeklyMeatConsumption: number;
  foodWaste: number;
  emissions: number;
}

interface Waste {
  weeklyWasteGenerated: number;
  recyclingPercentage: number;
  emissions: number;
}

interface Water {
  dailyUsage: number;
  heatedPercentage: number;
  emissions: number;
}

export interface ICarbonFootprint extends Document {
  userId: string;
  transport?: Transport;
  energy?: Energy;
  food?: Food;
  waste?: Waste;
  water?: Water;
  totalEmissions: number;
  date: Date;
}

const CarbonFootprintSchema: Schema = new Schema({
  userId: { type: String, required: true },
  transport: {
    mode: String,
    distance: Number,
    fuelType: String,
    fuelEfficiency: Number,
    emissions: Number,
  },
  energy: {
    electricityConsumption: Number,
    renewablePercentage: Number,
    cookingFuelType: String,
    cookingFuelConsumption: Number,
    emissions: Number,
  },
  food: {
    dietType: String,
    weeklyMeatConsumption: Number,
    foodWaste: Number,
    emissions: Number,
  },
  waste: {
    weeklyWasteGenerated: Number,
    recyclingPercentage: Number,
    emissions: Number,
  },
  water: {
    dailyUsage: Number,
    heatedPercentage: Number,
    emissions: Number,
  },
  totalEmissions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ICarbonFootprint>(
  "CarbonFootprint",
  CarbonFootprintSchema
);
