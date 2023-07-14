function mimic(i){
  if(i>10000000){
    return ;
  }
  setTimeout(()=>{
    console.log(i)
    mimic(i+1)
  },1*1000)
}

mimic(1)

// "mimic" whothout "()" is just a refrence to a function "mimic()" => its a function call which will evaluate to something 