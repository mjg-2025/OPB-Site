// 🧠 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Init Map (FLAT)
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbibep5u00hf01s16biahnvm',
  center: [-94.58295, 39.09187],
  zoom: 16,
  pitch: 0,
  bearing: 0,
  antialias: true
});

map.on('load', () => {
  console.log("✅ Map loaded. Properties:", properties?.length);

  // 🧠 Combine GeoJSON for points + labels
  const geojson = {
    type: "FeatureCollection",
    features: properties.map(p => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.lon, p.lat] },
      properties: {
        address: p.address,
        submarket: p.submarket,
        space: p.space,
        link: p.link
      }
    }))
  };

  // 🔌 Source
  map.addSource("property-points", {
    type: "geojson",
    data: geojson
  });

  // 📍 SYMBOL LAYER with icon + text
  map.addLayer({
    id: "property-markers-layer",
    type: "symbol",
    source: "property-points",
    layout: {
      "icon-image": "marker", // built-in style icon (can change to your own!)
      "icon-size": 1.2,
      "icon-anchor": "bottom",
      "text-field": ["get", "address"],
      "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 13,
      "text-offset": [0, 1.3],
      "text-anchor": "top",
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-justify": "auto",
      "text-allow-overlap": false,
      "icon-allow-overlap": false
    },
    paint: {
      "text-color": "#111111",
      "text-halo-color": "#ffffff",
      "text-halo-width": 2.2,
      "text-halo-blur": 0.3
    }
  });

  // 🧠 Optional: hover popup
  map.on('mouseenter', 'property-markers-layer', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const p = e.features[0].properties;
    const html = `
      <div class="property-popup">
        <h3>${p.address}</h3>
        <p><strong>Submarket:</strong> ${p.submarket}</p>
        <p><strong>Size:</strong> ${Number(p.space).toLocaleString()} SF</p>
        ${p.link ? `<a href="${p.link}" target="_blank">📎 Brochure</a>` : `<em>No brochure</em>`}
      </div>
    `;

    const coordinates = e.features[0].geometry.coordinates.slice();
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(map);
  });

  map.on('mouseleave', 'property-markers-layer', () => {
    map.getCanvas().style.cursor = '';
    map.getPopup()?.remove();
  });
});
