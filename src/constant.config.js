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
    }
}
module.exports=ConstantValue;