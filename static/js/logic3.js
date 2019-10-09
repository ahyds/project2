//create data set on our data
var queryURL = "http://127.0.0.1:5000/_current_data.json";
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

d3.json(queryURL, function(data) {
    
    var allcountry = data.map(record => record.sys.country);
    var uniquecountry = [...new Set(allcountry)]; 
    uniquecountry = uniquecountry.sort();
    uniquecountry.forEach(country => countrylist.append("option").text(country));
    console.log(uniquecountry);

    

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


//top10list.append('a').classed('dropdown-item', true).text('Shanghai')
//top10list.append('a').classed('dropdown-item', true).text('Delhi')
//function windchart(speed,degree){

    //var winddegree = 120;
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
    
//}

//function tempchart(temp){

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

// draw the chart to show humidity
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

    d3.json(queryURL, function(data) {
        weatherOfThisCity = data.filter(city => city.name === citySelected);
        //gauge.dispose();
        //dataSet = anychart.data.set([weatherOfThisCity[0].wind.deg]);

    //link the data with the gauge
        gaugeWind.data([weatherOfThisCity[0].wind.deg]);
        gaugeWind.label()
        .text(weatherOfThisCity[0].wind.speed + "\n m/s")

        gaugeTemp.data([weatherOfThisCity[0].main.temp]);
        gaugeTemp.label()
        .text(parseInt(weatherOfThisCity[0].main.temp)+ "\xB0C")

        gaugeHumid.data([weatherOfThisCity[0].main.humidity]);
        gaugeHumid.label()
        .text(weatherOfThisCity[0].main.humidity +"%")
        //windchart(weatherOfThisCity[0].wind.speed,weatherOfThisCity[0].wind.deg);
        console.log(weatherOfThisCity);
    });

    //console.log(weatherOfThisCity);
    //gauge.data([80]);
    
});

//windchart(50,90);
//tempchart(55);

//fill() and stroke() or fontColor().