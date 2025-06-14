document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getStoredTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  function addTask(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      const updatedTasks = getStoredTasks().filter((task) => task !== taskText);
      saveTasks(updatedTasks);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      const tasks = getStoredTasks();
      tasks.push(taskText);
      saveTasks(tasks);
    }
  }

  function handleAddTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
    addTask(taskText);
    taskInput.value = "";
  }

  addButton.addEventListener("click", handleAddTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

  loadTasks();
});
