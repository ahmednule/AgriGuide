"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '@/components/ui/Header';
import { Input } from '@nextui-org/react'; 
import { FaSearch } from 'react-icons/fa'; 

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState<{ lng: number; lat: number; name: string }[]>([]);

  const shops = [
    { lng: lng + 0.01, lat: lat + 0.01, name: 'Pesticide Shop 1' },
    { lng: lng - 0.02, lat: lat - 0.02, name: 'Pesticide Shop 2' },
    { lng: lng + 0.03, lat: lat + 0.03, name: 'Pesticide Shop 3' },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }

    if (mapContainer.current && !map) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12,
      });

      map.on('load', () => {
        setMap(map);
        map.resize();

        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
          .addTo(map);

        shops.forEach((shop) => {
          new mapboxgl.Marker({ color: 'green' })
            .setLngLat([shop.lng, shop.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${shop.name}</h3>`))
            .addTo(map);
        });

        setFilteredShops(shops);
      });
    }
  }, [lng, lat, map]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = shops.filter((shop) =>
      shop.name.toLowerCase().includes(query)
    );
    setFilteredShops(filtered);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Find Nearest Pesticide Shops</h1>
        <div className="mb-4">
        <Input
  fullWidth
  isClearable
  placeholder="Search for shops..."
  value={searchQuery}
  onChange={handleSearch}
/>

        </div>
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg mb-4">
          <div id="map" className="w-full h-full" ref={mapContainer}></div>
        </div>
        <div className="shop-list">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{shop.name}</h2>
                <p className="text-gray-600">Location: {shop.lat.toFixed(2)}, {shop.lng.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No shops found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MapPage;
