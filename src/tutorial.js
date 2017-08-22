const FusionCharts = require('../fusioncharts/js/fusioncharts.js');
const DataGenerator = require('./datagenerator.js');
const NumberGenerator = require('./numbergenerator.js');
const ConstantValue = require('./constant.config.js');

require("../fusioncharts/js/fusioncharts.charts.js")(FusionCharts);
require("../fusioncharts/js/themes/fusioncharts.theme.fint.js")(FusionCharts);

window.driver=function(tut){
    
    let header = ['<p style="font-size:25px;color:black;"><strong>Getting Started</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>Using Trends</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>More about Modifiers &amp; Generators</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>Working with Large Data. Zoom Scatter Plot</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>Defining Custom Properties</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>Using JoCasta with FusionCharts in the browser</strong></p></br></br>', '<p style="font-size:25px;color:black;"><strong>Importing &amp; Exporting Custom Stacks</strong></p></br></br>'];
    let obj = {
        'tut1': '<p style="font-size:20px;color:#6f726b;">To generate data, you need to first create an object of type <span style="color:black;">DataGenerator</span>. To do so, run the following line: <span style="color:black;">const datageneratorObj = new DataGenerator(\'column2d\') </span>. Here the datagenerator constructor takes in a chart type as string.'+
        '</br>Once created you can use the object to add modifiers and then generate your data. This particular example concerns with showing how to produce varying results by using a simple property like <span style="color:black;">range</span>.</br></br><span style="color:black;">const datageneratorObj = new DataGenerator(\'column2d\');</br>datageneratorObj.modifyNumber(\'range\', \'30, 200\');</br>datageneratorObj.generateNumber(\'integer\', 5, false);</span></br></br>The first line initializes our data generator stack to use column chart properties. The next line uses a function called modifynumber which takes in a property and multiple values of that property. Here we define the range of the data to be generated. By default, the range for both X and Y axis are <span style="color:black;">[-1000000000, 1000000000]</span>.</br>When defining the range property, if only one string is passed as value, then the same range is applied to both X and Y axis by default. Passing another range string will apply the limit for both X and Y seperately(in that order).</br>The last line of code is the generator function which takes into consideration all the properties defined immediately before it and produces an array of values accordingly.</br>The function generateNumber takes in the following parameters, including optional ones. <span style="color:black;">generateNumber(type_of_number[integer, decimal], number_of_data-points, add_to_current_dataset[true, false], label_preset[many presets are provided. Check later tutorial])</span>',
        
        'tut2': '<p style="font-size:20px;color:#6f726b;">In order to generate vastly different data values for each test run, the <span style="color:black;">trend</span> property can be used. This property comes with three presets, namely <span style="color:black;">random</span>(set by defaut), <span style="color:black;">linear</span> and <span style="color:black;">exponential.</span></br></br><span style="color:black;">datageneratorObj.modifyNumber(\'trend\', \'exp\');</span></br></br>The above line sets the trend property to exponential.</br>The order of defining properties in the stack does not matter. Both range and trend properties can be stacked upon each other multiple times to give varying results.</br>Following lines of code were used to produce the above data.</br><span style="color:black;">const datageneratorObj = new DataGenerator(\'column2d\');'+
                '</br>datageneratorObj.modifyNumber(\'range\', \'50000, 2000\');'+
                '</br>datageneratorObj.modifyNumber(\'trend\', \'exp\');'+
                '</br>datageneratorObj.generateNumber(\'integer\', 8, false , \'generic2\');'+
                '</br>datageneratorObj.modifyNumber(\'range\', \'2000, 50000\');'+
                '</br>datageneratorObj.modifyNumber(\'trend\', \'exp\');'+
                '</br>datageneratorObj.generateNumber(\'integer\', 8, true , \'generic2\');</span></p>',
    };
    document.getElementById("lower").innerHTML = header[Number(tut.charAt(tut.length-1))-1]+obj[tut];
    let chart_obj = {};

    if(tut === 'tut1'){
        const datageneratorObj = new DataGenerator('column2d');
        datageneratorObj.modifyNumber('trend', 'random');
        datageneratorObj.modifyNumber('range', '30, 200');
        datageneratorObj.generateNumber('integer', 5, false , 'month_short');
        let d = datageneratorObj.getJSON(true);
        chart_obj = {
            type: 'column2d',
            renderAt: 'chart',
            width: '95%',
            height: '90%',
            dataFormat: 'json',
            dataSource: d
        }
        document.getElementById("json").innerHTML = d;
    }
    else if(tut === 'tut2'){
        const datageneratorObj = new DataGenerator('column2d');
        datageneratorObj.modifyNumber('range', '50000, 2000');
        datageneratorObj.modifyNumber('trend', 'exp');
        datageneratorObj.generateNumber('integer', 8, false , 'generic2');
        datageneratorObj.modifyNumber('range', '2000, 50000');
        datageneratorObj.modifyNumber('trend', 'exp');
        datageneratorObj.generateNumber('integer', 8, true , 'generic2');
        let d = datageneratorObj.getJSON(true);
        chart_obj = {
            type: 'column2d',
            renderAt: 'chart',
            width: '95%',
            height: '90%',
            dataFormat: 'json',
            dataSource: d
        }
        document.getElementById("json").innerHTML = d;
    }

    FusionCharts.ready(function(){
      	let revenueChart = new FusionCharts(chart_obj);
        revenueChart.render();
    });

    console.log(chart_obj);
}
