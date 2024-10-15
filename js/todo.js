const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input")
// === const toDoInput = document.querySelector(".todo-form input")
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos"
let toDos = [];
//================================================================================

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}


function deleteTodo(event){
    // console.dir(event);
    // console.dir(event.target.parentElement);
    const li = event.target.parentElement;
    // console.log(li.id);
    // console.log(typeof li.id);
    toDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
    // this.parentElement.revmove()
    // this.parentNode.remove();
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteTodo)

    //================================================================================
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
}


//================================================================================
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos){ // if(savedToDos !== null)
    const parsedToDos = JSON.parse(savedToDos);
    toDos=parsedToDos;
    parsedToDos.forEach(element => {paintTodo(element) 
    }); //parsedToDos.forEach(paintTodo(element))
}

console.log(savedToDos);