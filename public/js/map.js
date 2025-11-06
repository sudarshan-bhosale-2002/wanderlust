mapboxgl.accessToken = mapToken;
console.log("Listing geometry:", listing.geometry);
console.log("Listing coordinates:", listing.geometry?.coordinates);

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // ✅ corrected
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" }) // also removed extra space
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4><p>Exact location provided after booking</p>`
    )
  )
  .addTo(map);
