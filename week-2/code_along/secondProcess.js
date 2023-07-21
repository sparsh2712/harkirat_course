var sendObj = {
  method : "GET",

};

function callbackFn(result){
  result.json().then((jsonBody)=>{
    console.log(jsonBody)
  })
}

fetch("http://localhost:3000/queryHandleSum?counter=100", sendObj).then(callbackFn) 