const express = require('express')
const port = 3000
const app = express()
const fs = require('fs')
const path = require('path')

const directoryPath = '/Users/sparsh/Desktop/WEB_D/harkirat_course/Week-2-Assignments/02-nodejs/files'
app.get('/files', (req,res)=>{
  fs.readdir(directoryPath, (err,files)=>{
    if(err){
      console.log("error while reading directory")
      res.status(500).send("unable to retrive data from the directory")
    } else{
      res.json(files)
    }
  } )
  
})

app.get('/files/:filename', (req,res)=>{
  const filename = req.params.filename
  const filePath = path.join(directoryPath,filename)
  var filecontent;
  fs.readFile(filePath,'utf-8', (err,data)=>{
    if(err){
      console.log("error")
      res.status(404).send("file not found")
    } else{
      res.send(data)
    }
  })
})

app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port,()=>{
  console.log(`example app listening on port${port}`)
})