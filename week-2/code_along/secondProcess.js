var sendObj = {
  method : "GET",

};

function callbackFn(result){
  result.json().then((jsonBody)=>{
    console.log(jsonBody)
  })
}

fetch("http://localhost:3000/queryHandleSum?counter=100", sendObj).then(callbackFn) 


// fetch is a libraray used to establish communication between two node js process basically helps us communicate between two http server the first argument is the url + route followed by the object and this returns a promis 

//result.json is a also a function which helps us extract the json from the resukt and returns a promise 