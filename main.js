// define main variables
let inputField = document.querySelector('.task-header input');
let addBtn = document.querySelector('.task-header .plus');
let tasksContainer = document.querySelector('.task-content');
let tasksCount = document.querySelector('.task-count span');
let tasksCompletedCount = document.querySelector('.completed-tasks span');
let localStrg = window.localStorage;

// console.log(tasksCompletedCount.innerHTML);

// field input focus effect on window load
window.onload = () => {
    inputField.focus();
    tasksRetrieve();
    deleteAll();
}

// add tasks
addBtn.onclick = () => {
    if (inputField.value === '') {
        // console.log('empty value');
        popMsgBox();
    } else {
        // console.log(inputField.value);
        const dup = checkDuplicate();
        if (!dup) {
            let randomId = Math.random();
            console.log(randomId);
            let taskBox = document.createElement('span');
            taskBox.setAttribute('data-id', randomId);
            window.localStorage.setItem(taskBox.dataset.id, inputField.value);
            taskBox.className = 'task-box';
            taskBox.innerHTML = `${inputField.value}<span class="delete">Delete</span>`
            tasksContainer.appendChild(taskBox);

            calcTasks();
            deleteAll();
            checkAll();
            // checkNone();

        }
    }
    let noTaskMsg = document.querySelector('.task-content .task-msg');
    if (document.body.contains(noTaskMsg)) {
        noTaskMsg.remove();
    }
    inputField.value = '';
    inputField.focus();
}

// delete task / add task done
document.addEventListener('click', (e) => {
    if (e.target.className === 'delete') {
        // console.log('Delete button Found');
        e.target.parentNode.remove();
        window.localStorage.removeItem(e.target.parentNode.dataset.id);
        calcTasks();

    }
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle('finished');
        calcTasks();
    }
    if (tasksContainer.childElementCount == 0) {
        createNoTasksMsg();
    }
})

// create span of "No Tasks Message"
function createNoTasksMsg() {
    let noMsgSpan = document.createElement('span');
    let noMsgText = document.createTextNode('No Tasks Added');
    noMsgSpan.appendChild(noMsgText);
    noMsgSpan.className = 'task-msg';
    tasksContainer.appendChild(noMsgSpan);
}

function calcTasks() {
    // count tasks count
    tasksCount.innerHTML = document.querySelectorAll('.task-content .task-box').length;

    // count tasks finished
    tasksCompletedCount.innerHTML = document.querySelectorAll('.task-container .task-content .finished').length;
}
let popUpMsg = document.querySelector('.pop-up-msg span');

// popUpMsg.addEventListener('click', (e) => {
//     e.target.parentNode.remove();
// })

// function of popup message
function popMsgBox() {
    let popMsgBox = document.createElement('div');
    popMsgBox.className = 'pop-up-msg';
    let popMsgText = document.createTextNode('Add A Valid Task');
    let xBtn = document.createElement('span');
    let xBtnText = document.createTextNode('X');
    popMsgBox.appendChild(popMsgText);
    xBtn.appendChild(xBtnText);
    popMsgBox.appendChild(xBtn);
    document.body.appendChild(popMsgBox);
    xBtn.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
}

// function check if new input is already exist
function checkDuplicate() {
    if (tasksContainer.childElementCount > 0) {
        let tasks = document.querySelectorAll('.task-content .task-box');
        let tasksText = [];
        for (let i = 0; i < tasks.length; i++) {
            tasksText.push(tasks[i].firstChild.textContent);

        }
        return tasksText.includes(inputField.value);
    }
}

// function delete all
function deleteAll() {
    let delAllBtn = document.querySelector('.delete-all');
    let tasks = document.querySelectorAll('.task-content .task-box');
    delAllBtn.onclick = () => {
        for (let task of tasks) {
            window.localStorage.removeItem(task.dataset.id);
            task.remove();
        }
        calcTasks();
    }
    if (tasksContainer.childElementCount === 0) {
        createNoTasksMsg();
    }
}

function checkAll() {
    let checkAllBtn = document.querySelector('.check-all');
    let tasks = document.querySelectorAll('.task-content .task-box');
    // let finishedTasks = document.querySelectorAll('.task-container .task-content .finished');
    checkAllBtn.onclick = () => {
        for (let task of tasks) {
            task.classList.add('finished');
        }
        calcTasks();
    }
}

// define function for retrieving data
function tasksRetrieve() {
    if (window.localStorage.length > 0) {
        console.log(window.localStorage);
        for (let i = 0; i < localStrg.length; i++) {
            let taskBox = document.createElement('span');
            taskBox.setAttribute('data-id', window.localStorage.key(i));
            window.localStorage.getItem(taskBox.dataset.id);
            taskBox.className = 'task-box';
            taskBox.innerHTML = `${window.localStorage.getItem(taskBox.dataset.id)}<span class="delete">Delete</span>`
            tasksContainer.appendChild(taskBox);
        }
    }
    let noTaskMsg = document.querySelector('.task-content .task-msg');
    if (document.body.contains(noTaskMsg)) {
        noTaskMsg.remove();
    }
}





// function checkNone() {
//     let checkAllBtn = document.querySelector('.check-all');
//     let tasks = document.querySelectorAll('.task-content .task-box');
//     let finishedTasks = document.querySelectorAll('.task-container .task-content .finished');
//     checkAllBtn.onclick = () => {
//         if (tasks.length === finishedTasks.length) {
//             for (let task of tasks) {
//                 task.classList.remove('finished');
//             }

//         }
//         calcTasks();
//     }
// }
console.log(ahmed);