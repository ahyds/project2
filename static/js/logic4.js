
var queryURL_c = "http://127.0.0.1:5000/_current_data.json";
var queryURL_f = "http://127.0.0.1:5000/_forecast_data.json";
var citylist = d3.select("#selDataset");
var countrylist = d3.select("#selcountry");
var wind = d3.select('#gaugechartwind');


var citynames = [];
var countryAndcity = {};

// Add an empty option under country and city section
countrylist.append("option");
citylist.append("option");

// query the uploaded api
d3.json(queryURL_c, function(data) {

    // Save the country names to a variable and sort it by alphabet 
    var allcountry = data.map(record => record.sys.country);
    var uniquecountry = [...new Set(allcountry)]; 
    uniquecountry = uniquecountry.sort();

    //Add the countries to dropdown menu
    uniquecountry.forEach(country => countrylist.append("option").text(country));
    
    // iterate through all countries and find all cities in that country and save the country and city pairs as a dictionary
    uniquecountry.forEach(function(country){
    var citiesOfcountry = data.filter(record => record.sys.country === country);
    var cityNamesByCountry = citiesOfcountry.map(record => record.name);
    var uniquecity = [...new Set(cityNamesByCountry)]; 
    countryAndcity[country] = uniquecity;
    });
    console.log(countryAndcity);
  
    // Save all the city names to a variable and add the them to dropdown menu
    data.forEach(city => {
    
        citynames.push(city.name);
    })
    citynames.forEach(city => citylist.append("option").text(city));
    
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw the range column chart to show temperature of next 5 days

var forecast5day = [];

// query the api and get the forescast temp of 1st city to offer data for initiating the chart
d3.json(queryURL_f, function(data) {
   var forecastForOne = data[0];

   // interate through 40 timepoints (every 3 hours in 5 days) to achieve temperature forecast
   for (var i = 0; i < 40; i++) {
         var label = forecastForOne.list[i].dt_txt;
         var min = forecastForOne.list[i].main.temp_min;
         var max = forecastForOne.list[i].main.temp_max;
         var temp = [label , min , max];
         forecast5day.push(temp);
    }
    
    console.log(forecast5day);
});

// Set a function to draw the chart with the weather info saved in var forecast5day
function myFunction() {
       console.log(forecast5day);
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
  
// stop for 7 sec to wait for querying data from api
setTimeout(myFunction, 7000);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// actions after a country and a city is selected by user

// adjust the city selection menu
countrylist.on("change", function() {
      // save the country chosen as variable
      countryselected = d3.event.target.value;
      
      // clear the options under city menu and add an empty option
      citylist.html("");
      citylist.append("option")

      // based on the country chosen create the list of state to choose from
      countryAndcity[countryselected].forEach(city => citylist.append("option").text(city));
    });

var citySelected = '';
var weatherOfThisCity = {};

// adjust the plot based on the select city
citylist.on("change", function() {
    //save the chosen city to a var 
    citySelected = d3.event.target.value;
    console.log(citySelected);
    
     // query the api to get the weather info of this city
    d3.json(queryURL_f, function(data) {
        weatherOfThisCity = data.filter(city => city.city.name === citySelected);
        console.log(weatherOfThisCity);
       
        //update the forecast temp and redraw the chart
        forecast5day = [];
        for (var i = 0; i < 40; i++) {

            var label = weatherOfThisCity[0].list[i].dt_txt;
            var min = weatherOfThisCity[0].list[i].main.temp_min;
            var max = weatherOfThisCity[0].list[i].main.temp_max;
            var temp = [label , min , max];
            forecast5day.push(temp);
        }
        rangecolumnchart.dispose();
        myFunction();
        
   
    });


    
});
