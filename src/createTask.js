import {projectList, createSpanIcon, saveToLocalStorage} from "./creatingProject"

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    const todoList = document.querySelector(".list-todo");
    todoList.addEventListener("click", checkListEvent);
}

const CreateTask = (dataProject,id, title, details, completed, important, date) =>{
    return{
        dataProject,
        id,
        title,
        details,
        completed: completed,
        important: important,
        date:date
    }
}

function checkListEvent(e){
    let isStarIcon = e.target.matches(".star-outline");
    let isCircleIcon = e.target.matches(".unchecked");

    let isEditSubmitBtn = e.target.matches(".editTaskSubmitBtn");
    let isEditTaskCancel = e.target.matches(".editTaskCancelBtn");

    let isDeleteBtn = e.target.matches("#listDelete");
    let isEditBtn = e.target.matches("#listEdit");

    if(isStarIcon){
        styleImportantTask(e);
        updateImportantTask(e);
    }
    else if(isCircleIcon){
        styleCompletedTask(e);
        updateCompletedTask(e);
    }
    else if(isDeleteBtn){
        deleteTask(e);
    }
    else if(isEditBtn){
        showEditForm(e);
    }
    else if(isEditSubmitBtn){
        processEditTask(e);
    }
    else if(isEditTaskCancel){
        revertEditFormLocation();
        showHiddenTask();
    }
    else{
        return;
    }
}

// pop up the add task form
const showListForm = () => {
    const ListForm = document.querySelector("#listForm");
    ListForm.classList.remove("hidden");
    document.getElementById("listInput").focus();
}

//hide add-task-form
const hideListForm = () => {
    const listForm = document.querySelector("#listForm");
    const listInput = document.querySelector('#listInput');
    const listInputDetail = document.querySelector("#listInputDetail");
    const dateInput = document.querySelector("#listInputDate");

    listInput.value = "";
    listInputDetail.value ="";
    dateInput.value ="";
    listForm.classList.add("hidden");
}

//get id from local storage or get a default one
let defaultId = 0;
let id = Number(localStorage.getItem("currentId")) || defaultId;

//processing data from add task
function processListInput(e){
    let title = document.getElementById("listInput").value;
    let details = document.getElementById("listInputDetail").value;
    let dateInput = document.getElementById("listInputDate").value;

    let dataProject = findCurrentDataProject();
    let date = processDateData(dateInput);
    let listId = id;

    const newTask = CreateTask(dataProject, listId, title, details, false, false, date);
    projectList[dataProject].taskList.push(newTask);
    id++;
    saveToLocalStorage();

    addTask(listId, title, details, date);
    hideListForm();
    e.preventDefault();
}

//process date input function
function processDateData(date){
    let formattedDate;
    if(!date){
        formattedDate = "No Due Date";
    }
    else{
        formattedDate = date;
    }
    return formattedDate;
}

//display all the task in a project
function displayTask(dataProject){
    const ul = document.querySelector("ul");
    ul.textContent="";
    projectList[dataProject].taskList.forEach((task) =>{
        addTask(task.id, task.title, task.details, task.date, task.completed, task.important);
    });
}
