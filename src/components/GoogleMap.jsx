import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });


  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap 
      mapContainerStyle={containerStyle} 
      center={center} 
      zoom={10}
      onLoad={onLoad}
      options={{
        zoomControl: true,
        mapTypeControl: true,
        fullscreenControl: true
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

export default MapComponent;
