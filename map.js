// 🧠 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

// 🗺️ Init Map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbibep5u00hf01s16biahnvm',
  center: [-94.58295, 39.09187],
  zoom: 15.5,
  pitch: 0,
  bearing: 0,
  antialias: true
});

map.on('load', () => {
  console.log("✅ Map loaded. Total properties:", properties?.length);

  const geojson = {
    type: "FeatureCollection",
    features: properties.map((p, index) => ({
      type: "Feature",
      id: index,
      geometry: { type: "Point", coordinates: [p.lon, p.lat] },
      properties: {
        ...p,
        id: index
      }
    }))
  };

  // 🔌 Add data source
  map.addSource("property-points", {
    type: "geojson",
    data: geojson
  });

  // 📍 Symbol Layer
  map.addLayer({
    id: "property-markers-layer",
    type: "symbol",
    source: "property-points",
    layout: {
      "icon-image": "marker",
      "icon-size": 1.2,
      "icon-anchor": "bottom",
      "text-field": ["get", "address"],
      "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 13,
      "text-offset": [0, 1.3],
      "text-anchor": "top"
    },
    paint: {
      "text-color": "#111",
      "text-halo-color": "#fff",
      "text-halo-width": 2,
      "icon-color": "#F7941D"
    }
  });

  // 🔁 Checkbox logic
  const checkboxList = document.getElementById("checkboxList");
  const selectedIDs = new Set(properties.map((_, i) => i)); // default all visible

  // Render checkboxes
  properties.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'property-checkbox';
    row.innerHTML = `
      <label>
        <input type="checkbox" data-id="${i}" checked />
        ${p.address} (${p.space.toLocaleString()} SF)
      </label>
    `;
    checkboxList.appendChild(row);
  });

  // Update visibility
  function updateVisibility() {
    const filter = ["in", "$id", ...Array.from(selectedIDs)];
    map.setFilter("property-markers-layer", filter);
  }

  checkboxList.addEventListener("change", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    if (e.target.checked) {
      selectedIDs.add(id);
    } else {
      selectedIDs.delete(id);
    }
    updateVisibility();
  });

  updateVisibility(); // Init

  // 🧠 Popups
  map.on('mouseenter', 'property-markers-layer', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const p = e.features[0].properties;
    const html = `
      <h3>${p.address}</h3>
      <p><strong>Submarket:</strong> ${p.submarket}</p>
      <p><strong>Size:</strong> ${Number(p.space).toLocaleString()} SF</p>
      ${p.link ? `<a href="${p.link}" target="_blank">📎 Brochure</a>` : `<em>No brochure</em>`}
    `;
    new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML(html)
      .addTo(map);
  });

  map.on('mouseleave', 'property-markers-layer', () => {
    map.getCanvas().style.cursor = '';
    map.getPopup()?.remove();
  });

  // ☰ Sidebar toggle
  document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });
});
