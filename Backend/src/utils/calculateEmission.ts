interface EmissionInputs {
  transport?: {
    distance: number;
    fuelEfficiency: number;
    emissionFactor: number; // e.g., kg CO2/l for fuel
  };
  energy?: {
    electricityConsumption: number;
    renewablePercentage: number; // e.g., 20% as 0.2
    emissionFactor: number; // e.g., kg CO2/kWh
  };
  food?: {
    weeklyMeatConsumption: number; // kg
    foodWaste: number; // kg
    meatEmissionFactor: number; // e.g., kg CO2/kg
    wasteEmissionFactor: number; // e.g., kg CO2/kg
  };
  waste?: {
    weeklyWasteGenerated: number; // kg
    recyclingPercentage: number; // e.g., 50% as 0.5
    wasteEmissionFactor: number; // e.g., kg CO2/kg
  };
  water?: {
    dailyUsage: number; // liters
    heatedPercentage: number; // e.g., 30% as 0.3
    waterEmissionFactor: number; // e.g., kg CO2/liter
  };
}

export const calculateEmissions = ({
  transport,
  energy,
  food,
  waste,
  water,
}: EmissionInputs): number => {
  let totalEmissions = 0;

  // Transport
  if (transport) {
    const { distance, fuelEfficiency, emissionFactor } = transport;
    totalEmissions += (distance / fuelEfficiency) * emissionFactor || 0;
  }

  // Energy
  if (energy) {
    const { electricityConsumption, renewablePercentage, emissionFactor } =
      energy;
    totalEmissions +=
      electricityConsumption * emissionFactor * (1 - renewablePercentage) || 0;
  }

  // Food
  if (food) {
    const {
      weeklyMeatConsumption,
      foodWaste,
      meatEmissionFactor,
      wasteEmissionFactor,
    } = food;
    totalEmissions +=
      weeklyMeatConsumption * meatEmissionFactor +
        foodWaste * wasteEmissionFactor || 0;
  }

  // Waste
  if (waste) {
    const { weeklyWasteGenerated, recyclingPercentage, wasteEmissionFactor } =
      waste;
    totalEmissions +=
      weeklyWasteGenerated * (1 - recyclingPercentage) * wasteEmissionFactor ||
      0;
  }

  // Water
  if (water) {
    const { dailyUsage, heatedPercentage, waterEmissionFactor } = water;
    totalEmissions += dailyUsage * heatedPercentage * waterEmissionFactor || 0;
  }

  return totalEmissions;
};
