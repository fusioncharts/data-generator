class NumberGenerator {
  constructor (chartType) {
    this.chartType = chartType;
    this.pattern = {left: 'random', right: 'random'};                 // random, (pos,pos), (pos,neg), (neg,neg), (neg,pos)
    this.trend = {property: 'random', a: 1, b: 1, c: 1};              // random, constant, linear, exponential, logarithmic, prime
    this.growth = 'random';                                           // random, low, medium, high
    this.range = {lowerBound: -1000000000, upperBound: 1000000000};
    this.arr = [];
  }
  modifier (property, value, a, b, c) {
    if (property === 'pattern'){
      let val = value.split(',');
      this.pattern.left = val[0];
      this.pattern.right = val[1];
    }
    else if (property === 'trend') {
      if (a) { this.trend.a = a; }
      if (b) { this.trend.b = b; }
      if (c) { this.trend.c = c; }
      this.trend.property = value;
    }
    else if(property === 'growth')
      this.growth = value;
    else if(property === 'range'){
      let val = value.split(',');
      this.range.lowerBound = val[0];
      this.range.upperBound = val[1];
    }
  }
}

let X = new NumberGenerator("column");
X.modifier('pattern', 'pos,pos');
X.modifier('range', '10, 100');
X.modifier('trend', 'linear', 23);
console.log(X.chartType);
console.log(X.pattern);
console.log(X.trend);
console.log(X.growth);
console.log(X.range);
console.log(X.arr);