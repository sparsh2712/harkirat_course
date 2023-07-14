
function printTime() {
  let time = new Date().toLocaleTimeString()
  console.log(time)
}
setInterval(printTime, 1000)