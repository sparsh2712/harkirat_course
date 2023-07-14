var i = 0
function mimic(){
  console.log(i)
  i++
  setTimeout(mimic, 1000*1) 
}

mimic()