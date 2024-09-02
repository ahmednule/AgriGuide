import { useState, useEffect } from "react";
import { GeolocationData } from "../types";
const useClientGeolocation = () => {
  const [location, setLocation] = useState<GeolocationData & {
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchLocationDetails = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch location details");
      }
      const data = await response.json();
      setLocation({
        ...data,
        latitude,
        longitude,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      setIsLoading(false);
    }
  };

  fetchLocation();
}, []);

  return { location, error, isLoading };
};

export default useClientGeolocation;
