"use client";

import { useEffect, useRef } from "react";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

import { env } from "@/env";

import { Input } from "@/components/ui/input";

interface AddressSelection {
  address: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  postalCode?: string;
}

const extractAddressParts = (components?: google.maps.GeocoderAddressComponent[]) => {
  if (!components?.length) {
    return { city: undefined, postalCode: undefined };
  }

  const postalCode = components.find((item) => item.types.includes("postal_code"))?.long_name;
  const city =
    components.find((item) => item.types.includes("locality"))?.long_name ??
    components.find((item) => item.types.includes("postal_town"))?.long_name ??
    components.find((item) => item.types.includes("administrative_area_level_2"))?.long_name;

  return { city, postalCode };
};

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

  const onChangeRef = useRef(onChange);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onChangeRef.current = onChange;
    onSelectRef.current = onSelect;
  }, [onChange, onSelect]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== controlledValue) {
      inputRef.current.value = controlledValue;
    }
  }, [controlledValue]);

  useEffect(() => {
    const apiKey = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return;
    }

    let isCancelled = false;
    let listener: google.maps.MapsEventListener | undefined;

    setOptions({ key: apiKey });

    Promise.all([importLibrary("places"), importLibrary("geocoding")]).then(
      ([{ Autocomplete }, { Geocoder }]) => {
        if (!inputRef.current || isCancelled) {
          return;
        }

        const geocoder = new Geocoder();

        const autocomplete = new Autocomplete(inputRef.current, {
          componentRestrictions: { country: "dk" },
          fields: ["formatted_address", "geometry", "place_id", "address_components"],
          types: ["address"]
        });

        listener = autocomplete.addListener("place_changed", async () => {
          const place = autocomplete.getPlace();
          let { city, postalCode } = extractAddressParts(place.address_components);
          let address = place.formatted_address ?? inputRef.current?.value ?? "";

          let latitude = place.geometry?.location?.lat();
          let longitude = place.geometry?.location?.lng();

          // Instantly update the input/form state to avoid lag while geocoding
          onChangeRef.current(address);

          if (place.place_id) {
            try {
              const response = await geocoder.geocode({ placeId: place.place_id });
              const topResult = response.results[0];
              const location = topResult?.geometry?.location;

              if (topResult?.formatted_address) {
                address = topResult.formatted_address;
              }

              if (typeof latitude !== "number" || typeof longitude !== "number") {
                if (location) {
                  latitude = location.lat();
                  longitude = location.lng();
                }
              }

              if (!city || !postalCode) {
                const fallbackParts = extractAddressParts(topResult?.address_components);
                city = city ?? fallbackParts.city;
                postalCode = postalCode ?? fallbackParts.postalCode;
              }
            } catch {
              // Keep undefined coordinates if geocoding fallback fails.
            }
          }

          onChangeRef.current(address);
          onSelectRef.current?.({
            address,
            latitude,
            longitude,
            city,
            postalCode
          });
        });
      }
    );

    return () => {
      isCancelled = true;
      listener?.remove();
    };
  }, []); // Only run once on mount

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
