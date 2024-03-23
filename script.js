const inputBox = document.querySelector("input");
const listItems = document.getElementById("listItems");
const addTaskBtn = document.querySelector("button");
let notification = document.getElementById("notification");


// creating a function that adds the task on clicking the "Add task" button

const addTask = () => {
    if (inputBox.value === "") {
        alert("Please add your task!")

        // this notification shows add tasks
        notification.innerText = "Enter your task! 🤔";
        notification.style.color = "red";
    }
    else {
        if(addTaskBtn.innerText !== "Add task") {
            addTaskBtn.innerText = "Add task";

            notification.innerText = "you have updated an item! 😎"
            notification.style.color = "blue";
        }
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listItems.appendChild(li);
        let span = document.createElement("span");


        // this sets our icon tag inside the span element

        span.innerHTML = '<i class="fa-solid fa-pen" id="editBtn"></i><i class="fa-solid fa-trash" id="deleteBtn"></i>';
        li.appendChild(span);


        notification.innerText = "you have succesfully added an item! 🤗"
        notification.style.color = "green";
    }

    inputBox.value = "";
    saveData();
}

addTaskBtn.addEventListener("click", addTask);


// creating a function for deleting and updating the task

const deleteOrUpdateTask = (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")

        // this shows a task is completed
        notification.innerText = `You just completed the task "${e.target.innerText}"`
        notification.style.color = "darkgreen";

        saveData();
    }
    else if (e.target.tagName === "I" && e.target.className === "fa-solid fa-trash"){
        e.target.parentElement.parentElement.remove();

        // this set a deletion value in red color for notification
        notification.innerText = `you just deleted an item "${e.target.parentElement.parentElement.innerText}"`
        notification.style.color = "red";

        saveData();
    }
    else {

        if (e.target.tagName !== 'SPAN') {

            addTaskBtn.innerText = "Update";
            inputBox.value = e.target.parentElement.parentElement.innerText;

            //this automatically apply cursor into the input box
            inputBox.focus(); 

            // this automatically remove the list to be updated
            e.target.parentElement.parentElement.remove();


            // this shows editing is ongoing on an item
            notification.innerText = `currently editing an item "${e.target.parentElement.parentElement.innerText}"`;
            notification.style.color = "orange";
            
            saveData();
        

        }
    }
}


listItems.addEventListener("click", deleteOrUpdateTask)

// The below functions help us to save to and retrieve data from the local storage respectively
const saveData = () => {
    localStorage.setItem("data", listItems.innerHTML)
}

const retrieveTask = () => {
    listItems.innerHTML = localStorage.getItem("data")
}
 
retrieveTask();