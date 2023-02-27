
import React, { useEffect } from 'react';
import { GoogleKey } from '../../config';
import axios from 'axios';

const GoogleMap = () => {
  const initMap = async () => {
    try {
      const res = await axios.post('http://localhost:3000/properties');
      const propertiesData = res.data;

      navigator.geolocation.getCurrentPosition(
        () => {
          const map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 39.8283, lng: -98.5795 },
            mapId: "ba4ecb4571892e61",
            zoom: 9,
            disableDefaultUI: true,
          });

          propertiesData.forEach(property => {
            const { coordinates, price } = property;
            const lat = parseFloat(coordinates.latitude);
            const lng = parseFloat(coordinates.longitude);
            const marker = new window.google.maps.Marker({
              position: {lat, lng},
              map: map,
              title: `$${price}`,
            });
          });
        }
      );

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&v=weekly`;
    script.defer = true;
    script.addEventListener('load', initMap);
    document.body.appendChild(script);
  }, []);

  return <div id="map" style={{ height: "950px" }}></div>;
}

export default GoogleMap;