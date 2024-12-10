import Sidebar from "../components/Sidebar";
import {
  Car,
  Lightbulb,
  Apple,
  Home,
  ArrowRight,
  Recycle,
  Sun,
  Trash2,
  Phone,
} from "lucide-react";

const recommendations = [
  {
    category: "Transport",
    icon: <Car className="w-6 h-6 text-blue-500" />,
    title: "Switch to Public Transport",
    impact: "- 2.5 kg CO2/day",
    description:
      "Using public transport instead of a private car can significantly reduce your carbon footprint.",
    difficulty: "Medium",
  },
  {
    category: "Energy",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "LED Light Bulbs",
    impact: "- 0.15 kg CO2/day",
    description:
      "Replace all traditional bulbs with LED alternatives for better energy efficiency.",
    difficulty: "Easy",
  },
  {
    category: "Food",
    icon: <Apple className="w-6 h-6 text-red-500" />,
    title: "Reduce Meat Consumption",
    impact: "- 1.8 kg CO2/day",
    description:
      "Having one meat-free day per week can significantly reduce your carbon footprint.",
    difficulty: "Medium",
  },
  {
    category: "Household",
    icon: <Home className="w-6 h-6 text-purple-500" />,
    title: "Smart Thermostat",
    impact: "- 1.2 kg CO2/day",
    description:
      "Install a smart thermostat to optimize your heating and cooling usage.",
    difficulty: "Hard",
  },
  {
    category: "Energy",
    icon: <Sun className="w-6 h-6 text-yellow-600" />,
    title: "Solar Panels",
    impact: "- 4.0 kg CO2/day",
    description:
      "Install solar panels on your roof to generate renewable energy and reduce grid reliance.",
    difficulty: "Hard",
  },
  {
    category: "Waste",
    icon: <Recycle className="w-6 h-6 text-green-500" />,
    title: "Recycle More",
    impact: "- 0.3 kg CO2/day",
    description:
      "Recycling paper, plastic, and metals reduces landfill waste and the carbon impact of manufacturing new materials.",
    difficulty: "Easy",
  },
  {
    category: "Energy",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Unplug Unused Electronics",
    impact: "- 0.2 kg CO2/day",
    description:
      "Unplug electronics when not in use to save energy and reduce your carbon footprint.",
    difficulty: "Easy",
  },
  {
    category: "Food",
    icon: <Apple className="w-6 h-6 text-red-500" />,
    title: "Eat More Plant-Based Foods",
    impact: "- 2.0 kg CO2/day",
    description:
      "Switching to plant-based food reduces the environmental impact of food production.",
    difficulty: "Medium",
  },
  {
    category: "Transport",
    icon: <Car className="w-6 h-6 text-blue-500" />,
    title: "Carpool with Friends",
    impact: "- 1.5 kg CO2/day",
    description:
      "Sharing a ride with others reduces the number of vehicles on the road and lowers emissions.",
    difficulty: "Medium",
  },
  {
    category: "Household",
    icon: <Home className="w-6 h-6 text-purple-500" />,
    title: "Switch to Energy-Efficient Appliances",
    impact: "- 1.5 kg CO2/day",
    description:
      "Replacing old appliances with energy-efficient ones can significantly reduce energy consumption.",
    difficulty: "Medium",
  },
  {
    category: "Waste",
    icon: <Trash2 className="w-6 h-6 text-gray-500" />,
    title: "Compost Your Food Waste",
    impact: "- 0.5 kg CO2/day",
    description:
      "Composting food waste prevents methane emissions from landfills and creates nutrient-rich soil.",
    difficulty: "Medium",
  },
  {
    category: "Energy",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Use a Programmable Thermostat",
    impact: "- 1.0 kg CO2/day",
    description:
      "A programmable thermostat can help reduce heating and cooling costs by adjusting temperatures based on your schedule.",
    difficulty: "Medium",
  },
  {
    category: "Food",
    icon: <Apple className="w-6 h-6 text-red-500" />,
    title: "Grow Your Own Vegetables",
    impact: "- 0.5 kg CO2/day",
    description:
      "Home-grown vegetables require fewer resources and transportation, reducing carbon emissions.",
    difficulty: "Hard",
  },
  {
    category: "Transport",
    icon: <Car className="w-6 h-6 text-blue-500" />,
    title: "Use a Bicycle for Short Trips",
    impact: "- 1.0 kg CO2/day",
    description:
      "Biking instead of driving for short trips significantly reduces your carbon footprint and is great for your health.",
    difficulty: "Easy",
  },
  {
    category: "Household",
    icon: <Home className="w-6 h-6 text-purple-500" />,
    title: "Install Insulation in Your Home",
    impact: "- 2.0 kg CO2/day",
    description:
      "Proper insulation reduces the need for heating and cooling, saving energy and reducing emissions.",
    difficulty: "Hard",
  },
  {
    category: "Waste",
    icon: <Recycle className="w-6 h-6 text-green-500" />,
    title: "Buy Products with Less Packaging",
    impact: "- 0.7 kg CO2/day",
    description:
      "Choose products with minimal packaging to reduce waste and the environmental impact of production.",
    difficulty: "Easy",
  },
  {
    category: "Energy",
    icon: <Sun className="w-6 h-6 text-yellow-600" />,
    title: "Install Solar Water Heating",
    impact: "- 2.5 kg CO2/day",
    description:
      "Solar water heating uses renewable energy to heat your water, reducing the need for gas or electricity.",
    difficulty: "Hard",
  },
  {
    category: "Transport",
    icon: <Car className="w-6 h-6 text-blue-500" />,
    title: "Drive a Fuel-Efficient Car",
    impact: "- 2.0 kg CO2/day",
    description:
      "Fuel-efficient vehicles consume less gas, resulting in fewer emissions per mile driven.",
    difficulty: "Medium",
  },
  {
    category: "Waste",
    icon: <Trash2 className="w-6 h-6 text-gray-500" />,
    title: "Avoid Single-Use Plastics",
    impact: "- 0.5 kg CO2/day",
    description:
      "Use reusable items instead of disposable plastics to reduce waste and emissions.",
    difficulty: "Easy",
  },
  {
    category: "Energy",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Use Power Strips",
    impact: "- 0.3 kg CO2/day",
    description:
      "Using power strips makes it easier to turn off multiple devices at once and save energy.",
    difficulty: "Easy",
  },
];

export default function CFPOptimizer() {
  return (
    <div className="min-h-screen bg-gray-50 pl-64">
      <Sidebar />
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carbon Footprint Optimizer
          </h1>

          <div className="grid gap-8">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{rec.icon}</div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        {rec.category}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        Difficulty: {rec.difficulty}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{rec.title}</h3>
                    <p className="mt-2 text-gray-600">{rec.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        {rec.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
