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

    // user defined. Higher Values cause aggressive growthRate in trend
    this.growthRate = 0;

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
   * @param {any} c 
   * @memberof NumberGenerator
   */
  modifier(property, value, a, b) {
    if (property === 'trend') {
      if (a)
        this.trend.a = a;
      /*else
        this.trend.a = Math.floor(Math.random() * (this.range.upperBound + this.range.lowerBound)/2) + this.range.lowerBound;*/
      if (b)
        this.trend.b = b;
      else
        if(value === 'linear' || value === 'log')
          this.trend.b = Math.floor(Math.random() * (this.range.upperBound + this.range.lowerBound)/2) + this.range.lowerBound;
      this.trend.property = value;
    }

    else if (property === 'growthRate' && this.range.upperBound === 1000000000)
      this.growthRate = value;

    else if(property === 'growthRate' && this.range.upperBound !== 1000000000)
      throw 'Cannot define growth rate if upper bound has already been defined';

    else if(property === 'growthRate' && this.growthRate === 'random')
      console.warn("Growth Rate will have no effect with random trend");

    else if (property === 'range') {
      if(value.length > 1){
        let val = value.split(',');
        if(val[0].length > 0)
          this.range.lowerBound = Number(val[0].trim());
        if(val[1].length > 0 && this.growthRate === 0)
          this.range.upperBound = Number(val[1].trim());
        else if(val[1].length > 0 && this.growthRate !== 0)
          throw 'Cannot define upper bound if growth rate has already been defined';
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
  generate(type, n) {
    let spacing = -1,
      i = 0;
    if (type === 'integer') {
      //Adds n unique random numbers to the data this.array
      if(this.trend.property === 'random'){
        while(i < n){
          let num = Math.floor((Math.random() * this.range.upperBound) + this.range.lowerBound);
          if(this.arr.indexOf(num) > -1)
            continue;
          else
            if(this.chartType === 'scatter')
              this.arr.push([i, num]);
            else
              this.arr.push(num);
        } 
      }

      else if(this.trend.property === 'linear'){
        if(this.prevTrend !== this.trend.property)
          this.counter = 0;

          let x = [], i=0;
          if(this.chartType === 'scatter'){
            //Generate random numbers on the x axis within the range
            while(i < n){
              let num = Math.floor((Math.random() * this.range.upperBound) + this.range.lowerBound);
              if(this.arr.indexOf(num) > -1)
                continue;
              else{
                x.push(num);
                i++;
              }
            }
            //Sort the x axis numbers numerically. Helps in finding the maximum value of x for both positive and negative range
            x.sort(function(a, b){return a-b});
          }
          else
            for(i=0;i<n;i++)
              x.push(i);

          //Formula to find slope such that Y axis values remain within given range
          if(this.range.lowerBound < this.range.upperBound)
            this.trend.a = Math.floor((this.range.upperBound - this.trend.b)/x[n-1]);
          else
            this.trend.a = -Math.floor((this.range.upperBound - this.trend.b)/x[n-1]);
          //generate the y axis values
          for(let i=0;i<n;i++)
            if(this.chartType === 'scatter')
              this.arr.push([x[i], (this.trend.a * x[i]) + this.trend.b])
            else
              this.arr.push((this.trend.a * x[i]) + this.trend.b);
      }
    }
  }
}


let X = new NumberGenerator("column");
X.modifier('range', '10, 100');
X.modifier('trend', 'random');
X.generate('integer', 10);
console.log(X.arr);