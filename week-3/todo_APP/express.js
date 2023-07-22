const express = require('express')
const port = 3000
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())


function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}


app.get('/todos',(req,res)=>{
  fs.readFile('todolist.json','utf-8', (err,data)=>{
    if(err) throw err
    res.json(JSON.parse(data)) 
  })
})

app.post('/todos',(req,res)=>{
  var newTodo = {
    id: Math.floor(Math.random()*1000000),
    title: req.body.title,
    description: req.body.description
  }
  fs.readFile('todolist.json','utf-8',(err,data)=>{
    if(err) throw err
    var todolist = JSON.parse(data)
    todolist.push(newTodo)
    fs.writeFile('todolist.json', JSON.stringify(todolist),(err)=>{
      if (err) throw err
      res.status(201).send(newTodo)
    })
  })
})

app.delete('/todos',(req,res)=>{
  fs.readFile("todolist.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("id not valid");
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("todolist.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send("removed sucessfully");
      });
    }
  });
})


// this is one way to fix cors error that is upload an html page form the same url 
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})

//for all other routes, return 404
app.use((req,res,next)=>{
  res.status(404).send()
})


app.listen(port,()=>{
  console.log(`listening to port ${port}`)
})

//method 2 to solve cors error is to use a library called cors install it import it and do app.use(cors())