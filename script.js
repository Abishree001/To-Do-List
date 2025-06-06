const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const progressCount = document.getElementById("progress-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateUI() {
  taskList.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
    if (task.completed) completed++;
  });

  progressCount.textContent = `${completed}/${tasks.length}`;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  updateUI();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateUI();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

updateUI();
