const NumberGenerator = require('./numbergenerator.js');
const ConstantValue = require('./constant.config.js');

const numberGeneratorObj = new NumberGenerator();

class DataGenerator extends ConstantValue {
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
        // 0 - Data, 1 - DataSet, 2 - Scatter, 3 - Bubble
        this.chartType = -1;
        this.setChartType(str);
    }

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

    presentIn(arr, target) {
        let i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                return true;
            }
        }
        return false;
    }

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

    assignProperty(property, value, location) {
        let ar = [];
        ar.push(property);
        ar.push(value);
        ar.push(location);

        this.propertiesToBeAssigned.push(ar);
    }

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
        numberGeneratorObj.modifier(property, value);
    }
    generateNumber(numberType, total, append, label) {
        this.addArray(numberGeneratorObj.generate(numberType, total, label), append);
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

const datageneratorObj = new DataGenerator('mscolumn2d');

// Write your code here


datageneratorObj.modifyNumber('range', '30, 200');
datageneratorObj.modifyNumber('trend', 'linear');
datageneratorObj.generateNumber('integer', 5, false, 'month_short');

// datageneratorObj.getJSON();

datageneratorObj.modifyNumber('range', '300, 500');
datageneratorObj.modifyNumber('trend', 'random');
datageneratorObj.assignProperty('abc', 'series', 'chart');
datageneratorObj.assignProperty('xyz', 'random', 'category');
datageneratorObj.generateNumber('integer', 5, false);

datageneratorObj.getJSON();