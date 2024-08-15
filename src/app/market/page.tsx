import React from 'react';
import Header from '@/components/ui/Header'; // Adjust the path based on your directory structure

const MarketStatsPage: React.FC = () => {
  // Static data for crops
  const cropsData = [
    { name: 'Tomatoes', price: '$2.50', change: '+1.5%' },
    { name: 'Corn', price: '$1.75', change: '-0.3%' },
    { name: 'Wheat', price: '$3.20', change: '+2.1%' },
    { name: 'Potatoes', price: '$1.10', change: '+0.8%' },
    { name: 'Carrots', price: '$1.30', change: '-0.5%' },
    { name: 'Lettuce', price: '$0.90', change: '+0.2%' },
    {name:'maize', price:'$1.3', change:'+0.3%'},
  ];

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Market Stats for Different Crops</h1>
        
        {/* Market Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropsData.map((crop, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">{crop.name}</h2>
              <p className="text-gray-600">Current Price: {crop.price}</p>
              <p className="text-gray-600">Price Change: {crop.change}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default MarketStatsPage;
