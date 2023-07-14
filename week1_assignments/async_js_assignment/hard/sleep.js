/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
  return new Promise((resolve) => setTimeout(resolve,seconds*1000))
}

async function delayed() {
  console.log("start delay")
  await sleep(5).then(() => console.log("hello world"))
  console.log("end delay ")
}
console.log("before delay")
delayed()
var sum = 0 
for(let i=0 ; i<3000000000 ; i++){
  sum += 1
}
console.log(sum)
