const express = require('express')
const app = express()
const port = 3000

function calculateSum(counter){
  var sum = 0;
  for(let i=1; i<=counter; i++){
    sum += i
  }
  return sum
}
app.get('/handlesum', (req, res) => {
  var counter = req.query.counter
  var calculatedSum = calculateSum(counter);
  var answer = "the sum is " + calculatedSum
  res.send(answer)
})
app.get('/createUser', (req,res) => {
  res.send("Hello World !!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // this ensures that the http server is on and ready to accept requests 

