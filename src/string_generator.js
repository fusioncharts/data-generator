class StringGenerator{
    constructor(n, label){
        this.n = n;
        this.label = label;
        this['alphanumeric'] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', ',', '<', '>', '?', '[', ']'];
        this['month_short'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this['month_long'] = ['January', 'Februaury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobeer', 'November', 'December'];
        this['generic1'] = 'label';
        this['generic2'] = 'test';
        this['smallRandom'] = 3;
        this['largeRandom'] = 15;
    }

    generate(){
        let arrLabel = [], counter = 0;
        for(let i=0;i<this.n;i++){
            if(this.label === 'generic1' || this.label === 'generic2')
                arrLabel.push(this[this.label]+' '+i);
            else if(this.label.includes('Random')){
                let str = "";
                for(let i=0;i<this[this.label];i++)
                    str+= this['alphanumeric'][Math.floor(Math.random() * (this['alphanumeric'].length-1))];
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