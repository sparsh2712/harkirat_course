const fs = require("fs")
function cleanFile(err,data){
  if(err){
    console.log("error in reading the file")
  }
  var updatedData = data.replace(/\s+/g, ' ')
  fs.writeFile("b.txt", updatedData, (err)=>{
    if(err){
      console.log("error in updateing file")
    }
    console.log("data updated succesfully")
  }
  )
}
fs.readFile("b.txt", "utf-8", cleanFile)