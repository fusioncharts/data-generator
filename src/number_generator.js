const StringGenerator = require('./string_generator.js');

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
  modifier(property, value) {
    if (property === 'trend')
      this.trend.property = value;

    else if (property === 'range') {
      if (value.length > 1) {
        let val = value.split(',');
        if (val[0].length > 0)
          this.range.lowerBound = Number(val[0].trim());
        if (val[1].length > 0)
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
    let spacing = -1,
      i = 0;
    if (type === 'integer' || type === 'decimal') {
      //Adds n unique random numbers to the data this.array
      if (this.trend.property === 'random') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.random(n, type), sg.generate()];
        } else
          return this.random(n, type);
      } else if (this.trend.property === 'linear') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.linear(n, type), sg.generate()];
        } else
          return this.linear(n, type);
      } else if (this.trend.property === 'exp') {
        if (label) {
          let sg = new StringGenerator(n, label);
          return [this.exponential(n, type), sg.generate()];
        } else
          return this.exponential(n, type);
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
        num = Math.floor((Math.random() * (this.range.upperBound - this.range.lowerBound)) + this.range.lowerBound);
      else
        num = (Math.random() * (this.range.upperBound - this.range.lowerBound)) + this.range.lowerBound;
      if (arr.indexOf(num) > -1)
        continue;
      else {
        if (this.chartType === 'scatter')
          if(type === 'integer')
            arr.push([Math.floor((Math.random() * (this.range.upperBound - this.range.lowerBound)) + this.range.lowerBound), num]);
          else
            arr.push([(Math.random() * (this.range.upperBound - this.range.lowerBound) + this.range.lowerBound), num]);
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

    let x = this.generateX(n);

    //Defines Slope
    this.trend.a = (this.range.upperBound - this.range.lowerBound) / (x[n - 1] - x[0]);
    //Defines Intercept
    this.trend.b = (this.range.lowerBound - (this.trend.a * x[0]))

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

    let x = this.generateX(n);

    //Defines rate of growth in exponential equation
    this.trend.b = Math.log(this.range.upperBound / this.range.lowerBound) / (x[n - 1] - x[0]);
    //Define the constant in the exponential equation
    this.trend.a = this.range.lowerBound / Math.exp(this.trend.b * x[0]);

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
        num = Math.floor((Math.random() * (this.range.upperBound - this.range.lowerBound)) + this.range.lowerBound);
      else
        num = ((Math.random() * (this.range.upperBound - this.range.lowerBound)) + this.range.lowerBound);
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

let X = new NumberGenerator("column2D");

/*X.modifier('range', '30, 100');
X.modifier('trend', 'linear');
let c = X.generate('integer', 10, 'month_short');
console.log(c[0]);
console.log(c[1]);

X.modifier('range', '300, 100');
X.modifier('trend', 'linear');
let d = X.generate('integer', 5, 'generic1');
console.log(d[0]);
console.log(d[1]);  

X.modifier('range', '300, 100');
X.modifier('trend', 'linear');
let e = X.generate('none', 5, 'generic1');
console.log(e);*/