
import React, { useEffect } from 'react';
import { GoogleKey } from '../../config';
import axios from 'axios';

const GoogleMap = () => {
  const initMap = async () => {
    try {
      const res = await axios.post('http://localhost:3000/properties');
      const propertiesData = res.data;

      navigator.geolocation.getCurrentPosition(() => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 39.8283, lng: -98.5795 },
          mapId: 'ba4ecb4571892e61',
          zoom: 5,
          disableDefaultUI: true,
        });

      var heatMapData = [];
      propertiesData.forEach(property => {
        console.log(property.coordinates.latitude, property.coordinates.longitude);
        const { coordinates, price } = property;
        const lat = parseFloat(coordinates.latitude);
        const lng = parseFloat(coordinates.longitude);
        heatMapData.push(new window.google.maps.LatLng(lat, lng));
        });

        const heatmap = new window.google.maps.visualization.HeatmapLayer({
          data: heatMapData,
        });

        heatmap.setMap(map);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&v=weekly&libraries=visualization`;
    script.defer = true;
    document.body.appendChild(script);

    // Create a new Promise that resolves when the Google Maps API has loaded
    const googleMapsLoaded = new Promise((resolve) => {
      script.addEventListener('load', () => {
        resolve();
      });
    });

    // Call initMap only when the Google Maps API has loaded
    googleMapsLoaded.then(() => {
      initMap();
    });
  }, []);

  return <div id="map" style={{ height: '100%' }}></div>;
};

export default GoogleMap;