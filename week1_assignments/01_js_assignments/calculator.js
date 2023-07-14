/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor(arithmetic){
    var arithmeticArray = arithmetic.split('')
    this.finalArray = []
    for (let element of arithmeticArray){
      if(element != ' '){
        this.finalArray.push(element)    
      }
    }
    this.arithmeticString = this.finalArray.join('')
    this.result = 0;
  }
  printArray(){
    console.log(this.finalArray)
  }
  add(a,b){
    return a+b
  }
  subtract(a,b){
    return a-b
  }
  multiply(a,b){
    return a*b
  }
  divide(a,b){
    return a/b
  }
  clear(){
    this.result = 0
  }
  getResult(){
    console.log(this.result)
  }
  calculateWithoutBodmas(){
    var num1 = Number(this.finalArray[0]); 
    for (let i = 1; i <= this.finalArray.length; i+=2){
      //console.log('number 1 is: ' + num1 + '\n')
      var operation = this.finalArray[i];
      //console.log('operation is : ' + operation + '\n')
      var num2 = Number(this.finalArray[i+1])
      //console.log('number 2 is: ' + num2 + '\n' )
      switch(operation){
        case '+' : 
        this.result = this.add(num1,num2);
        break;
        case '-' : 
        this.result = this.subtract(num1,num2);
        break;
        case '*' : 
        this.result = this.multiply(num1,num2);
        break;
        case '/' : 
        this.result = this.divide(num1,num2);
        break;
      }
      num1 = this.result
    }
  }
  parse() {
    this.result = Function(`return (${this.arithmeticString})`)()
    //the ${} syntax within the string passed to the Function constructor is used to dynamically insert the value of this.arithmeticString into the string, creating a valid JavaScript expression to be evaluated when the function is invoked. `` are similar to using fstrinigs in python they allow us to include variables in string and the format to write a variable in sttring is ${}
  }
  calculate(){

  }
}

var calculation1 = new Calculator("1+2  -3  *(5 +9)")
calculation1.parse()
calculation1.getResult()
module.exports = Calculator;