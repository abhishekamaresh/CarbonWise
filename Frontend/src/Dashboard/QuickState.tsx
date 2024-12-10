import { useState, useEffect } from "react";
import axios from "axios";
import { Activity, Target, PieChart } from "lucide-react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

interface Stats {
  dailyEmissions: number;
  totalEmissions: number;
  categoryStats: Record<string, number>;
}

const QuickState = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/carbon/quick-stats/${user?.userId}`
        );

        // Log API response to ensure proper data
        console.log("API Response:", response.data);

        const { data } = response.data;

        // Correctly extract data from the API response
        const dailyData = data?.dailyData || [];
        const dailyEmissions =
          dailyData.length > 0 ? dailyData[0].emissions : 0;
        const totalEmissions = data?.totalEmissions || 0;

        // Ensure categoryStats is an object and contains valid data
        const categoryStats = data.categoryStats;

        // Update state with correct data
        setStats({
          dailyEmissions,
          totalEmissions,
          categoryStats,
        });
      } catch (error) {
        console.error("Error fetching quick stats:", error);
        setStats(null); // Reset state in case of error
      }
    };

    fetchQuickStats();
  }, [user?.userId]);

  // Check if stats are not loaded
  if (stats === null) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Statistics</h2>
        <p>No Data Available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Quick Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Emissions */}
        <div className="p-4 border rounded-lg">
          <Activity className="w-6 h-6 text-blue-500" />
          <p className="mt-2 text-sm text-gray-600">Total Emissions</p>
          <p className="text-2xl font-semibold">
            {stats.totalEmissions.toFixed(2)} kg CO₂
          </p>
        </div>

        {/* Daily Emissions */}
        <div className="p-4 border rounded-lg">
          <Target className="w-6 h-6 text-green-500" />
          <p className="mt-2 text-sm text-gray-600">Daily Emissions</p>
          <p className="text-2xl font-semibold">
            {stats.dailyEmissions.toFixed(2)} kg CO₂
          </p>
        </div>

        {/* Emissions by Category */}
        <div className="col-span-1 md:col-span-2 p-4 border rounded-lg">
          <PieChart className="w-6 h-6 text-purple-500" />
          <p className="mt-2 text-sm text-gray-600">Emissions by Category</p>
          <div className="mt-4 space-y-2">
            {Object.entries(stats.categoryStats)
              .filter(([category]) => category !== "_id") // Filter out '_id'
              .map(([category, emissions]) => (
                <div key={category} className="flex justify-between text-sm">
                  <span className="capitalize">{category}</span>
                  <span>{emissions?.toFixed(2)} kg CO₂</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickState;
