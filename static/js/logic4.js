//create data set on our data
var queryURL_c = "http://127.0.0.1:5000/_current_data.json";
var queryURL_f = "http://127.0.0.1:5000/_forecast_data.json";
var citylist = d3.select("#selDataset");
var countrylist = d3.select("#selcountry");

var wind = d3.select('#gaugechartwind');

//var sampleid = "";
//var sampleids = [];
var citynames = [];

// Add an empty option under country section
countrylist.append("option");
citylist.append("option");
var countryAndcity = {};

d3.json(queryURL_c, function(data) {
    
    var allcountry = data.map(record => record.sys.country);
    var uniquecountry = [...new Set(allcountry)]; 
    uniquecountry = uniquecountry.sort();
    uniquecountry.forEach(country => countrylist.append("option").text(country));
    //console.log(uniquecountry);

    

    uniquecountry.forEach(function(country){
    var citiesOfcountry = data.filter(record => record.sys.country === country);
    var cityNamesByCountry = citiesOfcountry.map(record => record.name);
    var uniquecity = [...new Set(cityNamesByCountry)]; 
    countryAndcity[country] = uniquecity;
    });
    console.log(countryAndcity);
  
    data.forEach(city => {
        //console.log(city.name);
        citynames.push(city.name);
    })

    citynames.forEach(city => citylist.append("option").text(city));
    
});



var forecast5day = [];

d3.json(queryURL_f, function(data) {
   var forecastForOne = data[0];
   
   for (var i = 0; i < 40; i++) {
         var label = forecastForOne.list[i].dt_txt;
         var min = forecastForOne.list[i].main.temp_min;
         var max = forecastForOne.list[i].main.temp_max;
         var temp = [label , min , max];
         forecast5day.push(temp);
    }
    
    console.log(forecast5day);
});

function myFunction() {
       console.log(forecast5day);// your code to run after the timeout
       rangecolumnchart = anychart.column();
    
    // create a range column series and set the data
      var series_range = rangecolumnchart.rangeColumn(forecast5day);
      series_range.normal().fill("#000080", 0.9);
      series_range.hovered().fill("#0066cc", 0.9);
      series_range.normal().stroke("#000080");
      series_range.hovered().stroke("#0066cc", 2);
      var xAxisLabels = rangecolumnchart.xAxis().labels();
      xAxisLabels.rotation(90);
      rangecolumnchart.container("rangecolumn");
      rangecolumnchart.draw();
     
  }
  
  // stop for sometime if needed
setTimeout(myFunction, 7000);

function range(){
      rangecolumnchart = anychart.column();
    
    // create a range column series and set the data
      var series_range = rangecolumnchart.rangeColumn(forecast5day);
      series_range.normal().fill("#000080", 0.9);
      series_range.hovered().fill("#0066cc", 0.9);
      series_range.normal().stroke("#000080");
      series_range.hovered().stroke("#0066cc", 2);

      var xAxisLabels = rangecolumnchart.xAxis().labels();
      xAxisLabels.rotation(90);

      // set the container id
      rangecolumnchart.container("rangecolumn");
      
      // initiate drawing the chart
      rangecolumnchart.draw();
}






countrylist.on("change", function() {
      countryselected = d3.event.target.value;
      //console.log(country);
      // if (!(country) ) {
      //   state = "";
      // }
  
      // based on the country chosen create the list of state to choose from
      citylist.html("");
      citylist.append("option")
      countryAndcity[countryselected].forEach(city => citylist.append("option").text(city));
    });

var citySelected = '';
var weatherOfThisCity = {};

// change the plot based on the select sample id
citylist.on("change", function() {
    //save the chosen id to var sampleid
   
    citySelected = d3.event.target.value;
    console.log(citySelected);

    d3.json(queryURL_f, function(data) {
        weatherOfThisCity = data.filter(city => city.city.name === citySelected);
        console.log(weatherOfThisCity);
        //var forecastForOne = weatherOfThisCity;
        forecast5day = [];
        for (var i = 0; i < 40; i++) {

            var label = weatherOfThisCity[0].list[i].dt_txt;
            var min = weatherOfThisCity[0].list[i].main.temp_min;
            var max = weatherOfThisCity[0].list[i].main.temp_max;
            var temp = [label , min , max];
            forecast5day.push(temp);
        }
        rangecolumnchart.dispose();
        range();
        //series_range = rangecolumnchart.rangeColumn(forecast5day);
   
    });


    
});
