mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard', // Keep native Standard style
  center: [-94.58295, 39.09187],
  zoom: 15.8,
  pitch: 62,
  bearing: -20,
  antialias: true
});

map.on('load', () => {
  // 🟦 Navy 3D extrusions only
  map.addSource('navy-buildings', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        [-94.58061, 39.09158],
        [-94.58295, 39.09187],
        [-94.59861, 39.05618],
        [-94.59922, 39.09083],
        [-94.58257, 39.10178],
        [-94.58299, 39.10136],
        [-94.5732, 39.0909],
        [-94.5919, 38.9932],
        [-94.57982, 39.09128],
        [-94.5996, 39.1047],
        [-94.57512, 39.09134],
        [-94.5925, 39.0434],
        [-94.5866, 39.0875],
        [-94.5789, 39.1071],
        [-94.5763, 39.0902],
        [-94.5833, 39.1099],
        [-94.5776, 39.0917],
        [-94.5861, 39.1038],
        [-94.5821, 39.0913],
        [-94.5947, 39.0774],
        [-94.5795, 39.0908],
        [-94.5825, 39.0909],
        [-94.5994, 39.0867],
        [-94.5904, 39.0652],
        [-94.5743, 39.0911],
        [-94.5918, 39.0539],
        [-94.5985, 39.1042],
        [-94.6023, 39.1047],
        [-94.5839, 39.1101]
      ].map(coord => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coord
        },
        properties: {}
      }))
    }
  });

  map.addLayer({
    id: 'navy-buildings-3d',
    type: 'fill-extrusion',
    source: 'navy-buildings',
    paint: {
      'fill-extrusion-color': '#003865',
      'fill-extrusion-height': 60,
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 1
    }
  });
});
