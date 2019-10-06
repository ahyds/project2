var queryURL = "http://127.0.0.1:5000/_uv_forecast.json";

// Define a markerSize function that will give each city a different radius based on its UV value
function markerSize(UVvalue) {
  return UVvalue*30000;
};

d3.json(queryURL, function(data) {
  // Define arrays to hold created high_UV and low_UV markers
  console.log(data)
  var UVhigh = [];
  var UVlow = [];

  // Loop through locations and create high_UV and low_UV markers
  for (var i = 0; i < data.length; i++) {
    // Setting the marker radius for the state by passing UV values into the markerSize function
    if (data[i].value >=5) {
      UVhigh.push(
        L.circle([data[i].lat,data[i].lon], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          radius: markerSize(data[i].value)
        })
        .bindPopup("<h1>UV value: " + data[i].value + "</h1>")
    )}
    else {
      UVlow.push(
        L.circle([data[i].lat,data[i].lon], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "yellow",
          radius: markerSize(data[i].value)
        })
        .bindPopup("<h1>UV value: " + data[i].value + "</h1>")
    )}}

  console.log(UVlow)
  console.log(UVhigh);

  // Define variables for our base layers
  var globalmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  });

  // Create two separate layer groups: one for high UV and one for low UV
  var high_UV = L.layerGroup(UVhigh);
  var low_UV = L.layerGroup(UVlow);

  // Create a baseMaps object
  var baseMaps = {
    "Map": globalmap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "UV value ≥ 5": high_UV,
    "UV value < 5": low_UV
  };

  // Define a map object
  var myMap = L.map("map", {
    center: [20, 10],
    zoom: 2.5,
    layers: [globalmap, high_UV, low_UV]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // L.circle//(cities[i].lat,cities[i].lon)
  // .bindPopup("<h1>" + cities[i].value + "</h1>")
  // .addTo(myMap);
  });
