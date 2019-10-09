var queryURL = "http://127.0.0.1:5000/_uv_forecast.json";

// Define a markerSize function that will give each city a different radius based on its UV value
function markerSize(UVvalue) {
  return UVvalue*30000;
};

d3.json(queryURL, function(data) {
  // Define arrays to hold created high_UV and low_UV markers
  console.log(data)
  var UVhigh = [];
  var UVmid = [];
  var UVlow = [];

  // Loop through locations and create high_UV and low_UV markers
  for (var i = 0; i < data.length; i++) {
    // Setting the marker radius for the state by passing UV values into the markerSize function
    if (data[i].value >= 10) {
      UVhigh.push(
        L.circle([data[i].lat,data[i].lon], {
          weight: 0.5,
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          radius: markerSize(data[i].value)
        })
        .bindPopup("<h5> " + data[i].name + "</h5> <hr> <h6>UV value: " + data[i].value + "</h6>")
    )}
    else if (data[i].value < 5){
      UVlow.push(
        L.circle([data[i].lat,data[i].lon], {
          weight: 0.5,
          fillOpacity: 0.75,
          color: "white",
          fillColor: "yellow",
          radius: markerSize(data[i].value)
        })
        .bindPopup("<h5> " + data[i].name + "</h5> <hr> <h6>UV value: " + data[i].value + "</h6>")
    )}
    else {
      UVmid.push(
        L.circle([data[i].lat,data[i].lon], {
          weight: 0.5,
          fillOpacity: 0.75,
          color: "white",
          fillColor: "coral",
          radius: markerSize(data[i].value)
        })
        .bindPopup("<h5> " + data[i].name + "</h5> <hr> <h6>UV value: " + data[i].value + "</h6>")
    )}}

  console.log(UVlow);
  console.log(UVmid);
  console.log(UVhigh);

  // Define variables for our base layers
  var globalmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 5,
    minZoom: 2,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  });

  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 5,
    minZoom: 2,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create two separate layer groups: one for high UV and one for low UV
  var high_UV = L.layerGroup(UVhigh);
  var mid_UV=L.layerGroup(UVmid);
  var low_UV = L.layerGroup(UVlow);

  // Create a baseMaps object
  var baseMaps = {
    "Street": globalmap,
    "Satellite": satellitemap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "UV value ≥ 10": high_UV,
    "5 ≤ UV value < 10": mid_UV,
    "UV value < 5": low_UV
  };

  // Define a map object
  var myMap = L.map("map", {
    center: [20, 10],
    zoom: 2,
    layers: [satellitemap, high_UV, mid_UV, low_UV]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});
