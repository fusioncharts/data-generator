
const FusionCharts = require('../fusioncharts/js/fusioncharts.js');
require("../fusioncharts/js/fusioncharts.charts.js")(FusionCharts);
require("../fusioncharts/js/themes/fusioncharts.theme.fint.js")(FusionCharts);
const NumberGenerator = require('./numbergenerator.js');
const ConstantValue = require('./constant.config.js');

const numberGeneratorObj = new NumberGenerator();


/**
 * Class that creates a json for fusioncharts testing
 * @class DataGenerator
 * @extends {ConstantValue}
 */
class DataGenerator extends ConstantValue {

    /**
     * Creates an instance of DataGenerator.
     * @param {string} str 
     * @memberof DataGenerator
     */
    constructor(str) {
        super();
        this.inputAr = [];
        this.inputDataSetAr = [];
        this.inputDataScatter = [];
        this.inputStringAr = [];
        this.finalJSON = {};
        this.finalJSONAr = [];
        this.finalJSONCategory = [];
        this.propertiesToBeAssigned = [];
        this.commandStack = [];
        // 0 - Data, 1 - DataSet, 2 - Scatter, 3 - Bubble
        this.chartType = -1;
        this.setChartType(str);
    }


    /**
     * Reset all the class members.
     * @memberof DataGenerator
     */
    initialize() {
        this.inputAr = [];
        this.inputDataSetAr = []
        this.inputDataScatter = [];
        this.inputStringAr = [];
        this.finalJSON = {};
        this.finalJSONAr = [];
        this.finalJSONCategory = [];
        this.propertiesToBeAssigned = [];
    }


    /**
     * Checks if an element is present in array
     * @param {array} arr 
     * @param {string} target 
     * @returns boolean
     * @memberof DataGenerator
     */
    presentIn(arr, target) {
        let i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                return true;
            }
        }
        return false;
    }


    /**
     * Sets chart type
     * @param {string} str 
     * @returns boolean | chartType
     * @memberof DataGenerator
     */
    setChartType(str) {
        if (str === undefined) {
            return false;
        }
        
        if (this.presentIn(this.chartTypeZero, str)) {
            this.chartType = 0;
        } else if (this.presentIn(this.chartTypeOne, str)) {
            this.chartType = 1;
        } else if (this.presentIn(this.chartTypeTwo, str)) {
            this.chartType = 2;
        } else if (this.presentIn(this.chartTypeThree, str)) {
            this.chartType = 3;
        } else {
            console.log('Chart type not supported.');
            return false;
        }
        numberGeneratorObj.chartType = str;
        return this.chartType;
    }


    /**
     * Stores a property given by user as input.
     * @param {string} property 
     * @param {string} value 
     * @param {string} location 
     * @memberof DataGenerator
     */
    assignProperty(property, value, location) {
        this.commandStack.push('assignProperty("' + property + '", "' + value + '", "' + location + '")');
        let ar = [];
        ar.push(property);
        ar.push(value);
        ar.push(location);

        this.propertiesToBeAssigned.push(ar);
        return ar;
    }

    /**
     * Applies/adds all properties given as input by the user.
     * @memberof DataGenerator
     */
    applyProperties() {
        let i, j, k;

        for (i = 0; i < this.propertiesToBeAssigned.length; i++) {
            if (this.propertiesToBeAssigned[i][2] === 'data') {
                // console.log('data');
                if (this.finalJSON.dataset !== undefined) {
                    for (j = 0; j < this.finalJSON.dataset.length; j++) {
                        for (k = 0; k < this.finalJSON.dataset[j].data.length; k++) {
                            this.finalJSON.dataset[j].data[k][this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
                        }
                    }
                } else if (this.finalJSON.data !== undefined) {
                    for (j = 0; j < this.finalJSON.data.length; j++) {
                        this.finalJSON.data[j][this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
                    }
                }
            } else if (this.propertiesToBeAssigned[i][2] === 'dataset') {
                // console.log('dataset');
                if (this.finalJSON.dataset !== undefined) {
                    for (j = 0; j < this.finalJSON.dataset.length; j++) {
                        this.finalJSON.dataset[j][this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
                    }
                }
            } else if (this.propertiesToBeAssigned[i][2] === 'categories') {
                // console.log('categories');
                if (this.finalJSON.categories !== undefined) {
                    for (j = 0; j < this.finalJSON.categories.length; j++) {
                        this.finalJSON.categories[j][this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
                    }
                }
            } else if (this.propertiesToBeAssigned[i][2] === 'category') {
                // console.log('category')
                if (this.finalJSON.categories !== undefined) {
                    for (j = 0; j < this.finalJSON.categories.length; j++) {
                        for (k = 0; k < this.finalJSON.categories[j].category.length; k++) {
                            this.finalJSON.categories[j].category[k][this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
                        }
                    }
                }
            } else if (this.propertiesToBeAssigned[i][2] === 'chart') {
                // console.log('chart');
                this.finalJSON.chart[this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
            } else if (this.propertiesToBeAssigned[i][2] === 'json') {
                this.finalJSON[this.propertiesToBeAssigned[i][0]] = this.propertiesToBeAssigned[i][1];
            }
        }
    }


    /**
     * Create data array
     * @param {string} arr 
     * @returns length of data array
     * @memberof DataGenerator
     */
    parseData(arr) {
        let i, tempJSONdata = {};

        for (i = 0; i < arr[0].length; i++) {
            tempJSONdata = {};
            tempJSONdata['label'] = arr[1][i];
            tempJSONdata['value'] = arr[0][i] + '';
            this.finalJSONAr.push(tempJSONdata);
        }

        return this.finalJSONAr.length;
    }

    /**
     * Create a dataset array
     * @param {array} arr - Data to be processed
     * @param {boolean} append - whether the current input should be appended to the previous input
     * @memberof DataGenerator
     */
    parseDataset(arr, append) {
        let i, tempAr = [],
            tempObj = {},
            tempCategory = [];

        if (arr[1].length !== 0) {
            if (this.finalJSONCategory.length > 0) {
                tempCategory = this.finalJSONCategory.pop()['category'];
            }
            // console.log(tempCategory);
            for (i = 0; i < arr[1].length; i++) {
                tempObj = {};
                tempObj['label'] = arr[1][i];
                tempCategory.push(tempObj);
            }

            tempObj = {};
            tempObj['category'] = tempCategory;
            this.finalJSONCategory.push(tempObj);
        }

        if (append === true) {
            if (this.finalJSONAr.length > 0) {
                tempAr = this.finalJSONAr.pop().data;
            }
        }

        // console.log(tempAr);
        for (i = 0; i < arr[0].length; i++) {
            tempObj = {};
            tempObj['value'] = arr[0][i] + '';
            tempAr.push(tempObj);
        }

        tempObj = {};
        tempObj['seriesname'] = 'series';
        tempObj['data'] = tempAr;

        this.finalJSONAr.push(tempObj);
    }

    /**
     * Create dataset for bubble chart
     * @param {array} arr - Data to be processed. 
     * @param {boolean} append - Whether to append the current data to the last data.
     * @memberof DataGenerator
     */
    parseDatasetBubble(arr, append) {
        // console.log(arr);
        let i, tempAr = [],
            tempObj = {};

        if (append === true) {
            if (this.finalJSONAr.length > 0) {
                tempAr = this.finalJSONAr.pop().data;
            }
        }

        for (i = 0; i < arr[0].length; i++) {
            tempObj = {};
            tempObj['x'] = arr[0][i][0] + '';
            tempObj['y'] = arr[0][i][1] + '';
            tempObj['z'] = arr[0][i][2] + '';
            tempObj['name'] = 'randomName';
            tempAr.push(tempObj);
        }

        tempObj = {};
        tempObj['seriesname'] = 'Bubbles';
        tempObj['data'] = tempAr;

        this.finalJSONAr.push(tempObj);
    }


    /**
     * Creates data for scatter plot[needs modification]
     * @param {string} arr 
     * @param {string} append 
     * @memberof DataGenerator
     */
    parseDatasetScatter(arr, append) {
        let i, tempAr = [],
            tempObj = {};

        if (append === true) {
            if (this.finalJSONAr.length > 0) {
                tempAr = this.finalJSONAr.pop().data;
            }
        }

        for (i = 0; i < arr[0].length; i++) {
            tempObj = {};
            tempObj['y'] = arr[0][i][1] + '';
            tempObj['x'] = arr[0][i][0] + '';
            tempAr.push(tempObj);
        }

        tempObj = {};
        tempObj['seriesname'] = 'scatter';
        tempObj['data'] = tempAr;
+
        this.finalJSONAr.push(tempObj);
    }


    /**
     * Receives array from numbergenerator
     * @param {array} arr 
     * @param {boolean} append 
     * @returns 
     * @memberof DataGenerator
     */
    addArray(arr, append) {
        // console.log(arr);
        if (arr === undefined || arr.length === 0) {
            return 'Array cannot be undefined or empty';
        }
        switch (this.chartType) {
            case 0:
                this.parseData(arr);
                break;
            case 1:
                this.parseDataset(arr, append);
                break;
            case 2:
                this.parseDatasetScatter(arr, append);
                break;
            case 3:
                this.parseDatasetBubble(arr, append);
                break;
            default: // do nothing.
        }
    }


    /**
     * 
     * @param {string} property 
     * @param {string} value 
     * @memberof DataGenerator
     */
    modifyNumber(property, value) {
        this.commandStack.push('modifyNumber("' + property + '", "' + value + '")');
        numberGeneratorObj.modifier(property, value);
    }


    /**
     * 
     * 
     * @param {string} numberType 
     * @param {number} total 
     * @param {boolean} append 
     * @param {string} label 
     * @memberof DataGenerator
     */
    generateNumber(numberType, total, append, label) {
        this.commandStack.push('generateNumber("' + numberType + '", ' + total + ', ' + append + (label === undefined ? ')' : ', "' + label + '")'));
        this.addArray(numberGeneratorObj.generate(numberType, total, label), append);
    }


    /**
     * 
     * 
     * @memberof DataGenerator
     */
    getCommandStack() {
        let i;
        console.log(this.commandStack.length);
        for (i = 0; i < this.commandStack.length; i++) {
            console.log(this.commandStack[i]);
        }
    }


    /**
     * 
     * 
     * @returns 
     * @memberof DataGenerator
     */
    clearCommandStack() {
        this.commandStack = [];
        return this.commandStack.length;
    }


    /**
     * 
     * 
     * @returns 
     * @memberof DataGenerator
     */
    getJSON() {
        this.finalJSON['chart'] = {'theme':'fint'};
        if (this.chartType === 0) {
            this.finalJSON['data'] = this.finalJSONAr;
        } else if (this.chartType === 1) {
            this.finalJSON['categories'] = this.finalJSONCategory;
            this.finalJSON['dataset'] = this.finalJSONAr;
        } else if (this.chartType === 2) {
            this.finalJSON['dataset'] = this.finalJSONAr;
        } else if (this.chartType === 3) {
            this.finalJSON['dataset'] = this.finalJSONAr;
        }
        this.applyProperties();

        console.log(JSON.stringify(this.finalJSON, null, 2));
        // this.initialize();
        return JSON.stringify(this.finalJSON, null, 2);
    }
}

// IMPORTANT : Reset function required cause one stack can affect another stack. Always reset when creating new stack.

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
        let d = datageneratorObj.getJSON();
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
        let d = datageneratorObj.getJSON();
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

    // console.log(chart_obj);

    FusionCharts.ready(function(){
      	let revenueChart = new FusionCharts(chart_obj);
        revenueChart.render();
    });

    console.log(chart_obj);
}

//const datageneratorObj = new DataGenerator('scatter');

// Write your code here
// numberGeneratorObj.chartType='scatter';
// datageneratorObj.modifyNumber('range', '30, 200');
// datageneratorObj.modifyNumber('trend', 'linear');
// datageneratorObj.generateNumber('integer', 5, false,'generic1');
// datageneratorObj.getJSON();
// console.log(datageneratorObj);
// datageneratorObj.modifyNumber('range', '30, 200');
/*datageneratorObj.modifyNumber('trend', 'exp');
datageneratorObj.generateNumber('integer', 5, false,'generic1');

datageneratorObj.getJSON();

// datageneratorObj.modifyNumber('range', '300, 500');
// datageneratorObj.modifyNumber('trend', 'random');
// datageneratorObj.assignProperty('abc', 'series', 'chart');

// datageneratorObj.generateNumber('integer', 10, false,'generic2');

// datageneratorObj.getJSON();
// datageneratorObj.getCommandStack();
datageneratorObj.generateNumber('integer', 10, false,'generic2');*/

//datageneratorObj.getJSON();
//datageneratorObj.getCommandStack();
