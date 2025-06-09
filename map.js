mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

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
  const geojson = {
    type: "FeatureCollection",
    features: properties.map((p, index) => ({
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: [p.lon, p.lat]
      },
      properties: {
        ...p,
        id: index
      }
    }))
  };

  map.addSource("property-points", {
    type: "geojson",
    data: geojson
  });

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

  const checkboxList = document.getElementById("checkboxList");
  const selectedIDs = new Set(properties.map((_, i) => i));

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

  function updateVisibility() {
    const filter = ["in", "$id", ...Array.from(selectedIDs)];
    map.setFilter("property-markers-layer", filter);
  }

  checkboxList.addEventListener("change", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    e.target.checked ? selectedIDs.add(id) : selectedIDs.delete(id);
    updateVisibility();
  });

  updateVisibility();

  map.on('click', 'property-markers-layer', (e) => {
    const p = e.features[0].properties;
    const coords = e.features[0].geometry.coordinates;
    const cleanFolder = p.address.replaceAll(' ', '-').replaceAll('.', '').replaceAll(',', '');

    fetch(`/images/${cleanFolder}`)
      .then(res => res.json())
      .then(images => {
        let currentIndex = 0;

        const buildPopupHTML = () => {
          const imgHTML = images.length
            ? `<div style="position:relative">
                 <img src="/uploads/${images[currentIndex]}" style="width:100%; max-height:180px; object-fit:contain;" />
                 <div style="position:absolute;top:50%;left:0;transform:translateY(-50%);">
                   ${currentIndex > 0 ? `<button id="prevBtn">⬅️</button>` : ''}
                 </div>
                 <div style="position:absolute;top:50%;right:0;transform:translateY(-50%);">
                   ${currentIndex < images.length - 1 ? `<button id="nextBtn">➡️</button>` : ''}
                 </div>
               </div>`
            : `<em>No images</em>`;

          return `
            <h3>${p.address}</h3>
            <p><strong>Submarket:</strong> ${p.submarket}</p>
            <p><strong>Size:</strong> ${Number(p.space).toLocaleString()} SF</p>
            ${p.link ? `<a href="${p.link}" target="_blank">📎 Brochure</a>` : `<em>No brochure</em>`}
            ${imgHTML}
          `;
        };

        const popup = new mapboxgl.Popup()
          .setLngLat(coords)
          .setHTML(buildPopupHTML())
          .addTo(map);

        map.once('render', () => {
          setTimeout(() => attachGalleryListeners(), 10);
        });

        function attachGalleryListeners() {
          const nextBtn = document.getElementById("nextBtn");
          const prevBtn = document.getElementById("prevBtn");

          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              currentIndex = (currentIndex + 1) % images.length;
              popup.setHTML(buildPopupHTML());
              setTimeout(() => attachGalleryListeners(), 10);
            });
          }

          if (prevBtn) {
            prevBtn.addEventListener("click", () => {
              currentIndex = (currentIndex - 1 + images.length) % images.length;
              popup.setHTML(buildPopupHTML());
              setTimeout(() => attachGalleryListeners(), 10);
            });
          }
        }
      });
  });

  map.on('mouseenter', 'property-markers-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'property-markers-layer', () => {
    map.getCanvas().style.cursor = '';
  });

  document.getElementById("toggleSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });
});
