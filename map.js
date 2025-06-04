// 🧠 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Initialize Mapbox Map with Custom Studio Style
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbibep5u00hf01s16biahnvm',
  center: [-94.58295, 39.09187],
  zoom: 16.5,
  pitch: 45,
  bearing: -20,
  antialias: true
});

map.on('load', () => {
  console.log("✅ Map loaded. Properties:", properties?.length);

  // 1️⃣ SKY (optional visual layer)
  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15
    }
  });

  // 2️⃣ BASE 3D BUILDINGS (from style)
  map.addLayer({
    id: 'default-3d-buildings',
    source: 'building',
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

  // 3️⃣ CUSTOM 3D PROPERTY BUILDINGS
  map.addSource('property-buildings', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: properties.map(p => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [p.lon - 0.0001, p.lat - 0.0001],
            [p.lon + 0.0001, p.lat - 0.0001],
            [p.lon + 0.0001, p.lat + 0.0001],
            [p.lon - 0.0001, p.lat + 0.0001],
            [p.lon - 0.0001, p.lat - 0.0001]
          ]]
        },
        properties: {
          height: p.space / 100
        }
      }))
    }
  });

  map.addLayer({
    id: 'property-3d-buildings',
    type: 'fill-extrusion',
    source: 'property-buildings',
    paint: {
      'fill-extrusion-color': '#C4452C',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.9
    }
  });

  // 4️⃣ MARKERS WITH POPUPS
  properties.forEach(prop => {
    const popupHTML = `
      <div class="property-popup">
        <h3>${prop.address}</h3>
        <p><strong>Submarket:</strong> ${prop.submarket}</p>
        <p><strong>Size:</strong> ${prop.space.toLocaleString()} SF</p>
        ${prop.link ? `<a href="${prop.link}" target="_blank">📎 Brochure</a>` : `<em>No brochure</em>`}
      </div>
    `;

    new mapboxgl.Marker({ color: '#C4452C' })
      .setLngLat([prop.lon, prop.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
      .addTo(map);
  });

  // 5️⃣ ALWAYS-VISIBLE ADDRESS LABELS
  const geojson = {
    type: "FeatureCollection",
    features: properties.map(p => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.lon, p.lat] },
      properties: { ...p }
    }))
  };

  map.addSource("property-labels", {
    type: "geojson",
    data: geojson
  });

  map.addLayer({
    id: "property-labels-layer",
    type: "symbol",
    source: "property-labels",
    layout: {
      "text-field": ["get", "address"],
      "text-size": 14,
      "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.5],
      "text-anchor": "top",
      "text-allow-overlap": true
    },
    paint: {
      "text-color": "#111111",
      "text-halo-color": "#ffffff",
      "text-halo-width": 2.2,
      "text-halo-blur": 0.2
    }
  });
});
