import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface BreakdownData {
  name: string;
  value: number;
}

export default function EmissionOverview() {
  const [data, setData] = useState<BreakdownData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/carbon/emission-breakdown/${user?.userId}`
        );
        console.log(response.data);
        setData(response.data); // Set the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Ensure loading is turned off regardless of success/failure
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Carbon Footprint Breakdown</h2>
      <div className="h-80">
        {isLoading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500 text-center">No Data Available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
