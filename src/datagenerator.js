
const FusionCharts = require('../fusioncharts/js/fusioncharts.js');
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

    applyPropertiesHelper(ar,obj){
        let i,j;
        for(i in obj) {
            if(i === ar[2]) {
                obj[ar[0]]=ar[1];
            }

            if(obj[i].constructor === Object) {
                this.applyPropertiesHelper(ar,obj[i]);
            }else if(obj[i].constructor === Array) {
                for(j in obj[i]) {
                    if(obj[i][j].constructor === Object) {
                        this.applyPropertiesHelper(ar,obj[i][j]);
                    }
                }
            }
        }
    }
    
    /**
     * Applies/adds all properties given as input by the user.
     * @memberof DataGenerator
     */
    applyProperties() {
        let i, j, k;

        for(i=0;i<this.propertiesToBeAssigned.length;i++){
            this.applyPropertiesHelper(this.propertiesToBeAssigned[i],this.finalJSON);
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
            tempObj['name'] = arr[1][i];
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
    getJSON(reset) {
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
        let str = JSON.stringify(this.finalJSON, null, 2);
        if(reset){
            this.initialize();
        }
        return str;
    }
}

module.exports = DataGenerator;
const datageneratorObj = new DataGenerator('column2d');

// Write your code here

datageneratorObj.modifyNumber('range', '30, 200');
datageneratorObj.modifyNumber('trend', 'linear');
datageneratorObj.generateNumber('integer', 5, false,'generic1');
// datageneratorObj.getJSON(false);
datageneratorObj.assignProperty('abc','xyz','label');
datageneratorObj.getJSON(true);

// datageneratorObj.modifyNumber('range', '30, 200');
datageneratorObj.modifyNumber('trend', 'exp');
datageneratorObj.generateNumber('decimal', 5, true,'generic1');

datageneratorObj.getJSON(true);

