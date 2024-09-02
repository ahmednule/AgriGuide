"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Autocomplete, AutocompleteItem, Image } from "@nextui-org/react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { getCurrencySymbol } from "@/lib/utils";

interface City {
  id: string;
  country: string;
  region: string;
  city: string;
  currencySymbol: string;
  countryCode: string;
}

const LocationAutocomplete = ({
  setSelectedPlace,
  name,
  errorState,
  inputValue: defaultInputValue,
  selectedKey: defaultSelectedKey,
}: {
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<{
      city: string;
      country: string;
      region: string;
      countryCode: string;
      currencySymbol: string;
    }>
  >;
  name: string;
  errorState: {
    city: string;
    country: string;
    region: string;
  };
  inputValue: string;
  selectedKey: string | null;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [selectedKey, setSelectedKey] = useState<string | null>(
    defaultSelectedKey
  );

  const fetchCities = useCallback(async (query: string) => {
    if (!query) {
      setCities([]);
      return;
    }

    try {
      setLoading(true);
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
      if (!response.ok && response.status !== 429) {
        throw new Error();
      }
      const data = await response.json();

      if (data.data) {
        const locations = await Promise.all(
          data.data.map(async (location: any) => {
            const currencySymbol = await getCurrencySymbol(location.country);
            return {
              id: location.id,
              city: location.city || "Unknown City",
              country: location.country || "Unknown Country",
              region: location.region || "Unknown Region",
              countryCode: location.countryCode || "unknown",
              currencySymbol,
            };
          })
        );

        if (locations?.length > 0) {
          setCities(locations);
        }
      }
    } catch (error) {
      toast.error(
        "Error fetching cities: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    debounce((query: string) => {
      fetchCities(query);
    }, 500),
    [fetchCities]
  );

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setSelectedKey(null);
    setSelectedPlace({
      city: "",
      country: "",
      region: "",
      countryCode: "",
      currencySymbol: "",
    });
    if (!newValue) {
      setSelectedPlace({
        city: "",
        country: "",
        region: "",
        currencySymbol: "",
        countryCode: "",
      });
      setSelectedKey(null);
    } else {
      handleSearch(newValue);
    }
  };

  const handleSelect = (selectedItem: string | null) => {
    if (selectedItem) {
      setInputValue(selectedItem.split(",")[0]);
      setSelectedKey(selectedItem);
      const [city, region, country, countryCode, currencySymbol] = selectedItem
        .split(",")
        .map((s) => s.trim());
      setSelectedPlace({
        city,
        region,
        country,
        currencySymbol,
        countryCode,
      });
    } else {
      setInputValue("");
      setSelectedKey(null);
      setSelectedPlace({
        city: "",
        country: "",
        region: "",
        currencySymbol: "",
        countryCode: "",
      });
      setCities([]);
    }
  };

  useEffect(() => {
    if (defaultInputValue) {
      fetchCities(defaultInputValue);
    }
  }, []);

  return (
    <Autocomplete
      items={cities}
      label="Enter city"
      color="success"
      name={name}
      isRequired
      isInvalid={!!(errorState.city || errorState.country || errorState.region)}
      errorMessage={errorState.city || errorState.country || errorState.region}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      isLoading={loading}
      listboxProps={{
        emptyContent: "No location found.",
      }}
      selectedKey={selectedKey}
      onSelectionChange={handleSelect as any}
    >
      {(item: City) => (
        <AutocompleteItem
          key={`${item.city}, ${item.region}, ${item.country}, ${item.countryCode}, ${item.currencySymbol}`}
          textValue={`${item.city}`}
        >
          <div className="flex items-center">
            {item.countryCode && (
              <Image
                src={`https://flagcdn.com/48x36/${item.countryCode.toLowerCase()}.png`}
                alt={`${item.city}, ${item.region}, ${item.country}`}
                className="w-5 h-5 mr-2"
              />
            )}
            <span>{`${item.city}, ${item.region}, ${item.country}`}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default LocationAutocomplete;
