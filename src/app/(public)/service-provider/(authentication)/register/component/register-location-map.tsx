"use client";

import { useEffect, useMemo, useState } from "react";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Button } from "@/components/ui";

import "leaflet/dist/leaflet.css";

const DEFAULT_DK_POSITION: [number, number] = [55.6761, 12.5683];

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

function RecenterMap({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], map.getZoom());
  }, [latitude, longitude, map]);

  return null;
}

interface RegisterLocationMapProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (latitude: number, longitude: number) => void;
}

export default function RegisterLocationMap({
  latitude,
  longitude,
  onLocationSelect
}: RegisterLocationMapProps) {
  const [isLocating, setIsLocating] = useState(false);
  const mapPosition: [number, number] =
    typeof latitude === "number" && typeof longitude === "number"
      ? [latitude, longitude]
      : DEFAULT_DK_POSITION;

  const handleUseMyGps = () => {
    if (!navigator.geolocation) {
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onLocationSelect(coords.latitude, coords.longitude);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  const markerEvents = useMemo(
    () => ({
      dragend(event: L.LeafletEvent) {
        const marker = event.target as L.Marker;
        const { lat, lng } = marker.getLatLng();
        onLocationSelect(lat, lng);
      }
    }),
    [onLocationSelect]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start">
        <Button type="button" onClick={handleUseMyGps} disabled={isLocating}>
          {isLocating ? "Locating..." : "Use My GPS"}
        </Button>
      </div>

      <div className="relative z-0 h-100 w-full overflow-hidden rounded-lg border border-gray-300">
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable eventHandlers={markerEvents} position={mapPosition} icon={markerIcon}>
            <Popup>Drag marker to adjust workshop location.</Popup>
          </Marker>
          <RecenterMap latitude={mapPosition[0]} longitude={mapPosition[1]} />
        </MapContainer>
      </div>
    </div>
  );
}
