// function init() {
//         // Create a horizontal bar chart
//         var sampleData = d.samples[0]
//         var sampleValues = sampleData.sample_values;
//         var otuIds = sampleData.otu_ids;
//         var otuLabels = sampleData.otu_labels;
//         //console.log(otuLabels);

//         // Slice top 10
//         var topTenValues = sampleValues.slice(0,10);
//         var modifiedIds = otuIds.map(d => {return `OTU ${d}`});
//         var topTenIds = modifiedIds.slice(0, 10);
//         var topTenLabels = otuLabels.slice(0, 10);
//         //console.log(topTenIds);

//         var trace1 = {
//             x: topTenValues.reverse(),
//             y: topTenIds.reverse(),
//             hovertext: topTenLabels.reverse(),
//             type: "bar",
//             orientation: "h"
//         };

//         var data = [trace1];

//         var layout = {
//             title: "Top 10 OTUs Found"
//         };

//         Plotly.newPlot("bar", data, layout);

//         // Create a bubble chart
//         var trace2 = {
//             x: otuIds,
//             y: sampleValues,
//             hovertext: otuLabels,
//             type: "scatter",
//             mode: "markers",
//             marker: {
//                 size: sampleValues,
//                 color: otuIds
//             }
//         };

//         var data2 = [trace2];

//         var layout2 = {
//             xaxis: {title:"OTU ID"},
//             title: "OTU ID vs Sample Values"
//         };

//         Plotly.newPlot("bubble", data2, layout2);
//     }
// init();


//Loop through names in samples.json to fill in dropdown options
// var options = ""
// var city = {{ current }}
// for(var i = 0; i < current.length; i++) {
//     options += `<option value="${i}">`+ city +"</option>";
//     document.getElementById("selDataset").innerHTML = options;
// }
 
// Update all of the plots any time that a new sample is selected
// d3.selectAll("#selDataset").on("change", optionChanged);

// function optionChanged() {
//     var dropdownMenu = d3.select("#selDataset");
//     var id = +dropdownMenu.property("value");

//     var xBar = []
//     var yBar = []
//     var hovertextBar = []

//     var xBubble = []
//     var yBubble = []
//     var hovertextBubble = []

//     for(var i = 0; i < d.names.length; i++) {
//         if (id === i) {
//             var newSampleData = d.samples[i];
//             xBar = newSampleData.sample_values.slice(0,10).reverse();
//             yBar = newSampleData.otu_ids.map(d => {return `OTU ${d}`}).slice(0,10).reverse();
//             hovertextBar = newSampleData.otu_labels.slice(0,10).reverse();

//             xBubble = newSampleData.otu_ids;
//             yBubble = newSampleData.sample_values;
//             hovertextBubble = newSampleData.otu_labels;

//             // Also update the demographic info
//             newSampleMetadata = [d.metadata[i]];
//         }
//     };

//     Plotly.restyle("bar", "x", [xBar]);
//     Plotly.restyle("bar", "y", [yBar]);
//     Plotly.restyle("bar", "hovertext", [hovertextBar]);

//     Plotly.restyle("bubble", "x", [xBubble]);
//     Plotly.restyle("bubble", "y", [yBubble]);
//     Plotly.restyle("bubble", "hovertext", [hovertextBubble]);

// };


//create data set on our data
var winddegree = 120;
dataSet = anychart.data.set([winddegree]);

//set the chart type
gauge = anychart.gauges.circular();

//link the data with the gauge
gauge.data(dataSet);
//set the starting angle for the gauge
gauge.startAngle(0)
     .sweepAngle(360)
     .fill('lavender');

var axis = gauge.axis()
    .radius(95)
    .width(1);
axis.scale()
    .minimum(0)
    .maximum(360)
    .ticks({interval: 30,fontColor:'royalblue'})
    .minorTicks({interval: 10,fontColor:'royalblue'});

axis.minorTicks()
    .enabled(true);

gauge.needle(0)
    .enabled(true)
    .startRadius('35%')
    .endRadius('80%')
    .middleRadius('45%')
    .startWidth('0.1%')
    .endWidth('0.1%')
    .fill('gold')
    .stroke('gold')
    .middleWidth('2%');

//gauge label
var windspeed = 20;
gauge.label()
    .text(windspeed)
    .anchor('center') //set the position of the label
    .adjustFontSize(true)
    .hAlign('center')
    .offsetY('-20%')
    .offsetX('50%')
    .width('80%')
    .height('10%')
    .fontColor('royalblue')
    .zIndex(10);
// draw chart
gauge.container('gaugechart').draw();

//fill() and stroke() or fontColor().