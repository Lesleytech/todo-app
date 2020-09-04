//Set an event Listener to load todos from the local storage
document.addEventListener('DOMContentLoaded', () => {
  getTodos();
});

// Constructor for creating new todo elements
class Todo {
  constructor(task) {
    this.task = task;
    this.completed = false;
  }
}

//Show todo items in the DOM
function showTodos(todoList, isAdding) {
  const todoListContainer = document.querySelector('#todo-list');
  if (todoList.length > 0) {
    todoListContainer.innerHTML = todoList
      .map((todo, index) => {
        return `<li id="${index}" class="todo-item ${
          todo.completed && `completed-task`
        }">
                        <span class="todo-task">${todo.task}</span>
                        <button class="done-btn" onclick="changeStatus(${index})">
                            ${
                              todo.completed
                                ? `<i class="fa fa-check-square-o" aria-hidden="true"></i>`
                                : `<i class="fa fa-square-o" aria-hidden="true"></i>`
                            }      
                        </button>
                        <button class="del-btn" onclick="deleteTodo(${index})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </li>`;
      })
      .join('');
  } else {
    todoListContainer.innerHTML = `<p class="no-todo">You don't have any todos yet</p>`;
  }
  isAdding &&
    document
      .getElementById(`${todoList.length - 1}`)
      .classList.add('added-transition');
}

//Add new todo elements
function addTodo(e) {
  e.preventDefault();
  const todo = document.getElementById('todo-input').value;
  const newTodo = new Todo(todo);
  saveLocalTodos(newTodo);
  getTodos(true);
  document.getElementById('todo-input').value = '';
}

//Delete todo elements
function deleteTodo(todoId) {
  const element = document.getElementById(todoId);
  const todos = JSON.parse(localStorage.getItem('todos'));
  element.classList.add('del-transition');
  setTimeout(() => {
    todos.splice(todoId, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos(todos);
  }, 300);
}

//Change the completed status of a todo element
function changeStatus(todoId) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const completedStatus =
    todos[todos.findIndex((todo, index) => index == todoId)].completed;
  todos[
    todos.findIndex((todo, index) => index == todoId)
  ].completed = !completedStatus;
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos(todos);
}

//Save todo to local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//get todos from the local storage
function getTodos(isAdding) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  showTodos(todos, isAdding);
}
