import { useState, useEffect } from "react";
import { IpInfo } from "../types";

const useGeolocation = () => {
  const [location, setLocation] = useState<IpInfo>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/geolocation");
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const data = await response.json() as IpInfo;
        setLocation(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, error, isLoading };
};

export default useGeolocation;
