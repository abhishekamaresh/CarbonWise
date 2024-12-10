import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ActivityForm from "./ActivityForm";

interface Activity {
  id: string;
  type: string;
  value: number;
  date: string;
}

export default function CFPTracker() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Activity) => {
    setActivities([activity, ...activities]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-64">
      <Sidebar />
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carbon Footprint Tracker
          </h1>
          <div>
            <ActivityForm />
          </div>
        </div>
      </main>
    </div>
  );
}
