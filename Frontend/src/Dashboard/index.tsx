import Sidebar from "../components/Sidebar";
import EmissionOverview from "./EmissionOverview";
import EmissionTrends from "./EmissionTrends";
import QuickStats from "./QuickState";
import Tips from "./Tips";

export default function Dashboard() {
  const userName = "John Doe"; // Replace with dynamic user fetching logic

  return (
    <div className="min-h-screen bg-gray-50 pl-64">
      <Sidebar />
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          {/* Overview and Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <EmissionOverview />
            <QuickStats />
          </div>

          {/* Trends and Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <EmissionTrends />
            </div>
            <div>
              <Tips />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
