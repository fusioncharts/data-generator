const ConstantValue=require('./constant.config.js');

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