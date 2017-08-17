/**
 * Class that converts array to JSON compatible with FusionCharts
 * @class JSONParser
 */
class JSONParser {
  /**
     * Creates an instance of JSONParser.
     * @memberof JSONParser
     */
  constructor () {
    this.inputAr = []; // inputAr - store array that is to be converted.
    this.inputDataSetAr = [];
    this.inputString = ''; // inputString - store strings for label.
    this.isDataSet = false;
  }

  /**
     * Set inputAr to arr
     * @param {array} arr 
     * @memberof JSONParser
     */
  setInputAr (arr) {
    this.inputAr = arr;
  }

  /**
     * @returns string
     * @memberof JSONParser
     */
  getInputAr () {
    return this.inputAr;
  }

  /**
     * Create JSON data for Bar2d,Column2d,Pie.
     * @param {array} arr 
     * @param {object} obj 
     * @returns array
     * @memberof JSONParser
     */
  parseArrayToData (arr, obj) {
    if (arr !== undefined) {
      this.setInputAr(arr);
    }

    let i,
      dataAr = [];
    let JSONobj = {};

    for (i = 0; i < this.inputAr.length; i++) {
      let temp = {};
      if (!this.isDataSet) {
        temp['label'] = 'some label';
      }
      temp['value'] = this.inputAr[i] + '';
      dataAr.push(temp);
    }

    if (!this.isDataSet) {
      Object.keys(obj).forEach(function (property) {
        JSONobj[property] = obj[property];
        if (property === 'chart') {
          JSONobj['data'] = dataAr;
        }
      });
      // console.log(JSON.stringify(JSONobj, null, 2));
    }

    return dataAr;
  }

  /**
     * Create JSON data for MSCol2d, MSBar2d.
     * @param {array} arr 
     * @param {object} obj 
     * @returns array
     * @memberof JSONParser
     */
  parseArrayToDataSet (arr, obj) {
    if (arr !== undefined) {
      this.inputDataSetAr = arr;
    }
    this.isDataSet = true;

    let i,
      dataSetAr = [],
      temp,
      JSONobj = {};

    for (i = 0; i < this.inputDataSetAr.length; i++) {
      temp = {};
      temp['seriesname'] = 'demoName' + i;
      temp['data'] = this.parseArrayToData(this.inputDataSetAr[i]);
      dataSetAr.push(temp);
    }

    Object.keys(obj).forEach(function (property) {
      JSONobj[property] = obj[property];
      if (property === 'categories') {
        JSONobj['dataset'] = dataSetAr;
      }
    });

    // console.log(JSON.stringify(JSONobj, null, 2));
    return dataSetAr;
  }
}

module.exports = JSONParser;