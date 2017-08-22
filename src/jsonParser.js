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
    this.inputScatterAr=[];
    this.inputString = ''; // inputString - store strings for label.
    this.isDataSet = false;
    this.isScatter=false;
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

  parseArrayToScatter(arr,obj) {
      if(arr!==undefined){
        this.inputScatterAr=arr;
      }
      this.isScatter=true;

      let i,
          dataScatterAr=[],
          temp,
          JSONobj={};
      
      for(i=0;i<this.inputScatterAr.length;i++){
        temp={};
        temp['y']=this.inputScatterAr[i][1]+'';
        temp['x']=this.inputScatterAr[i][0]+'';
        dataScatterAr.push(temp);
      }
      let tempObj={};
      tempObj['drawline']='1';
      tempObj['seriesname']='Demo';
      tempObj['data']=dataScatterAr;

      let tempAr=[];
      tempAr.push(tempObj);
      
      Object.keys(obj).forEach(function (property) {
        JSONobj[property] = obj[property];
        if (property === 'categories') {
          JSONobj['dataset'] = tempAr;
        }
      });

      console.log(JSON.stringify(JSONobj,null,2));
  }
    
}

const obj=new JSONParser();
obj.parseArrayToScatter([ [ 19, 10 ],
  [ 23, 15 ],
  [ 26, 18 ],
  [ 35, 29 ],
  [ 51, 47 ],
  [ 81, 81 ],
  [ 81, 81 ],
  [ 85, 86 ],
  [ 86, 87 ],
  [ 98, 100 ],
  [ 149, 168 ],
  [ 176, 129 ],
  [ 166, 184 ],
  [ 184, 135 ],
  [ 117, 125 ],
  [ 209, 301 ],
  [ 213, 296 ],
  [ 245, 260 ],
  [ 264, 239 ],
  [ 298, 201 ] ],{
  "chart": {
    "palette": "2",
    "caption": "Server Performance",
    "yaxisname": "Response Time (sec)",
    "xaxisname": "Server Load (TPS)",
    "xaxismaxvalue": "100",
    "xaxisminvalue": "20",
    "yaxismaxvalue": "7",
    "animation": "1"
  },
  "categories": [
    {
      "verticallinecolor": "666666",
      "verticallinethickness": "1",
      "category": [
        {
          "label": "20",
          "x": "20",
          "showverticalline": "1"
        },
        {
          "label": "30",
          "x": "30",
          "showverticalline": "1"
        },
        {
          "label": "40",
          "x": "40",
          "showverticalline": "1"
        },
        {
          "label": "50",
          "x": "50",
          "showverticalline": "1"
        },
        {
          "label": "60",
          "x": "60",
          "showverticalline": "1"
        },
        {
          "label": "70",
          "x": "70",
          "showverticalline": "1"
        },
        {
          "label": "80",
          "x": "80",
          "showverticalline": "1"
        },
        {
          "label": "90",
          "x": "90",
          "showverticalline": "1"
        },
        {
          "label": "100",
          "x": "100",
          "showverticalline": "0"
        },
        {
          "label": "110",
          "x": "110",
          "showverticalline": "0"
        },
        {
          "label": "120",
          "x": "120",
          "showverticalline": "0"
        },
        {
          "label": "130",
          "x": "130",
          "showverticalline": "0"
        },
        {
          "label": "140",
          "x": "140",
          "showverticalline": "0"
        },
        {
          "label": "150",
          "x": "150",
          "showverticalline": "0"
        },
        {
          "label": "160",
          "x": "160",
          "showverticalline": "0"
        },
        {
          "label": "170",
          "x": "170",
          "showverticalline": "0"
        },
        {
          "label": "180",
          "x": "180",
          "showverticalline": "0"
        },
        {
          "label": "190",
          "x": "190",
          "showverticalline": "0"
        },
        {
          "label": "200",
          "x": "200",
          "showverticalline": "0"
        },
        {
          "label": "210",
          "x": "210",
          "showverticalline": "0"
        }
      ]
    }
  ],
  "vtrendlines": [
    {
      "line": [
        {
          "startvalue": "20",
          "endvalue": "65",
          "alpha": "5",
          "color": "00FF00"
        },
        {
          "startvalue": "65",
          "endvalue": "75",
          "alpha": "15",
          "color": "FFFF00"
        },
        {
          "startvalue": "75",
          "endvalue": "100",
          "alpha": "15",
          "color": "FF0000"
        }
      ]
    }
  ],
  "trendlines": [
    {
      "line": [
        {
          "startvalue": "5.2",
          "displayvalue": "Check",
          "linethickness": "2",
          "color": "FF0000",
          "valueonright": "1",
          "dashed": "1",
          "dashgap": "5"
        }
      ]
    }
  ]
});


module.exports = JSONParser;