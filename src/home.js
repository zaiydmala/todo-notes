function checkWhichHomeTile(homeTile){
    if(homeTile.matches("#allTasks")){
        displayAllTasks();
    }
    else if(homeTile.matches("#today")){
        displayToday();
    }
    else if(homeTile.matches("#thisWeek")){
        displayThisWeek();
    }
    else if(homeTile.matches("#important")){
        displayImportant();
    }
}

function clearContent(){
    const ul = document.querySelector("ul");
    ul.textContent = "";
}

//display all tasks
function displayAllTasks(){
    clearContent();
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
        });
    });
    hideAddTaskBtn();
    checkNoTask();
};

//display todays tasks
function displayToday(){
    clearContent();
    let today = Date.parse(format(new Date(), "yyyy-MM-dd"));           //parse for comparison and format so it has the same format before parsing it
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            let date = Date.parse(task.date);
            if(isEqual(date, today)){
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else{
                return;
            }
        });
    });
    checkNoTask();
}

//display next week tasks
function displayThisWeek(){
    clearContent();
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            let date = parseISO(task.date);
            if(checkNextWeek(date)){
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else{
                return;
            }
        });
    });
    checkNoTask();
}

//check if the date is within the interval of next week
function checkNextWeek(taskDate){
    let nextWeekPlus1 = addDays(new Date(), 8);         //interval does not count the edges so plus 1
    let today = new Date();
    return isWithinInterval(taskDate,{
        start: today,
        end: nextWeekPlus1
    });
}