//Json data URL
var queryURL = "http://127.0.0.1:5000/_current_data.json";

// set the dimensions and margins of the graph
var margin = {top: 57, right: 0, bottom: 0, left: 30},
    width = 800 - margin.left - margin.right,
    height = 770 -  margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

// Option 1: give 2 color names
    // var myColor = d3.scaleLinear().domain([1,10])
    //   .range(["red", "blue"])
    

//Get the data
d3.json(queryURL, function(error, data) {
    //var data = data.All;
    console.log(data.All);
    var cnt = 0;
    // var citypress = [];
    // var cityname = [];

    data = data.slice(0,50)

    // Loop through cities
    data.forEach(function(d) {
        d.cityname = d.name,
        d.tempvalue = d.clouds.all;
    })
    // for (var i = 0; i < jsdata.length; i++) {

  // // Option 1: give 2 color names
  // var myColor = d3.scaleLinear()
  //             .domain([1,data.length])
  //             .range(["white", "blue"])

  // Scales
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.cityname; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 100]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2" )    //"#69b3a2"
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d.tempvalue*0.79); })
          .startAngle(function(d) { return x(d.cityname); })
          .endAngle(function(d) { return x(d.cityname) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.cityname) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.cityname) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.tempvalue)+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.cityname)})
        .attr("transform", function(d) { return (x(d.cityname) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

});