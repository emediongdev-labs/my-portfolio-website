// STUDENT ACADEMIC PLANNER

// Form
const taskForm = document.getElementById("taskForm");

// Inputs
const course = document.getElementById("course");
const taskType = document.getElementById("taskType");
const taskTitle = document.getElementById("taskTitle");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");


// Task Container
const tasksContainer = document.getElementById("tasksContainer");

// Dashboard
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const upcomingTasks = document.getElementById("upcomingTasks");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const progressPercentage = document.getElementById("progressPercentage");
const achievementBanner = document.getElementById("achievementBanner");

// Task Array
let tasks = [];

let currentFilter = "all";

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
  updateProgress();
  updateAchievement();
  
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

// CHECK IF TASK IS OVERDUE

function getTaskStatus(task) {
    
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(task.dueDate);
    
    dueDate.setHours(0, 0, 0, 0);
    
    if (task.completed) {
        
        return {
            text: "🟢 Completed",
            className: "completed"
        };
        
    }
    
    if (dueDate < today) {
        
        return {
            text: "🔴 Overdue",
            className: "overdue"
        };
        
    }
    
    if (dueDate.getTime() === today.getTime()) {
        
        return {
            text: "🟠 Due Today",
            className: "today"
        };
        
    }
    
    return {
        
        text: "🟡 Pending",
        
        className: "pending"
        
    };
    
}


// GET COURSE CODE

function getCourseCode(course) {
    
    return course.split(" - ")[0];
    
}

// GET COURSE TITLE

function getCourseTitle(course) {
    
    return course.split(" - ")[1];
    
}

// GET COURSE ICON

function getCourseIcon(course) {
    
    const code = getCourseCode(course);
    
    if (code.startsWith("MIVA-CSC")) return "💻";
    
    if (code.startsWith("MIVA-COS")) return "⚙️";
    
    if (code.startsWith("COS")) return "⚙️";
    
    if (code.startsWith("GST")) return "📘";
    
    if (code.startsWith("PHY")) return "⚛️";
    
    if (code.startsWith("MTH")) return "📐";
    
    return "📚";
    
}

// GET TASK TYPE BADGE

function getTaskTypeBadge(taskType) {
    
    switch (taskType) {
        
        case "Assignment":
            return '<span class="task-type assignment">Assignment</span>';
            
        case "Lab Assessment":
            return '<span class="task-type lab">Lab Assessment</span>';
            
        case "Project":
            return '<span class="task-type project">Project</span>';
            
        case "Quiz":
            return '<span class="task-type quiz">Quiz</span>';
            
        case "Practical":
            return '<span class="task-type practical">Practical</span>';
            
        case "Mid-Semester Assessment (MSA)":
            return '<span class="task-type msa">MSA</span>';
            
        case "End-Semester Assessment (ESA)":
            return '<span class="task-type esa">ESA</span>';
            
        case "Personal Study":
            return '<span class="task-type study">Personal Study</span>';
            
        default:
            return '<span class="task-type">Other</span>';
            
    }
    
}

// ==========================
// DISPLAY TASKS
// ==========================

function displayTasks() {
    
    tasksContainer.innerHTML = "";
    
    // Get search text
    const searchText = searchInput.value.toLowerCase();
    
    // Empty state
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
        
        // Search filter
const matchesSearch =
    
    task.course.toLowerCase().includes(searchText) ||
    
    task.title.toLowerCase().includes(searchText) ||
    
    task.type.toLowerCase().includes(searchText);

const matchesFilter =
    
    currentFilter === "all" ||
    
    (currentFilter === "pending" && !task.completed) ||
    
    (currentFilter === "completed" && task.completed);

if (!matchesSearch || !matchesFilter) {
    
    return;
    
}

    const taskStatus = getTaskStatus(task);
        
    tasksContainer.innerHTML += `

            <article class="task-card ${task.priority.toLowerCase()} ${taskStatus.className}">

                <div class="task-header">

                    <span class="course-badge">

                        ${getCourseIcon(task.course)}
                        ${getCourseCode(task.course)}

                    </span>

                </div>

                <h3>${task.title}</h3>

                <p class="course-name">

                    ${getCourseTitle(task.course)}

                </p>

                ${getTaskTypeBadge(task.type)}

                <p class="task-date">

                    📅 Due: ${formatDate(task.dueDate)}

                </p>

                <p class="task-status ${taskStatus.className}">

                    ${taskStatus.text}

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
    
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );
    
    if (!confirmDelete) {
        return;
    }
    
    tasks.splice(index, 1);
    
    saveTasks();
    
    displayTasks();
    
    updateDashboard();
    updateProgress();
    updateAchievement();
    
}


// TOGGLE TASK STATUS

function toggleTask(index) {
    
    tasks[index].completed = !tasks[index].completed;
    
    saveTasks();
    
    displayTasks();
    
    updateDashboard();
    updateProgress();
    updateAchievement();
    
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

// UPDATE PROGRESS

function updateProgress() {
    
    const total = tasks.length;
    
    const completed = tasks.filter(function(task) {
        
        return task.completed;
        
    }).length;
    
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressFill.style.width = percentage + "%";
    
    progressText.textContent = `${completed} of ${total} tasks completed`;
    
    progressPercentage.textContent = percentage + "%";
    
}

// UPDATE ACHIEVEMENT BANNER

function updateAchievement() {
    
    const total = tasks.length;
    
    const completed = tasks.filter(function(task) {
        
        return task.completed;
        
    }).length;
    
    if (total > 0 && completed === total) {
        
        achievementBanner.classList.remove("hidden");
        
    } else {
        
        achievementBanner.classList.add("hidden");
        
    }
    
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

// SEARCH TASKS

searchInput.addEventListener("input", function() {
    
    displayTasks();
    
});

// FILTER BUTTONS

filterButtons.forEach(function(button) {
    
    button.addEventListener("click", function() {
        
        currentFilter = button.dataset.filter;
        
        filterButtons.forEach(function(btn) {
            
            btn.classList.remove("active");
            
        });
        
        button.classList.add("active");
        
        displayTasks();
        
    });
    
});



loadTasks();

displayTasks();

updateDashboard();

updateProgress();

updateAchievement();

