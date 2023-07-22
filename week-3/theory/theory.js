const fs = require('fs')

fs.readFile('test.json', 'utf-8', (err,data)=>{
  if(err) throw err
  console.log(JSON.parse(data)) //JSON.parse(data) is used to convert the data from the file which is saved in string format to json format usefull when we want to send data via a res.json()
})