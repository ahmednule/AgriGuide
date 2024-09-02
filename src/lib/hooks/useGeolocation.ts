import { useState, useEffect } from "react";

const useClientGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
    country_name?: string;
    country_flag?: string;
    city?: string;
    state_prov?: string;
  }>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationDetails = async (
      latitude: number,
      longitude: number
    ) => {
      try {
        const response = await fetch(
          `/api/geolocation?lat=${latitude}&lon=${longitude}`
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
