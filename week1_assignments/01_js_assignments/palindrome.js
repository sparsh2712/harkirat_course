/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  var len = str.length
  var checker = true
  var array_of_char = str.split('')
  for (let i = 0; i<Math.trunc(len/2); i++){
    if (array_of_char[i] != array_of_char[len-1-i]){
      checker = false
    }
  }
  if (checker){
    return "true"
  }
  else{
    return "false"
  }
}
console.log(isPalindrome("abacdaba"))
module.exports = isPalindrome;