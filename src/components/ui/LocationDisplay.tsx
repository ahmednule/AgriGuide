"use client";

import useGeolocation from "@/lib/hooks/useGeolocation";
import { Skeleton, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const LocationDisplay = () => {
  const { location, error, isLoading } = useGeolocation();
  const country = location.country;
  const city = location.city;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-1 mb-8">
        <Skeleton isLoaded={!isLoading} className=" h-6 w-36 rounded bg-emerald-100" />
      </div>
    );
  if(!isLoading && !error)
    return (
      <div className="text-center mt-1 mb-8 text-emerald-600">
        {city}, {country}
      </div>
    );
};

export default LocationDisplay;
