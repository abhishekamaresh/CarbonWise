import { Lightbulb } from 'lucide-react';

const tips = [
  {
    tip: 'Consider using public transport to reduce emissions',
    category: 'Transport'
  },
  {
    tip: 'Switch to LED bulbs to save energy',
    category: 'Energy'
  },
  {
    tip: 'Try meat-free Mondays to reduce food emissions',
    category: 'Food'
  }
];

export default function Tips() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Eco Tips</h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start p-4 border rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-500 mt-1" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{tip.tip}</p>
              <p className="text-xs text-gray-500">{tip.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}