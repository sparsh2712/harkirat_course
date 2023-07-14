/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond() {
  return new Promise ((resolve) => setTimeout(resolve,1000))
}

function waitTwoSecond() {
  return new Promise ((resolve) => setTimeout(resolve,2000))
}

function waitThreeSecond() {
  return new Promise ((resolve) => setTimeout(resolve,3000))
}

const tasks = [waitOneSecond(),waitTwoSecond(),waitThreeSecond()]

/*Promise.all(tasks).then((results)=>{
  console.log("All tasks complete")
  console.log (results)
})*/
const startTime = Date.now();

Promise.all(tasks)
  .then(() => {
    // Calculate the total duration
    const totalTime = Date.now() - startTime;

    console.log('All tasks completed');
    console.log('Total duration:', totalTime + 'ms');
  })

