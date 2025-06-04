// 🧠 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Initialize Mapbox Map with Custom Studio Style
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbibep5u00hf01s16biahnvm', // ✅ Your custom style
  center: [-94.58295, 39.09187],
  zoom: 16.5,
  pitch: 70,
  bearing: -30,
  antialias: true
});

map.on('load', () => {
  console.log("✅ Map loaded. Properties:", properties?.length);

  // 1️⃣ 3D TERRAIN
  map.addSource('mapbox-dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.terrain-rgb',
    tileSize: 512,
    maxzoom: 14
  });
  map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

  // 2️⃣ SKY LAYER
  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15
    }
  });

  // 3️⃣ 3D BUILDINGS from Studio Style Source
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

  // 4️⃣ INTERACTIVE MARKERS with POPUPS
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

  // 5️⃣ ALWAYS-VISIBLE LABELS
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
    "text-size": 14, // ⬆️ increased from 12 → 14
    "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
    "text-offset": [0, 1.5],
    "text-anchor": "top",
    "text-allow-overlap": true
  },
  paint: {
    "text-color": "#111111",             // darker gray for contrast
    "text-halo-color": "#ffffff",        // white outline
    "text-halo-width": 2.2,              // ⬆️ from 1 → 2.2 for bolder halo
    "text-halo-blur": 0.2                // subtle blur for smooth edges
  }
});
});

