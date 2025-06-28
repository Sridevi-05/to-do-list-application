let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Convert \n to <br> to preserve paragraph formatting
    li.innerHTML = task.replace(/\n/g, "<br>");

    li.onclick = () => selectTask(li, index);

    if (selectedIndex === index) {
      li.classList.add("selected");
    }

    taskList.appendChild(li);
  });
}

function selectTask(element, index) {
  const listItems = document.querySelectorAll("#taskList li");

  listItems.forEach((li, i) => {
    li.classList.remove("selected");
    if (i === index) {
      li.classList.add("selected");
    }
  });

  selectedIndex = index;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text !== "") {
    tasks.push(text);
    input.value = "";
    selectedIndex = null;
    saveTasks();
    renderTasks();
  } else {
    alert("Please enter a task.");
  }
}

function deleteSelectedTask() {
  if (selectedIndex !== null) {
    tasks.splice(selectedIndex, 1);
    selectedIndex = null;
    saveTasks();
    renderTasks();
  } else {
    alert("Please select a task to delete.");
  }
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    selectedIndex = null;
    saveTasks();
    renderTasks();
  }
}

function exitApp() {
  alert("This will attempt to close the browser tab.");
  window.close(); // Might not work in all browsers
}

renderTasks();
