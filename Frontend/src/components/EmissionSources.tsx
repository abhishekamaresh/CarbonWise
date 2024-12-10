import { Car, Lightbulb, Apple, Factory, Plane, Home } from 'lucide-react';

const sources = [
  {
    icon: <Car className="w-12 h-12 text-blue-500" />,
    title: 'Transportation',
    description: "Vehicle emissions account for about 14% of India's total greenhouse gas emissions.",
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80'
  },
  {
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    title: 'Electricity',
    description: 'Electricity production generates 25% of global greenhouse gas emissions.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80'
  },
  {
    icon: <Apple className="w-12 h-12 text-red-500" />,
    title: 'Food & Agriculture',
    description: 'Food systems are responsible for 34% of global greenhouse gas emissions.',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80'
  },
  {
    icon: <Factory className="w-12 h-12 text-gray-500" />,
    title: 'Industry',
    description: "Industrial processes contribute to 25% of India's total greenhouse gas emissions.",
    image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80'
  },
  {
    icon: <Home className="w-12 h-12 text-green-500" />,
    title: 'Residential',
    description: "Residential energy use accounts for 4% of India's total emissions.",
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80'
  },
  {
    icon: <Plane className="w-12 h-12 text-purple-500" />,
    title: 'Aviation',
    description: 'Aviation contributes to 2.5% of global carbon emissions.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80'
  }
];

export default function EmissionSources() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Major Sources of Carbon Emissions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sources.map((source, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={source.image} 
                alt={source.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {source.icon}
                  <h3 className="text-xl font-semibold ml-4">{source.title}</h3>
                </div>
                <p className="text-gray-600">{source.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}