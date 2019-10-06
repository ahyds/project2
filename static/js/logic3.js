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
gauge.container('gaugechartwind').draw();

//fill() and stroke() or fontColor().