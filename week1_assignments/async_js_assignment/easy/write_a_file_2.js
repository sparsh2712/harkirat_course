const fs = require("fs")

fs.writeFileSync("a.txt","adding text to file",(err)=>{
  if(err){
    console.log(err)
  }
  console.log("added to file ")
})