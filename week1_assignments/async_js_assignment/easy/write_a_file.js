const fs = require("fs")

fs.writeFile("a.txt", "Hey There!", (err)=>{
  if(err){
    console.log(err)
  }
  console.log("The file was saved")
})