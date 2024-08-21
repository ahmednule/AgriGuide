"use client";  // Add this line at the top

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =("pk.eyJ1IjoiaXRzYWhtZWQiLCJhIjoiY20wM296ajBsMDAxazJqcXpkeHpsMmJkeCJ9.02qy1RWfp1aHiaiAQbZCoQ");

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface Shop {
  name: string;
  lat: number;
  lng: number;
}

const Map: React.FC<{ shops: Shop[]; userLocation: { lat: number; lng: number } }> = ({ shops, userLocation }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
    });

    // Add user location marker
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(map.current);

    // Add markers for shops
    shops.forEach(shop => {
      new mapboxgl.Marker()
        .setLngLat([shop.lng, shop.lat])
        .setPopup(new mapboxgl.Popup().setText(shop.name))
        .addTo(map.current as mapboxgl.Map);
    });

    // Clean up on unmount
    return () => map.current?.remove();
  }, [shops, userLocation]);

  return <div ref={mapContainer} style={containerStyle} />;
};

export default Map;
