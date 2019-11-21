
var queryURL = "http://127.0.0.1:5000/_current_data.json";
var citylist = d3.select("#selDataset");
var countrylist = d3.select("#selcountry");
var wind = d3.select('#gaugechartwind');


// Add an empty option under country and city section
countrylist.append("option");
citylist.append("option");

var countryAndcity = {};
var citynames = [];

// query the uploaded api
d3.json(queryURL, function(data) {

    // Save the country names to a variable and sort it by alphabet 
    var allcountry = data.map(record => record.sys.country);
    var uniquecountry = [...new Set(allcountry)]; 
    uniquecountry = uniquecountry.sort();

    //Add the countries to dropdown menu
    uniquecountry.forEach(country => countrylist.append("option").text(country));
    console.log(uniquecountry);
    
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
// draw the gauge chart of wind speed and degree

  dataSetWind = anychart.data.set([350]);

    //set the chart type
  gaugeWind = anychart.gauges.circular();

    //link the data with the gauge
  gaugeWind.data(dataSetWind);
    //set the starting angle for the gauge
  gaugeWind.startAngle(0)
        .sweepAngle(360)
        .fill('lavender');

  var axisWind = gaugeWind.axis()
        .radius(95)
        .width(1);
  axisWind.scale()
        .minimum(0)
        .maximum(360)
        .ticks({interval: 30,fontColor:'royalblue'})
        .minorTicks({interval: 10,fontColor:'royalblue'});

  axisWind.minorTicks()
        .enabled(true);

  gaugeWind.needle(0)
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
  gaugeWind.label()
        .text( 1 + "\n m/s" )
        .anchor('center') //set the position of the label
        .adjustFontSize(true)
        .hAlign('center')
        .offsetY('0%')
        .offsetX('50%')
        .width('80%')
        .height('35%')
        .fontColor('royalblue')
        .zIndex(10);
    // draw chart
  gaugeWind.container('gaugechartwind').draw();
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw the gauge chart of temperature

  //var winddegree = 120;
dataSetTemp = anychart.data.set([17]);

  //set the chart type
gaugeTemp = anychart.gauges.circular();

  //link the data with the gauge
gaugeTemp.data(dataSetTemp);
  //set the starting angle for the gauge
gaugeTemp.startAngle(0)
      .sweepAngle(360)
      .fill('lavender');

var axisTemp = gaugeTemp.axis()
      .radius(95)
      .width(1);
axisTemp.scale()
      .minimum(-10)
      .maximum(50)
      .ticks({interval: 5,fontColor:'royalblue'})
      .minorTicks({interval: 1,fontColor:'royalblue'});

axisTemp.minorTicks()
      .enabled(true);

gaugeTemp.needle(0)
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
gaugeTemp.label()
      .text(17 + "\xB0C")
      .anchor('center') //set the position of the label
      .adjustFontSize(true)
      .hAlign('center')
      .offsetY('0%')
      .offsetX('50%')
      .width('80%')
      .height('20%')
      .fontColor('royalblue')
      .zIndex(10);

// draw chart
gaugeTemp.container('gaugecharttemp').draw();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// draw the gauge chart of humidity

dataSetHumid = anychart.data.set([82]);

//set the chart type
gaugeHumid = anychart.gauges.circular();

//link the data with the gauge
gaugeHumid.data(dataSetHumid);
  //set the starting angle for the gauge
gaugeHumid.startAngle(0)
      .sweepAngle(360)
      .fill('lavender');

var axisHumid = gaugeHumid.axis()
      .radius(95)
      .width(1);
axisHumid.scale()
      .minimum(0)
      .maximum(100)
      .ticks({interval: 10,fontColor:'royalblue'})
      .minorTicks({interval: 1,fontColor:'royalblue'});

axisHumid.minorTicks()
      .enabled(true);

gaugeHumid.needle(0)
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
gaugeHumid.label()
      .text(82+"%")
      .anchor('center') //set the position of the label
      .adjustFontSize(true)
      .hAlign('center')
      .offsetY('0%')
      .offsetX('50%')
      .width('50%')
      .height('20%')
      .fontColor('royalblue')
      .zIndex(10);
  // draw chart
gaugeHumid.container('gaugecharthumid').draw();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// actions after a country and a city is selected by user

// adjust the city selection menu
countrylist.on("change", function() {
      // save the country chosen as variable
      countryselected = d3.event.target.value;
  
      // clear the options under city menu and add an empty option
      citylist.html("");
      citylist.append("option")

      // based on the country chosen create the list of cities to choose from
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
    d3.json(queryURL, function(data) {
        weatherOfThisCity = data.filter(city => city.name === citySelected);

        //update the parameter of 3 gauge charts
        gaugeWind.data([weatherOfThisCity[0].wind.deg]);
        gaugeWind.label()
        .text(weatherOfThisCity[0].wind.speed + "\n m/s")

        gaugeTemp.data([weatherOfThisCity[0].main.temp]);
        gaugeTemp.label()
        .text(parseInt(weatherOfThisCity[0].main.temp)+ "\xB0C")

        gaugeHumid.data([weatherOfThisCity[0].main.humidity]);
        gaugeHumid.label()
        .text(weatherOfThisCity[0].main.humidity +"%")
      
        console.log(weatherOfThisCity);
    });

    
});
