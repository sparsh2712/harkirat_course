class Calculator {
  constructor(arithmeticString) {
    this.arithmeticString = arithmeticString;
  }

  calculate() {
    // Remove whitespaces from the arithmetic string
    const expression = this.arithmeticString.replace(/\s/g, '');

    // Evaluate the parsed expression and store the result
    this.result = eval(expression);
  }

  getResult() {
    return this.result;
  }
}

const calculation1 = new Calculator("1+2  -3  *(5 +9)");
calculation1.calculate();
const result = calculation1.getResult();
console.log(result);
