/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor(){
    this.todoList = []
  }
  add(event){
    this.todoList.push(event)
  }
  remove(indexOfTodo){
    this.todoList.splice(indexOfTodo,1)
  }
  update(index, updatedTodo){
    this.todoList[index] = updatedTodo
  }
  getAll(){
    return this.todoList
  }
  get(indexOfTodo){
    return this.todoList[indexOfTodo]
  }
  clear(){
    this.todoList = []
  }


}

var todoList1 = new Todo;
todoList1.add("Wake up")
todoList1.add("Brush")
todoList1.add("freshen up")
todoList1.add("Take a shower")
console.log(todoList1.getAll())
todoList1.update(3,"breakfast")
console.log(todoList1.getAll())
console.log(todoList1.get(1))
todoList1.remove(2);
console.log(todoList1.getAll())
todoList1.clear()
console.log(todoList1.getAll())
module.exports = Todo;