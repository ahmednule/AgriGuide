import React from 'react';
import Map from '@/components/ui/map';

const MapPage: React.FC = () => {
  const userLocation = { lat: -3.745, lng: -38.523 }; // Example user location, use actual location data
  const shops = [
    { name: 'Shop 1', lat: -3.746, lng: -38.524 },
    { name: 'Shop 2', lat: -3.747, lng: -38.525 },
    { name: 'Shop 3', lat: -3.748, lng: -38.526 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find the Nearest Pesticide Shops</h1>
      <Map shops={shops} userLocation={userLocation} />
    </div>
  );
};

export default MapPage;
