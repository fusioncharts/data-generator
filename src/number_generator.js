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

    //Defines a range for the generator. Values possible - (x,y), (,y), (x,), (,)
    //Is this just for the X axis or Y axis or both. Currently on both ?
    this.range = {
      lowerBound: -1000000000,
      upperBound: 1000000000
    };

    //Properties not to be handled by testers
    this.arr = [];
    this.counter = 0;
    this.prevTrend = 'default';
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
  modifier(property, value, a, b) {
    if (property === 'trend') {
      if (a)
        this.trend.a = a;
      if (b)
        this.trend.b = b;
      this.trend.property = value;
    }

    else if (property === 'range') {
      if(value.length > 1){
        let val = value.split(',');
        if(val[0].length > 0)
          this.range.lowerBound = Number(val[0].trim());
        if(val[1].length > 0)
          this.range.upperBound = Number(val[1].trim());
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
    let spacing = -1, i = 0;
    if (type === 'integer') {
      //Adds n unique random numbers to the data this.array
      if(this.trend.property === 'random')
        this.random(n);

      else if(this.trend.property === 'linear')
        this.linear(n);

      else if(this.trend.property === 'exp')
        this.exponential(n);
    }
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  random(n){
    let spacing = -1, i = 0;
    while(i < n){
      let num = Math.floor((Math.random() * (this.range.upperBound-this.range.lowerBound)) + this.range.lowerBound);
      if(this.arr.indexOf(num) > -1)
        continue;
      else{
        if(this.chartType === 'scatter')
          this.arr.push([Math.floor((Math.random() * (this.range.upperBound-this.range.lowerBound)) + this.range.lowerBound), num]);
        else
          this.arr.push(num);
        i++;
      }
    } 
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  linear(n){
    if(this.prevTrend !== this.trend.property)
      this.counter = 0;

    let x = this.generateX(n);

    //Defines Slope
    this.trend.a = (this.range.upperBound - this.range.lowerBound)/(x[n-1] - x[0]);
    //Defines Intercept
    this.trend.b = (this.range.lowerBound - (this.trend.a * x[0]))

    //generate the y axis values
    for(let i=0;i<n;i++)
      if(this.chartType === 'scatter')
        this.arr.push([x[i], Math.ceil((this.trend.a * x[i])+this.trend.b)]);
      else
        this.arr.push(Math.ceil((this.trend.a * x[i])+this.trend.b));
  }

  /**
   * 
   * 
   * @param {any} n 
   * @memberof NumberGenerator
   */
  exponential(n){
    if(this.prevTrend !== this.trend.property)
      this.counter = 0;

    let x = this.generateX(n);

    //Defines rate of growth in exponential equation
    this.trend.b = Math.log(this.range.upperBound/this.range.lowerBound)/(x[n-1]-x[0]);
    //Define the constant in the exponential equation
    this.trend.a = this.range.lowerBound / Math.exp(this.trend.b * x[0]);

    //generate the y axis values
    for(let i=0;i<n;i++){
      if(this.chartType === 'scatter')
        this.arr.push([x[i], Math.floor(this.trend.a * Math.exp(this.trend.b * x[i]))]);
      else
        this.arr.push(Math.floor(this.trend.a * Math.exp(this.trend.b * x[i])));
    }
  }

  /**
   * 
   * 
   * @param {any} n 
   * @returns 
   * @memberof NumberGenerator
   */
  generateX(n){
    let x = [], i=0;
    //Generate random numbers on the x axis within the range
    while(i < n){
      let num = Math.floor((Math.random() * (this.range.upperBound-this.range.lowerBound)) + this.range.lowerBound);
      if(this.arr.indexOf(num) > -1)
        continue;
      else{
        x.push(num);
        i++;
      }
    }
    //Sort the x axis numbers numerically. Helps in finding the maximum value of x for both positive and negative range
    x.sort(function(a, b){return a-b});

    return x;
  }
}

module.exports = NumberGenerator;

//1. TODO: Add ellipse, parabola, quadratic, rectangular hyperbola, constant

let X = new NumberGenerator("column2D");

X.modifier('range', '30, 200');
X.modifier('trend', 'linear');
X.generate('integer', 20);

X.modifier('range', '300, 100');
X.modifier('trend', 'linear');
X.generate('integer', 5);

/*X.modifier('range', '-20, -100');
X.modifier('trend', 'linear');
X.generate('integer', 10);

X.modifier('range', '100, 200');
X.modifier('trend', 'random');
X.generate('integer', 5);

X.modifier('range', '300, 200');
X.modifier('trend', 'linear');
X.generate('integer', 5);*/

console.log(X.arr);