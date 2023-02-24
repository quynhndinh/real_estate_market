import React, { useEffect } from 'react';
import { GoogleKey } from '../../config';

const GoogleMap = () => {
  let map;

  const initMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: latitude, lng: longitude },
          zoom: 8,
        });
      },
      () => {
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    );
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&callback=initMap&v=weekly`;
    script.defer = true;
    script.addEventListener('load', initMap);
    document.body.appendChild(script);
  }, []);

  return <div id="map" style={{ height: "950px" }}></div>;
}

export default GoogleMap;