const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

var number = 1
var todolist = []

app.use(bodyParser.json())

app.get('/todos',(req,res)=>{
  console.log("printing the todolist")
  res.status(200).send(todolist)
})

app.get('/todos/:id',(req,res)=>{
  requestedID = req.query.id
  for (let todos of todolist){
    if(todos.id == requestedID){
      res.status(200).send(todos)
      console.log("sending the desired todo")
      break;
    }
    else{
      res.status(404).send("id not found")
    }
  }
})

app.put('/todos/:id',(req,res)=>{
  changeID = req.query.id
  const {name, status} = req.body
  for (let todos of todolist){
    if (todos.id == changeID){
      todos.name = name || todos.name
      todos.status = status || todos.status
      res.status(200).send("item succesfully updates")
      console.log("item updated")
      break
    }
    else{
      res.status(404).send("item not found")
    }
  }
})

app.post('/todos',(req,res)=>{
  let newTodo = req.body
  newTodo['id'] = number++
  todolist.push(newTodo)
  console.log("new element added to the list")
  res.status(201).send("Created with the ID of the created todo item in JSON format")
})

app.delete('/todos/:id', (req,res)=>{
  let idToDelete = req.query.id
  var checker = 0
    for (let i=0 ; i<todolist.length; i++){
      if(todolist[i].id == idToDelete){
        todolist.splice(i, 1)
        res.status(200).send("deleted succesfully")
        checker = 1
        console.log("item deletd")
      }
    }
    if(checker == 0){
      res.status(404).send("item not found")
    }
  }
)

app.listen(port,()=>{
  console.log(`example app listening on port${port}`)
})