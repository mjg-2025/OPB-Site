mapboxgl.accessToken = 'pk.eyJ1IjoibWVsaXNzYWdhbGwyMDIzIiwiYSI6ImNsbWpzZmRkdTA1dmEya2w4MHMybGtpNjkifQ.aoXUpnQ0onOhWlwuCWmdEA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/melissagall2023/cmbia5kao00ha01s161w58d9q',
  center: [-94.58295, 39.09187],
  zoom: 16.5,
  pitch: 70,
  bearing: -30,
  antialias: true
});
