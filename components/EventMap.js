import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: '100%',
    height: '500px',
    zoom: 8,
  });

  useEffect(() => {
    // Get latitude & longitude from address
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  console.log({ lat, lng });

  return (
    <div>
      <h1>Map</h1>
    </div>
  );
}
