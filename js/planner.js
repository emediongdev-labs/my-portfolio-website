// STUDENT ACADEMIC PLANNER

// Form
const taskForm = document.getElementById("taskForm");

// Inputs
const course = document.getElementById("course");
const taskType = document.getElementById("taskType");
const taskTitle = document.getElementById("taskTitle");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

// Task Container
const tasksContainer = document.getElementById("tasksContainer");

// Dashboard
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const upcomingTasks = document.getElementById("upcomingTasks");

// Task Array
let tasks = [];

console.log("Student Academic Planner Loaded Successfully!");


// ADD TASK

taskForm.addEventListener("submit", function(event) {
  
  event.preventDefault();
  
  const task = {
    
    course: course.value,
    
    type: taskType.value,
    
    title: taskTitle.value,
    
    priority: priority.value,
    
    dueDate: dueDate.value,
    
    completed: false
    
  };
  
  // SUBMIT FXN
  tasks.push(task);
  
  saveTasks();
  
  displayTasks();
  
  updateDashboard();
  
  console.log(tasks);
  
  taskForm.reset();
  
});


// FORMAT DATE

function formatDate(date) {
  
  const options = {
    
    day: "numeric",
    
    month: "long",
    
    year: "numeric"
    
  };
  
  return new Date(date).toLocaleDateString("en-GB", options);
  
}


// DISPLAY TASKS

function displayTasks() {
  
  tasksContainer.innerHTML = "";
  
  
  if (tasks.length === 0) {
    
    tasksContainer.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">📝</div>

            <h3>No tasks yet</h3>

            <p>
                Start by adding your first academic task.
            </p>

        </div>

    `;
    
    return;
    
}
  
  tasks.forEach(function(task, index) {
    
    tasksContainer.innerHTML += `

        <article class="task-card ${task.completed ? "completed" : ""}">

            <div class="task-header">

                <span class="course-badge">

                    ${task.course}

                </span>

                <span class="priority ${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

            </div>

            <h3>${task.title}</h3>

            <p class="task-type">

                ${task.type}

            </p>
            
            <p class="task-date">

                📅 Due: ${formatDate(task.dueDate)}

            </p>


            <p class="task-status ${task.completed ? "completed" : "pending"}">

                ${task.completed ? "🟢 Completed" : "🟡 Pending"}

            </p>
            

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${index})">

                   ${task.completed ? "↩ Reopen Task" : "✅ Complete Task"}

                </button>
                
                <button
                    class="delete-btn"
                    
                    onclick="deleteTask(${index})">

                    🗑 Delete

                </button>
            </div>

        </article>

        `;
    
  });
  
}


// DELETE TASK

function deleteTask(index) {
    
    tasks.splice(index, 1);
    
    saveTasks();
    
    displayTasks();
    
    updateDashboard();
    
}


// TOGGLE TASK STATUS

function toggleTask(index) {
    
    tasks[index].completed = !tasks[index].completed;
    
    saveTasks();
    
    displayTasks();
    
    updateDashboard();
    
}


// UPDATE DASHBOARD

function updateDashboard() {
  
  totalTasks.textContent = tasks.length;
  
  const completed = tasks.filter(task => task.completed).length;
  
  const pending = tasks.length - completed;
  
  completedTasks.textContent = completed;
  
  pendingTasks.textContent = pending;
  
  upcomingTasks.textContent = pending;
  
}


// SAVE TASKS

function saveTasks() {
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

// LOAD TASKS

function loadTasks() {
    
    const storedTasks = localStorage.getItem("tasks");
    
    if (storedTasks) {
        
        tasks = JSON.parse(storedTasks);
        
    }
    
}


loadTasks();

displayTasks();

updateDashboard();