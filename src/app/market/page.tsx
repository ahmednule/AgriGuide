import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react'; 
import Image from 'next/image';
import Header from '@/components/ui/header/Header'; 

const MarketStatsPage: React.FC = () => {
  // Static data for crops
  const cropsData = [
    { name: 'Tomatoes', price: '$2.50', change: '+1.5%', imageUrl: '/crops/tomatoes.jpg' },
    { name: 'Corn', price: '$1.75', change: '-0.3%', imageUrl: '/crops/corn.jpg' },
    { name: 'Wheat', price: '$3.20', change: '+2.1%', imageUrl: '/crops/wheat.jpg' },
    { name: 'Potatoes', price: '$1.10', change: '+0.8%', imageUrl: '/crops/potatoes.jpg' },
    { name: 'Carrots', price: '$1.30', change: '-0.5%', imageUrl: '/crops/carrots.jpg' },
    { name: 'Lettuce', price: '$0.90', change: '+0.2%', imageUrl: '/crops/lettuce.jpg' },
    { name: 'Maize', price: '$1.30', change: '+0.3%', imageUrl: '/crops/maize.jpg' },
  ];

  // Function to determine color based on price change
  const getChangeColor = (change: string) => {
    return change.includes('+') ? 'text-green-500' : 'text-red-500';
  };

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Market Stats for Different Crops</h1>
        
        {/* Market Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropsData.map((crop, index) => (
            <Card key={index} isHoverable shadow="lg">
              <CardHeader className="p-0">
                <Image
                  src={crop.imageUrl}
                  alt={crop.name}
                  width={400}
                  height={250}
                  className="rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardBody>
                <h2 className="text-xl font-semibold text-gray-800">{crop.name}</h2>
                <p className="text-gray-600">Current Price: {crop.price}</p>
                <p className={`text-gray-600 ${getChangeColor(crop.change)}`}>
                  Price Change: {crop.change}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarketStatsPage;