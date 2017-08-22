/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class ConstantValue{
    constructor(){
        this['alphanumeric'] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', ',', '<', '>', '?', '[', ']'];
        this['month_short'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this['month_long'] = ['January', 'Februaury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobeer', 'November', 'December'];
        this['generic1'] = 'label';
        this['generic2'] = 'test';
        this['smallRandom'] = 3;
        this['largeRandom'] = 15;
        this.chartTypeZero = ['bar2d', 'column2d', 'pie2d', 'line', 'area2d', 'doughnut2d', 'pareto2d'];
        this.chartTypeOne = ['mscolumn2d', 'msbar2d', 'msline', 'msarea', 'stackedcolumn2d', 'stackedarea2d', 'stackedbar2d'];
        this.chartTypeTwo = ['scatter'];
        this.chartTypeThree = ['bubble'];
        this.chartTypeFour = ['mlevelpie'];
        this.chartTypeFive = ['msstackedcolumn'];
    }
}
module.exports=ConstantValue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {



const NumberGenerator = __webpack_require__(2);
const ConstantValue = __webpack_require__(0);

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
        numberGeneratorObj.chartType = this.chartType;
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
        this.commandStack.push('assignProperty("'+property+'", "'+value+'", "'+location+'")');
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
        let i, tempAr = [],
            tempObj = {};

        if (append === true) {
            if (this.finalJSONAr.length > 0) {
                tempAr = this.finalJSONAr.pop().data;
            }
        }

        for (i = 0; i < arr.length; i++) {
            tempObj = {};
            tempObj['x'] = arr[i][0] + '';
            tempObj['y'] = arr[i][1] + '';
            tempObj['z'] = arr[i][2] + '';
            tempObj['name'] = 'randomName';
            tempAr.push(tempObj);
        }

        tempObj = {};
        tempObj['seriesname'] = 'Bubbles';
        tempObj['data'] = tempAr;

        this.finalJSONAr.push(tempObj);
    }

    parseDatasetScatter(arr, append) {
        let i, tempAr = [],
            tempObj = {};

        if (append === true) {
            if (this.finalJSONAr.length > 0) {
                tempAr = this.finalJSONAr.pop().data;
            }
        }

        for (i = 0; i < arr.length; i++) {
            tempObj = {};
            tempObj['y'] = arr[i][0] + '';
            tempObj['x'] = arr[i][1] + '';
            tempAr.push(tempObj);
        }

        tempObj = {};
        tempObj['seriesname'] = 'scatter';
        tempObj['data'] = tempAr;

        this.finalJSONAr.push(tempObj);
    }

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

    createNewPropertyOfNumber(property, _value) {
        Object.defineProperty(NumberGenerator.prototype, property, {
            value: _value
        });
    }

    modifyNumber(property, value) {
        this.commandStack.push('modifyNumber("'+property+'", "'+value+'")');
        numberGeneratorObj.modifier(property, value);
    }
    generateNumber(numberType, total, append, label) {
        this.commandStack.push('generateNumber("'+numberType+'", '+total+', '+append+ (label===undefined?')':', "'+label+'")'));
        this.addArray(numberGeneratorObj.generate(numberType, total, label), append);
    }

    getCommandStack(){
        let i;
        console.log(this.commandStack.length);
        for(i=0;i<this.commandStack.length;i++){
            console.log(this.commandStack[i]);
        }
    }
    clearCommandStack(){
        this.commandStack=[];
        return this.commandStack.length;
    }

    getJSON() {
        this.finalJSON['chart'] = {};
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
        this.initialize();
        return JSON.stringify(this.finalJSON, null, 2);
    }
}

const datageneratorObj = new DataGenerator('column2d');

// Write your code here


datageneratorObj.modifyNumber('range', '30, 200');
datageneratorObj.modifyNumber('trend', 'linear');
datageneratorObj.generateNumber('integer', 5, false,'generic1');

// datageneratorObj.modifyNumber('range', '30, 200');
datageneratorObj.modifyNumber('trend', 'exp');
datageneratorObj.generateNumber('integer', 5, false,'generic1');

// datageneratorObj.getJSON();

datageneratorObj.modifyNumber('range', '300, 500');
datageneratorObj.modifyNumber('trend', 'random');
// datageneratorObj.assignProperty('abc', 'series', 'chart');

datageneratorObj.generateNumber('integer', 10, false,'generic2');

datageneratorObj.getJSON();
// datageneratorObj.getCommandStack();

let fusionObject = {};
fusionObject['type']='column2d';
fusionObject['renderAt']='chartContainer';
fusionObject['width']='500';
fusionObject['height']='300';
fusionObject['dataFormat']='json';
fusionObject['datasource']=datageneratorObj.finalJSON;

FusionCharts.ready(function(){
    var revenueChart = new FusionCharts(fusionObject);
    revenueChart.render();
})

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const StringGenerator = __webpack_require__(3);

/**
 * 
 * 
 * @class NumberGenerator
 */
class NumberGenerator {

  /**
   * Creates an instance of NumberGenerator.
   * @param {any} chartType 
   * @memberof NumberGenerator
   */
  constructor(chartType) {
    this.chartType = chartType;

    // Values possible - random, constant, linear, exponential, logarithmic, prime
    this.trend = {
      property: 'random',
      a: 1,
      b: 1
    };

    //Defines a range for the generator on the X axis. Values possible - (lb,ub), (,ub), (lb,), (,)
    this.rangeX = {
      lowerBound: -1000000000,
      upperBound: 1000000000
    };

    //Defines a range for the generator on the Y axis. Values possible - (lb,ub), (,ub), (lb,), (,)
    this.rangeY = {
      lowerBound: -1000000000,
      upperBound: 1000000000
    };
  }

  /**
   * 
   * 
   * @param {any} property 
   * @param {any} value 
   * @param {any} a 
   * @param {any} b 
   * @memberof NumberGenerator
   */
  modifier(property, value1, value2) {
    if (property === 'trend')
      this.trend.property = value1;

    else if (property === 'range') {
      if (value1.length > 1) {
        let val = value1.split(',');
        if (val[0].length > 0)
          this.rangeX.lowerBound = Number(val[0].trim());
        if (val[1].length > 0)
          this.rangeX.upperBound = Number(val[1].trim());
      }
      if(!value2){
        this.rangeY.lowerBound = this.rangeX.lowerBound;
        this.rangeY.upperBound = this.rangeX.upperBound;
      }
      else{
        let val = value2.split(',');
        if (val[0].length > 0)
          this.rangeY.lowerBound = Number(val[0].trim());
        if (val[1].length > 0)
          this.rangeY.upperBound = Number(val[1].trim());
      }
    }
  }

  /**
   * 
   * 
   * @param {any} type 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  generate(type, n, label) {
    let spacing = -1,
      i = 0;
    if (type === 'integer' || type === 'decimal') {
      //Adds n unique random numbers to the data this.array
      if (this.trend.property === 'random') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.random(n, type), sg.generate()];
        } else
          return [this.random(n, type), []];
      } else if (this.trend.property === 'linear') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.linear(n, type), sg.generate()];
        } else
          return [this.linear(n, type), []];
      } else if (this.trend.property === 'exp') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.exponential(n, type), sg.generate()];
        } else
          return [this.exponential(n, type), []];
      }
    } else if (label) {
      let sg = new StringGenerator(n, label);
      return sg.generate();
    }
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  random(n, type) {
    let spacing = -1,
      i = 0,
      arr = [];
    while (i < n) {
      let num;
      if(type === 'integer')
        num = Math.floor((Math.random() * (this.rangeY.upperBound - this.rangeY.lowerBound)) + this.rangeY.lowerBound);
      else
        num = (Math.random() * (this.rangeY.upperBound - this.rangeY.lowerBound)) + this.rangeY.lowerBound;
      if (arr.indexOf(num) > -1)
        continue;
      else {
        if (this.chartType === 'scatter')
          if(type === 'integer')
            arr.push([Math.floor((Math.random() * (this.rangeX.upperBound - this.rangeX.lowerBound)) + this.rangeX.lowerBound), num]);
          else
            arr.push([(Math.random() * (this.rangeX.upperBound - this.rangeX.lowerBound) + this.rangeX.lowerBound), num]);
        else
          arr.push(num);
        i++;
      }
    }
    return arr;
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  linear(n, type) {
    let arr = [];
    if (this.prevTrend !== this.trend.property)
      this.counter = 0;

    let x = this.generateX(n, type);

    //Defines Slope
    this.trend.a = (this.rangeY.upperBound - this.rangeY.lowerBound) / (x[n - 1] - x[0]);
    //Defines Intercept
    this.trend.b = (this.rangeY.lowerBound - (this.trend.a * x[0]))

    //generate the y axis values
    for (let i = 0; i < n; i++)
      if (this.chartType === 'scatter')
        if(type === 'integer')
          arr.push([x[i], Math.ceil((this.trend.a * x[i]) + this.trend.b)]);
        else
          arr.push([x[i], ((this.trend.a * x[i]) + this.trend.b)]);
      else
        if(type === 'integer')
          arr.push(Math.ceil((this.trend.a * x[i]) + this.trend.b));
        else
          arr.push(((this.trend.a * x[i]) + this.trend.b));

    return arr;
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  exponential(n, type) {
    let arr = [];
    if (this.prevTrend !== this.trend.property)
      this.counter = 0;

    let x = this.generateX(n, type);

    //Defines rate of growth in exponential equation
    this.trend.b = Math.log(this.rangeY.upperBound / this.rangeY.lowerBound) / (x[n - 1] - x[0]);
    //Define the constant in the exponential equation
    this.trend.a = this.rangeY.lowerBound / Math.exp(this.trend.b * x[0]);

    //generate the y axis values
    for (let i = 0; i < n; i++) {
      if (this.chartType === 'scatter')
        if(type === 'integer')
          arr.push([x[i], Math.floor(this.trend.a * Math.exp(this.trend.b * x[i]))]);
        else
          arr.push([x[i], (this.trend.a * Math.exp(this.trend.b * x[i]))]);
      else
        if(type === 'integer')
          arr.push(Math.floor(this.trend.a * Math.exp(this.trend.b * x[i])));
        else
          arr.push((this.trend.a * Math.exp(this.trend.b * x[i])));
    }

    return arr;
  }

  /**
   * Generates Random numbers on the X axis within a given range
   * 
   * @param {any} n 
   * @returns 
   * @memberof NumberGenerator
   */
  generateX(n, type) {
    let x = [],
      i = 0;
    //Generate random numbers on the x axis within the range
    while (i < n) {
      let num;
      if(type === 'integer')
        num = Math.floor((Math.random() * (this.rangeX.upperBound - this.rangeX.lowerBound)) + this.rangeX.lowerBound);
      else
        num = ((Math.random() * (this.rangeX.upperBound - this.rangeX.lowerBound)) + this.rangeX.lowerBound);
      if (x.indexOf(num) > -1)
        continue;
      else {
        x.push(num);
        i++;
      }
    }
    //Sort the x axis numbers numerically. Helps in finding the maximum value of x for both positive and negative range
    x.sort(function (a, b) {
      return a - b
    });
    return x;
  }
}

module.exports = NumberGenerator;

//1. TODO: Add ellipse, parabola, quadratic, rectangular hyperbola, constant

// // let X = new NumberGenerator("scatter");

// // X.modifier('range', '30, 100');
// // X.modifier('trend', 'linear');
// // let c = X.generate('integer', 10);
// // console.log(c);
// // //console.log(c[0]);
// // //console.log(c[1]);

// // //console.log(X);

// // X.modifier('range', '100, 170', '100, 30');
// // X.modifier('trend', 'linear');
// // let d = X.generate('decimal', 10);
// // console.log(d[0]);
// // console.log(d[1]);

// // //console.log(X);

// // /*X.modifier('range', '300, 100');
// // X.modifier('trend', 'linear');
// // let d = X.generate('integer', 5, 'generic1');
// // console.log(d[0]);
// // console.log(d[1]);  

// // X.modifier('range', '300, 100');
// // X.modifier('trend', 'linear');
// let e = X.generate('none', 5, 'generic1');
// console.log(e);*/


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const ConstantValue=__webpack_require__(0);

class StringGenerator extends ConstantValue{
    constructor(n, label){
        super();
        this.n = n;
        this.label = label;
    }

    generate(){
        let arrLabel = [], counter = 0;
        for(let i=0;i<this.n;i++){
            if(this.label === 'generic1' || this.label === 'generic2')
                arrLabel.push(this[this.label]+' '+i);
            else if(this.label.includes('random')){
                let str = "";
                for(let i=0;i<this[this.label];i++)
                    str+= this['alphanumeric'][Math.floor(Math.random() * (this['alphanumeric'].length-1))];
                // console.log('SG '+str);
                arrLabel.push(str);
            }
            else if(this.label === 'month_short' || this.label === 'month_long'){
                if(i%12 == 0 && i !== 0)
                    counter++;
                if(counter > 0)
                    arrLabel.push(this[this.label][i%12]+" "+counter);
                else
                    arrLabel.push(this[this.label][i%12]);
            }
        }
        return arrLabel;
    }
}

module.exports = StringGenerator;

/***/ })
/******/ ]);