// 🧠 Set your public Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Initialize the Mapbox map with updated custom style
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbibep5u00hf01s16biahnvm', // ✅ NEW STYLE
  center: [-94.58295, 39.09187],
  zoom: 16.5,
  pitch: 70,
  bearing: -30,
  antialias: true
});

map.on('load', () => {
  // 🌄 Add 3D terrain elevation
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.terrain-rgb',
    tileSize: 512,
    maxzoom: 14
  });

  map.setTerrain({
    source: 'mapbox-dem',
    exaggeration: 1.5
  });

  // ☁️ Add atmospheric sky layer
  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15
    }
  });

  // 🏙️ Add default 3D buildings from Mapbox Streets v8
  map.addLayer({
    id: 'default-3d-buildings',
    source: 'building', // ⚠️ Must match your Studio source name
    'source-layer': 'building',
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
      'fill-extrusion-color': '#bbbbbb',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': ['get', 'min_height'],
      'fill-extrusion-opacity': 0.5
    }
  });
});
