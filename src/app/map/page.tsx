"use client";  

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;


const containerStyle = {
  width: '100%',
  height: '400px',
};


interface Shop {
  name: string;
  lat: number;
  lng: number;
}


const MapPage: React.FC = () => {
  const userLocation = { lat: -3.745, lng: -38.523 }; 
  const shops = [
    { name: 'Shop 1', lat: -3.746, lng: -38.524 },
    { name: 'Shop 2', lat: -3.747, lng: -38.525 },
    { name: 'Shop 3', lat: -3.748, lng: -38.526 },
  ];

 
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const map = useRef<mapboxgl.Map | null>(null);

 
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
    });

  
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(map.current);


    shops.forEach(shop => {
      new mapboxgl.Marker()
        .setLngLat([shop.lng, shop.lat])
        .setPopup(new mapboxgl.Popup().setText(shop.name))
        .addTo(map.current as mapboxgl.Map);
    });

    return () => map.current?.remove();
  }, [shops, userLocation]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find the Nearest Pesticide Shops</h1>
      <div ref={mapContainer} style={containerStyle} />
    </div>
  );
};

export default MapPage;