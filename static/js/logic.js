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


