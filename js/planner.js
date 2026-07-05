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
  
  tasks.forEach(function(task, index) {
    
    tasksContainer.innerHTML += `

        <article class="task-card">

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

            <div class="task-actions">

                <button class="complete-btn">

                    ✓ Complete

                </button>

                <button class="delete-btn">

                    🗑 Delete

                </button>

            </div>

        </article>

        `;
    
  });
  
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