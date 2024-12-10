import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/userAtom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface TrendData {
  name: string;
  transport: number;
  energy: number;
  food: number;
  household: number;
}

export default function EmissionTrends() {
  const [data, setData] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/carbon/emission-breakdown/${user?.userId}`
        );
        // Assuming response.data is an array like the one you showed
        const formattedData = response.data.map((item: any) => ({
          name: item.name,
          transport: item.name === "Transport" ? item.value : 0,
          energy: item.name === "Energy" ? item.value : 0,
          food: item.name === "Food" ? item.value : 0,
          household: item.name === "Waste" ? item.value : 0, // Mapping Waste to household if needed
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Emission Trends Over Time</h2>
      <div className="h-80">
        {isLoading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500 text-center">No Data Available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="transport"
                stroke={COLORS[0]}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke={COLORS[1]}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="food"
                stroke={COLORS[2]}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="household"
                stroke={COLORS[3]}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
