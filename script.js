mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

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

  // 1️⃣ 3D BUILDINGS
  if (!map.getSource('composite')) {
    map.addSource('composite', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8'
    });
  }

  if (!map.getLayer('3d-buildings')) {
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
  }

  // 2️⃣ INTERACTIVE MARKERS
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

  // 3️⃣ ALWAYS-VISIBLE LABELS (SAFE!)
  const geojson = {
    type: "FeatureCollection",
    features: properties.map(p => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [p.lon, p.lat]
      },
      properties: { ...p }
    }))
  };

  if (!map.getSource("property-labels")) {
    map.addSource("property-labels", {
      type: "geojson",
      data: geojson
    });
  }

  if (!map.getLayer("property-labels-layer")) {
    map.addLayer({
      id: "property-labels-layer",
      type: "symbol",
      source: "property-labels",
      layout: {
        "text-field": ["get", "address"],
        "text-size": 12,
        "text-offset": [0, 1.5],
        "text-anchor": "top",
        "text-allow-overlap": true
      },
      paint: {
        "text-color": "#111111",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1
      }
    });
  }
});
