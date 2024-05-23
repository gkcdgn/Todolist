const form=document.querySelector("#todoAddForm");
const inputt=document.querySelector("#todoName");
const todolist=document.querySelector(".list-group");
const fcardbody=document.querySelectorAll(".card-body")[0];
const scardbody=document.querySelectorAll(".card-body")[1];
const temizlebuton=document.querySelector("#clearButton");
const filterinput=document.querySelector("#todoSearch");

todos=[];
runEvents();


function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    scardbody.addEventListener("click",removeTodoToul);
    temizlebuton.addEventListener("click",allTodosEveryWhere);
    filterinput.addEventListener("click",filter);
    filterinput.addEventListener("keyup",filter);
}

function addTodo(e){
    const inputText=inputt.value.trim();
    if(inputText==null || inputText==""){
        
        showAlert("warning","bir değer girmelisiniz");
    }else{
        addTodoToUl(inputText);
        addTodoStorage(inputText);
        showAlert("success","todo eklendi");
    }
   e.preventDefault();
}
function addTodoToUl(newTodo){
    const li=document.createElement("li");
    li.textContent=newTodo;
    li.className="list-group-item d-flex justify-content-between";
    const a=document.createElement("a");
    const i=document.createElement("i");
    a.href="#"
    a.className="delete-item";
    i.className="fa fa-remove";
    a.appendChild(i);
    li.appendChild(a);
    todolist.appendChild(li);
    inputt.value=" ";
}

function addTodoStorage(newTodo){
    checkTodofromstorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function checkTodofromstorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message){
    const div=document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent=message;
    fcardbody.appendChild(div);
    setTimeout(function(){
        div.remove();
    },2500);
}
function pageLoaded(){
    checkTodofromstorage();
    todos.forEach(function(todo){
        addTodoToUl(todo);
    });
}
function removeTodoToul(e){
    //console.log(e.target);
    if(e.target.className=="fa fa-remove"){
        const todo=e.target.parentElement.parentElement;
        todo.remove();
        showAlert("succes","todo silindi");
        removeTodoTostorage(todo.textContent)
    
    }
   

}
function removeTodoTostorage(removeTodo){
    checkTodofromstorage();
    todos.forEach(function(todo,index){
        if(removeTodo==todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function allTodosEveryWhere(){
    const todolistesi=document.querySelectorAll(".list-group-item");
    //console.log(todolistesi)
    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            todo.remove();
        })
      todos=[];
      localStorage.setItem("todos",JSON.stringify(todos));
      showAlert("success","silindi");
    }else{
        showAlert("warning","silmek için en az bir todo olmalıdır");
    }
}

function filter(e){
    const filtervalue=e.target.value.toLowerCase().trim();
    const todolistesi=document.querySelectorAll(".list-group-item");
    if(todolistesi.length>0){
        todolistesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filtervalue)){
                todo.setAttribute("style","display:block");


            }else{
                todo.setAttribute("style","display:none !important");

            }

        });

    }else{
        showAlert("warning","filtreleme yapmak için en az bir todo olmalıdır");
    }

}
