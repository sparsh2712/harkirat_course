const fs = require("fs")

function cleanFile(err,data){
  if(err){
    console.log("there is an error")
  }
  var semiUpdatedData= data.split(' ').filter((elements)=>{
    if(elements != ' '){
      return true
    }
  })
  var updatedData = [];
  for (element of semiUpdatedData){
    if(element != ''){
      updatedData.push(element)
    }
  }
  updatedData = updatedData.join(' ')
  fs.writeFile("b.txt",updatedData,(err)=>{
    if(err){
      console.log("error in adding data")
    }
    else{
      console.log("data updated sucessfully")
    }
  })
}
fs.readFile("b.txt","utf-8",cleanFile)