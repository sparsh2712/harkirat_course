const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var numOfReq = 0;

app.use(bodyParser.json())//this is a middle wear which helps us handle json data sent from the body

function middleware1(req, res, next){
  numOfReq +=1
  console.log(numOfReq)
  next();
  // if next() not being called u can also do res.send() from the middleware
}//middlewares have three arguments req,res of the handler and also a special parameter called next 

//if you have done res.send() from middle wear then you cannot send a response from the handler because only one response can be sent to a request

app.use(middleware1) //used to use middleware

function calculateSum(counter){
  var sum = 0;
  for(let i=1; i<=counter; i++){
    sum += i
  }
  return sum
}

function calculateFactorial(counter){
  var factorial = 1
  for(let i=1; i<=counter; i++){
    factorial *= i
  }
  return factorial
}

app.get('/queryHandleSum', (req, res) => {
  var counter = req.query.counter
  var calculatedSum = calculateSum(counter);
  var answer = {
    sum : calculatedSum
  }
  res.send(answer)
}) //app.get is used to process a get request and '/' gives the route followed by a callback functio to be called whenever someone uses this route req.query is used when we want to input data as query params from the url bar 

app.get('/headersHandleSum', (req, res) => {
  var counter = req.headers.counter
  console.log(req.headers)
  var calculatedSum = calculateSum(counter);
  var answer = "the sum is " + calculatedSum
  res.send(answer)
})//req.headers is used when we want to pass data as part of headers 

app.get('/bodyHandleSum', (req, res) => {
  console.log(req.body)
  var counter = req.body.counter
  if (counter <= 1000000){
    var calculatedSum = calculateSum(counter);
    var answer = "the sum is " + calculatedSum
    res.send(answer)
  }
  else{
    res.status(411).send("you have sent a very big number")
  }
}) 

app.get('/returnJSON', (req, res)=>{
  console.log(req.body)
  var counter = req.body.counter
  var sum = calculateSum(counter)
  var factorial = calculateFactorial(counter)
  var answerObject = {
    summation : sum,
    factorial : factorial,
  }

  res.send(answerObject)
})

app.get('/returnHtmlUsingSend',(req,res)=>{
  res.send(`
    <head>
    <title>hello from page</title>
    </head>
    <body>
      <b>hi there</b>
    </body>`)
})


app.get('/returnHtmlUsingFile',(req,res)=>{
  res.sendFile("/Users/sparsh/Desktop/WEB_D/harkirat_course/week-2/code_along/index.html")
  // or we can also use res.sendFile(__dirname + "index.html")
})

app.post('/handleSum',(req,res)=>{
  var counter = req.body.counter
  var sum = calculateSum(counter)
  var factorial = calculateFactorial(counter)
  var answerObject = {
    summation : sum,
    factorial : factorial,
  }

  res.send(answerObject)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // this ensures that the http server is on and ready to accept requests 

