var counter = 0
function printCounter() {
  console.clear()
  console.log(counter)
  counter ++
}
function mimic(){
  setTimeout(mimic, 1000 * 1)
  printCounter()
}
mimic()

// no idea why this is working with mimic and not with mimic()