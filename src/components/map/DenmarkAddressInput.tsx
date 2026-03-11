"use client";

import { useEffect, useRef } from "react";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

import { Input } from "@/components/ui/input";

interface AddressSelection {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface DenmarkAddressInputProps {
  value?: string;
  onChange: (value: string) => void;
  onSelect?: (selection: AddressSelection) => void;
  placeholder?: string;
}

export default function DenmarkAddressInput({
  value = "",
  onChange,
  onSelect,
  placeholder = "Search for your address in Denmark"
}: DenmarkAddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const controlledValue = value ?? "";

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== controlledValue) {
      inputRef.current.value = controlledValue;
    }
  }, [controlledValue]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return;
    }

    let listener: google.maps.MapsEventListener | undefined;

    setOptions({ key: apiKey });

    importLibrary("places").then(({ Autocomplete }) => {
      if (!inputRef.current) {
        return;
      }

      const autocomplete = new Autocomplete(inputRef.current, {
        componentRestrictions: { country: "dk" },
        fields: ["formatted_address", "geometry"],
        types: ["address"]
      });

      listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address ?? inputRef.current?.value ?? "";
        const latitude = place.geometry?.location?.lat();
        const longitude = place.geometry?.location?.lng();

        onChange(address);
        onSelect?.({
          address,
          latitude,
          longitude
        });
      });
    });

    return () => {
      listener?.remove();
    };
  }, [onChange, onSelect]);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={controlledValue}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="border-gray-200 bg-white text-navy placeholder:text-gray-400"
      autoComplete="street-address"
    />
  );
}
