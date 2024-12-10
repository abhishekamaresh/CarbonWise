const facts = [
  {
    title: "Did you know?",
    fact: "A single tree can absorb up to 48 pounds of CO2 per year.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80"
  },
  {
    title: "Carbon Impact",
    fact: "One roundtrip flight from New York to London emits about 1.6 tons of CO2.",
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80"
  },
  {
    title: "Green Energy",
    fact: "Solar panels can reduce a household's carbon footprint by 80%.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80"
  }
];

export default function InterestingFacts() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Interesting Carbon Facts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="relative group">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img 
                  src={fact.image} 
                  alt={fact.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
                    <p className="text-sm">{fact.fact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}