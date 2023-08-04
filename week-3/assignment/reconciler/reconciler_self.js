function createDomElements(data){
  var parentElement = document.getElementById("mainArea")

  var currentChildren = Array.from(parentElement.children)

  data.forEach(item => {
    var existingChild = currentChildren.find(child=>{
      return child.id == item.id
    })
    if(existingChild){
      existingChild.children[0]=item.title
      existingChild.children[1]=item.description

      currentChildren = currentChildren.filter(child=>{
        return child != existingChild
      })

    } else{
      var childElement = document.createElement("div")
      childElement.setAttribute("id",item.id)

      var grandChildElement1 = document.createElement("span")
      grandChildElement1.innerHTML=item.title

      var grandChildElement2 = document.createElement("span")
      grandChildElement2.innerHTML=item.description

      var grandChildElement3 = document.createElement("button")
      grandChildElement3.innerHTML="delete"
      grandChildElement3.setAttribute("onclick",`deleteTodo ${item.id} `)

      childElement.appendChild(grandChildElement1)
      childElement.appendChild(grandChildElement2)
      childElement.appendChild(grandChildElement3)

      parentElement.appendChild(childElement)

    }
  });
}

window.setInterval(()=>{
  var todos=[]
  for(let i=0; i<Math.floor(Math.random()*100); i++){
    var newTodo ={
      "title" : "go to gym",
      "description"  : "work out from 6-7",
      "id" : i + 1
    }
    todos.push(newTodo)
  }
  createDomElements(todos)
},5*1000)