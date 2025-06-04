mmapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-94.58257, 39.10178],
  zoom: 14,
  pitch: 60,
  bearing: -30,
  antialias: true
});

map.on('load', () => {
  console.log("✅ Map loaded. Properties length:", properties?.length);

  map.addSource('composite', {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-streets-v8'
  });

  map.addLayer({
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
      'fill-extrusion-color': '#0072CE',
      'fill-extrusion-height': [
        'interpolate', ['linear'], ['zoom'],
        15, 0,
        15.05, ['get', 'height']
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.9
    }
  });
  properties.forEach(prop => {
    const popupHTML = `
      <div class="property-popup">
        <h3>${prop.address}</h3>
        <p><strong>Submarket:</strong> ${prop.submarket}</p>
        <p><strong>Size:</strong> ${prop.space.toLocaleString()} SF</p>
        ${prop.link ? `<a href="${prop.link}" target="_blank">📎 Brochure</a>` : `<em>No brochure</em>`}
      </div>
    `;

    new mapboxgl.Marker({ color: '#0072CE' })
      .setLngLat([prop.lon, prop.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
      .addTo(map);
  });
});
