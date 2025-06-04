mapboxgl.accessToken = 'your-access-token-here';

const map = new mapboxgl.Map({
  container: 'map', // Make sure there's a div with id="map" in HTML
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-74.0060, 40.7128], // New York example
  zoom: 16,
  pitch: 60,
  bearing: -20,
  antialias: true
});

map.on('load', () => {
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': ['get', 'min_height'],
      'fill-extrusion-opacity': 0.6
    }
  });
});
