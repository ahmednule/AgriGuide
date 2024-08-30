"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Autocomplete, AutocompleteItem, Image } from "@nextui-org/react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { useFormStatus } from "react-dom";

interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  countryCode?: string;
}

const LocationAutocomplete = ({
  setSelectedPlace,
  name,
  errorState: { city, country, region },
}: {
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<{
      city: string;
      country: string;
      region: string;
    }>
  >;
  name: string;
  errorState: {
    city: string;
    country: string;
    region: string;
  };
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>("");

  const handleSearch = useCallback(
    debounce((query: string) => {
      fetchCities(query);
    }, 500),
    []
  );

  const fetchCities = async (query: string) => {
    if (query.length < 3) {
      setCities([]);
      setSelectedCity("");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=10`,
        {
          headers: {
            "X-RapidAPI-Key":
              "bab86b9a00msh4a421fe005e9f45p19708djsn18c4914b019a",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      if (!response.ok && response.status !== 429)
        throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      if (!data?.data) return;

      setCities(
        data.data.map((city: City) => ({
          id: city.id,
          name: `${city.name}, ${city.region}, ${city.country}`,
          country: city.country,
          region: city.region,
          countryCode: city.countryCode,
        }))
      );
    } catch (error) {
      toast.error(
        "Error fetching cities: " +
          (error instanceof Error ? error.message : error)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (value: any) => {
    if (!value) return;
    setSelectedCity(value);

    try {
      setLoading(true);
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${value}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "bab86b9a00msh4a421fe005e9f45p19708djsn18c4914b019a",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      if (!res.ok && res.status !== 429)
        throw new Error(`Error: ${res.statusText}`);
      const data = (await res.json()) as { data: City };
      if (!data?.data) return;

      setSelectedPlace({
        city: data.data.name,
        country: data.data.country,
        region: data.data.region,
      });

      setCities([
        {
          id: data.data.id,
          name: `${data.data.name}, ${data.data.region}, ${data.data.country}`,
          country: data.data.country,
          region: data.data.region,
          countryCode: data.data.countryCode,
        },
      ]);
    } catch (error) {
      toast.error(
        "Error fetching city: " +
          (error instanceof Error ? error.message : error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      items={cities}
      label="Search for a city"
      color="success"
      name={name}
      isRequired
      isInvalid={!!city || !!country || !!region}
      errorMessage={city || country || region}
      onInputChange={handleSearch}
      isLoading={loading}
      onSelectionChange={handleSelect}
      selectedKey={selectedCity}
    >
      {(item) => {
        return (
          <AutocompleteItem
            startContent={
              <Image
                src={`
                  https://flagcdn.com/48x36/${item.countryCode?.toLowerCase()}.png
                  `}
                alt={item.name}
                className="w-6 h-6"
              />
            }
            key={item.id}
          >
            {item.name}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
};

export default LocationAutocomplete;
