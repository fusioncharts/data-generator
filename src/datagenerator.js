
class DataGenerator{
    constructor(str){
        this.inputAr = [];
        this.inputDataSetAr=[];
        this.inputDataScatter=[];
        this.inputStringAr=[];
        this.finalJSON={};
        this.finalJSONAr=[];
        // 0 - Data, 1 - Data, 2 - Scatter, 3 - Bubble
        this.chartType=-1;
        this.chartTypeZero=['bar2d','column2d','pie2d','line','area2d','doughnut2d','pareto2d'];
        this.chartTypeOne=['mscolumn2d','msbar2d','msline','msarea','stackedcolumn2d','stackedarea2d','stackedbar2d'];
        this.chartTypeTwo=['scatter'];
        this.chartTypeThree=['bubble'];
        this.setChartType(str);
    }

    initialize(){
        this.inputAr=[];
        this.inputDataSetAr=[]
        this.inputDataScatter=[];
        this.inputStringAr=[];
        this.finalJSON={};
        this.finalJSONAr=[];
    }

    presentIn(arr,target){
        let i;
        for(i=0;i<arr.length;i++){
            if(arr[i]===target){
                return true;
            }
        }
        return false;
    }

    setChartType(str){
        if(str===undefined){
            return false;
        }

        if(this.presentIn(this.chartTypeZero,str)){
            this.chartType=0;
        }else if(this.presentIn(this.chartTypeOne,str)){
            this.chartType=1;
        }else if(this.presentIn(this.chartTypeTwo,str)){
            this.chartType=2;
        }else if(this.presentIn(this.chartTypeThree,str)){
            this.chartType=3;
        }else{
            return 'Chart type not supported';
        }

        return this.chartType;
    }

    parseData(arr){
        let i, tempJSONdata={};

        for(i=0;i<arr.length;i++){
            tempJSONdata={};
            tempJSONdata['label']='label';
            tempJSONdata['value']=arr[i]+'';
            this.finalJSONAr.push(tempJSONdata);
        }
        
        return this.finalJSONAr.length;
    }

    parseDataset(arr,append){
        let i, tempAr=[], tempObj={};

        if(append===true){
            if(this.finalJSONAr.length>0){
                tempAr=this.finalJSONAr.pop().data;
            }
        }
        for(i=0;i<arr.length;i++){
            tempObj={};
            tempObj['value']=arr[i]+'';
            tempAr.push(tempObj);
        }

        tempObj={};
        tempObj['seriesname']='series';
        tempObj['data']=tempAr;

        this.finalJSONAr.push(tempObj);
    }

    parseDatasetBubble(arr,append){
        let i, tempAr=[], tempObj={};

        if(append===true){
            if(this.finalJSONAr.length>0){
                tempAr=this.finalJSONAr.pop().data;
            }
        }

        for(i=0;i<arr.length;i++){
            tempObj={};
            tempObj['x']=arr[i][0]+'';
            tempObj['y']=arr[i][1]+'';
            tempObj['z']=arr[i][2]+'';
            tempObj['name']='randomName';
            tempAr.push(tempObj);
        }

        tempObj={};
        tempObj['seriesname']='Bubbles';
        tempObj['data']=tempAr;

        this.finalJSONAr.push(tempObj);
    }

    parseDatasetScatter(arr,append){
        let i, tempAr=[], tempObj={};

        if(append===true){
            if(this.finalJSONAr.length>0){
                tempAr=this.finalJSONAr.pop().data;
            }
        }

        for(i=0;i<arr.length;i++){
            tempObj={};
            tempObj['y']=arr[i][0]+'';
            tempObj['x']=arr[i][1]+'';
            tempAr.push(tempObj);
        }

        tempObj={};
        tempObj['seriesname']='scatter';
        tempObj['data']=tempAr;

        this.finalJSONAr.push(tempObj);
    }

    addArray(arr,append){
        if(arr===undefined || arr.length===0){
            return 'Array cannot be undefined or empty';
        }
        switch(this.chartType){
            case 0: this.parseData(arr);break;
            case 1: this.parseDataset(arr,append);break;
            case 2: this.parseDatasetScatter(arr);break;
            case 3: this.parseDatasetBubble(arr);break;
            default: // do nothing.
        }
    }

    generateData(numberType,total,append){
        //
        if(append){}
    }
    getJSON(){
        if(this.chartType===0){
            this.finalJSON['data']=this.finalJSONAr;
        }else if(this.chartType===1){
            this.finalJSON['dataset']=this.finalJSONAr;
        }else if(this.chartType===2){
            this.finalJSON['dataset']=this.finalJSONAr;
        }else if(this.chartType===3){
            this.finalJSON['dataset']=this.finalJSONAr;
        }

        console.log(JSON.stringify(this.finalJSON,null,2));
        this.initialize();
        return JSON.stringify(this.finalJSON,null,2);
    }
}

const obj = new DataGenerator('mscolumn2d');

obj.addArray([1,2,3,4,5,6,7,7,8,9],false);
obj.addArray([1,2,3,4,5,6,7,7,8,9],false);
obj.getJSON();