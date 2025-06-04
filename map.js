// 🧠 Set your public Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Initialize the Mapbox map with custom style
const map = new mapboxgl.Map({
  container: 'map', // HTML <div id="map"></div>
  style: 'mapbox://styles/melissagall2023/cmbia5kao00ha01s161w58d9q', // 🎨 Your custom Mapbox Studio style
  center: [-94.58295, 39.09187], // 📍 Kansas City area
  zoom: 16.5,
  pitch: 70,
  bearing: -30,
  antialias: true
});

// 🔄 Wait for map to fully load
map.on('load', () => {
  // 🌄 Add 3D terrain elevation source
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.terrain-rgb',
    tileSize: 512,
    maxzoom: 14
  });

  map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

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

  // 🏢 Navy building locations & heights
  const buildings = [
    { coords: [-94.58061, 39.09158], space: 6350 },
    { coords: [-94.58295, 39.09187], space: 10900 },
    { coords: [-94.59861, 39.05618], space: 8896 },
    { coords: [-94.59922, 39.09083], space: 3405 },
    { coords: [-94.58257, 39.10178], space: 5012 },
    { coords: [-94.58299, 39.10136], space: 5000 },
    { coords: [-94.5732, 39.0909], space: 4800 },
    { coords: [-94.5919, 38.9932], space: 3992 },
    { coords: [-94.57982, 39.09128], space: 5500 },
    { coords: [-94.5996, 39.1047], space: 5729 },
    { coords: [-94.57512, 39.09134], space: 3600 },
    { coords: [-94.5925, 39.0434], space: 2000 },
    { coords: [-94.5866, 39.0875], space: 5400 },
    { coords: [-94.5789, 39.1071], space: 4088 },
    { coords: [-94.5763, 39.0902], space: 12008 },
    { coords: [-94.5833, 39.1099], space: 6000 },
    { coords: [-94.5776, 39.0917], space: 11880 },
    { coords: [-94.5861, 39.1038], space: 7035 },
    { coords: [-94.5821, 39.0913], space: 4271 },
    { coords: [-94.5947, 39.0774], space: 8533 },
    { coords: [-94.5795, 39.0908], space: 3000 },
    { coords: [-94.5825, 39.0909], space: 3855 },
    { coords: [-94.5994, 39.0867], space: 2195 },
    { coords: [-94.5904, 39.0652], space: 5700 },
    { coords: [-94.5743, 39.0911], space: 3100 },
    { coords: [-94.5918, 39.0539], space: 5402 },
    { coords: [-94.5985, 39.1042], space: 5442 },
    { coords: [-94.6023, 39.1047], space: 10096 },
    { coords: [-94.5839, 39.1101], space: 2630 }
  ];

  // 📦 Convert to GeoJSON
  const featureCollection = {
    type: 'FeatureCollection',
    features: buildings.map(b => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: b.coords
      },
      properties: {
        space: b.space
      }
    }))
  };

  // 🧱 Add building data as source
  map.addSource('navy-buildings', {
    type: 'geojson',
    data: featureCollection
  });

  // 🏗️ Render 3D buildings with extrusion height
  map.addLayer({
    id: 'navy-buildings-3d',
    type: 'fill-extrusion',
    source: 'navy-buildings',
    paint: {
      'fill-extrusion-color': '#003865',
      'fill-extrusion-height': ['/', ['get', 'space'], 100],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 1
    }
  });
});
