import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

export default function ActivityForm() {
  const user = useRecoilValue(UserAtom);
  const [type, setType] = useState<
    "transport" | "energy" | "food" | "waste" | "water"
  >("transport");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default date as current date (YYYY-MM-DD)
  const [formData, setFormData] = useState<any>({
    transport: {
      mode: "",
      distance: 0,
      fuelType: "",
      fuelEfficiency: 0,
      emissions: 0,
    },
    energy: {
      electricityConsumption: 0,
      renewablePercentage: 0,
      cookingFuelType: "",
      cookingFuelConsumption: 0,
      emissions: 0,
    },
    food: {
      dietType: "",
      weeklyMeatConsumption: 0,
      foodWaste: 0,
      emissions: 0,
    },
    waste: { weeklyWasteGenerated: 0, recyclingPercentage: 0, emissions: 0 },
    water: { dailyUsage: 0, heatedPercentage: 0, emissions: 0 },
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      [type]: formData[type],
      userId: user?.userId,
      date,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/carbon/save",
        payload
      );
      console.log("Activity logged successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Failed to log activity:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Log New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Activity Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 border rounded-md"
          >
            <option value="transport">Transport</option>
            <option value="energy">Energy</option>
            <option value="food">Food</option>
            <option value="waste">Waste</option>
            <option value="water">Water</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Select the type of activity you want to log.
          </p>
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">
          {/* Render fields based on activity type */}
          {type === "transport" && (
            <>
              <input
                type="text"
                placeholder="e.g., Car, Bus, Bicycle"
                value={formData.transport.mode}
                onChange={(e) => handleFieldChange("mode", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Mode of transport you used (e.g., Car, Bus, Bicycle).
              </p>

              <input
                type="number"
                placeholder="Distance in kilometers"
                value={formData.transport.distance}
                onChange={(e) => handleFieldChange("distance", +e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Total distance traveled in kilometers.
              </p>

              <input
                type="text"
                placeholder="e.g., Diesel, Petrol, Electric"
                value={formData.transport.fuelType}
                onChange={(e) => handleFieldChange("fuelType", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Fuel type used (e.g., Diesel, Petrol, Electric).
              </p>

              <input
                type="number"
                placeholder="e.g., 15 for 15 km/l"
                value={formData.transport.fuelEfficiency}
                onChange={(e) =>
                  handleFieldChange("fuelEfficiency", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Fuel efficiency of your vehicle in kilometers per liter (km/l).
              </p>

              <input
                type="number"
                placeholder="Emissions in kg CO2"
                value={formData.transport.emissions}
                onChange={(e) =>
                  handleFieldChange("emissions", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Estimated CO2 emissions for this journey in kilograms.
              </p>
            </>
          )}

          {type === "energy" && (
            <>
              <input
                type="number"
                placeholder="Total electricity consumption in kWh"
                value={formData.energy.electricityConsumption}
                onChange={(e) =>
                  handleFieldChange("electricityConsumption", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Electricity consumption for the period in kilowatt-hours (kWh).
              </p>

              <input
                type="number"
                placeholder="Renewable energy percentage"
                value={formData.energy.renewablePercentage}
                onChange={(e) =>
                  handleFieldChange("renewablePercentage", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Percentage of electricity sourced from renewable energy.
              </p>

              <input
                type="text"
                placeholder="e.g., Gas, Electric"
                value={formData.energy.cookingFuelType}
                onChange={(e) =>
                  handleFieldChange("cookingFuelType", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Type of fuel used for cooking (e.g., Gas, Electric).
              </p>

              <input
                type="number"
                placeholder="Cooking fuel consumption in kWh"
                value={formData.energy.cookingFuelConsumption}
                onChange={(e) =>
                  handleFieldChange("cookingFuelConsumption", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Amount of cooking fuel consumed in kilowatt-hours (kWh).
              </p>

              <input
                type="number"
                placeholder="Emissions in kg CO2"
                value={formData.energy.emissions}
                onChange={(e) =>
                  handleFieldChange("emissions", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Estimated CO2 emissions for energy consumption in kilograms.
              </p>
            </>
          )}

          {type === "food" && (
            <>
              <input
                type="text"
                placeholder="e.g., Vegan, Vegetarian"
                value={formData.food.dietType}
                onChange={(e) => handleFieldChange("dietType", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Type of diet you follow (e.g., Vegan, Vegetarian).
              </p>

              <input
                type="number"
                placeholder="Weekly meat consumption in kg"
                value={formData.food.weeklyMeatConsumption}
                onChange={(e) =>
                  handleFieldChange("weeklyMeatConsumption", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Amount of meat consumed weekly in kilograms.
              </p>

              <input
                type="number"
                placeholder="Food waste in kg"
                value={formData.food.foodWaste}
                onChange={(e) =>
                  handleFieldChange("foodWaste", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Amount of food wasted in kilograms.
              </p>

              <input
                type="number"
                placeholder="Emissions in kg CO2"
                value={formData.food.emissions}
                onChange={(e) =>
                  handleFieldChange("emissions", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Estimated CO2 emissions for food consumption in kilograms.
              </p>
            </>
          )}

          {type === "waste" && (
            <>
              <input
                type="number"
                placeholder="Weekly waste generated in kg"
                value={formData.waste.weeklyWasteGenerated}
                onChange={(e) =>
                  handleFieldChange("weeklyWasteGenerated", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Amount of waste generated weekly in kilograms.
              </p>

              <input
                type="number"
                placeholder="Recycling percentage"
                value={formData.waste.recyclingPercentage}
                onChange={(e) =>
                  handleFieldChange("recyclingPercentage", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Percentage of waste that is recycled.
              </p>

              <input
                type="number"
                placeholder="Emissions in kg CO2"
                value={formData.waste.emissions}
                onChange={(e) =>
                  handleFieldChange("emissions", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Estimated CO2 emissions for waste in kilograms.
              </p>
            </>
          )}

          {type === "water" && (
            <>
              <input
                type="number"
                placeholder="Daily water usage in liters"
                value={formData.water.dailyUsage}
                onChange={(e) =>
                  handleFieldChange("dailyUsage", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Amount of water used daily in liters.
              </p>

              <input
                type="number"
                placeholder="Heated water percentage"
                value={formData.water.heatedPercentage}
                onChange={(e) =>
                  handleFieldChange("heatedPercentage", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Percentage of water used for heating.
              </p>

              <input
                type="number"
                placeholder="Emissions in kg CO2"
                value={formData.water.emissions}
                onChange={(e) =>
                  handleFieldChange("emissions", +e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-500">
                Estimated CO2 emissions for water usage in kilograms.
              </p>
            </>
          )}
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Log Activity
        </button>
      </form>
    </div>
  );
}
