function delay (miliseconds){
  return new Promise((resolve) => {
    setTimeout(resolve,miliseconds)
  })
}

delay(5000).then(()=>{
  console.log("Hello World")
})