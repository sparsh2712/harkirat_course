//testing split 
var sent1 = "hey there how are you"
console.log(sent1.split('')); //splitting letters and adding it to an array 
console.log(sent1.split(' '));//splitting words 

//testing sort 
var array1 = ['abx', 'zh', 'flk', 'kcf', 'cad', 'dmp', 'abc'] 
console.log(array1.sort()) // arranging in alphabetical order 
console.log(array1.sort().reverse()) //arranging in alphabetical order and then reversing it
var array2 = [24,53,1,2,56,8]
console.log(array2.sort()) // it will be sorted alphabetically i.e 8 will come at last 
console.log(array2.sort((a,b) => a-b )) // arranges it in increasing order 
console.log(array2.sort((a,b) => b-a )) // arranges it in decreasing order 

//testing join 
console.log(array1.join()) // joins all the elements of the array with commas in between
console.log(array1.join('')) // joins all the elements of the array to form a word
console.log(array1.join('1')) // joins all the elements of the array with anything we want in between all the elements 

// template literals: these are similar to f strings used in pyhton 
//STRING INTERPOLATION
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello, Alice!
//MULTILINE STRING 
const multilineString = `
  This is
  a multiline
  string.
`;
console.log(multilineString);
/*
Output:
  This is
  a multiline
  string.
*/

// EXPRESSION EVALUATION 
const a = 5;
const b = 10;
const sum = `The sum of ${a} and ${b} is ${a + b}.`;
console.log(sum); // Output: The sum of 5 and 10 is 15.

// Using keyword eval : it is used to evaluate a string of java script code 
console.log(eval("1+2+3+4+5+6"))

// removing and adding elements to array
array3 = [1,2,3,4,5,6,7,8,9]
//ADDING 
array3.push(10)
console.log(array3)
var startIndex = 0;
var deleteCount = 1;
array3.splice(startIndex,deleteCount)
console.log(array3)

//writting to a file and changing all its contents 
const fs = require("fs")

//METHOD - 1
fs.writeFileSync("a.txt","adding text to file",(err)=>{
  if(err){
    console.log(err)
  }
  console.log("added to file ")
})

//METHOD - 2
fs.writeFile("a.txt", "Hey There!", (err)=>{
  if(err){
    console.log(err)
  }
  console.log("The file was saved")
})

// appending data to a file 
//METHOD - 1
const content = "appending info at the end !!"
fs.appendFile("a.txt",content,(err)=>{
  if(err){
    console.log(err)
  }
  console.log("sucessfully appended")
})

//Replacing data in a string 
var string = "hi hello    how are    you"
var update4 = string.replace(/\s+/g, ' ')//this will replace places with extras spaces with a single space
var update1 = string.replace(/\s/g,'1') //this code will replace all content with spaces like tabs, \n etc all along the string with 1
var update2 = update1.replace(/1/g, '2') // we can put any character in between // and we add g to replace it at all the places in the text in order to only change the first occurence we could remove g
var update3 = update2.replace(/h/,'4') // this code will only update the first occurence of h

console.log(update4)

//DIFFERENCE BETWEEN INVOKING AND REFERENCING A FUNCTION 
//In JavaScript, when you use parentheses () after a function name, it invokes the function. However, if you omit the parentheses, you are referencing the function itself rather than invoking it.
//By referencing a function, you can store it for later use, pass it to other functions as callbacks, or use it as a value in various programming constructs.