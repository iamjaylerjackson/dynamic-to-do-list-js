// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * 
     * @param {string|null} taskText - The text for the task. If null, reads from taskInput.
     * @param {boolean} save - Whether to save this task to localStorage (default true).
     */
    function addTask(taskText = null, save = true) {
        // If no taskText passed, read from input field
        const text = taskText === null ? taskInput.value.trim() : taskText;

        // If text is empty and this is a user-triggered add, alert and stop
        if ((taskText === null) && text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create li and set its text
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button and add class using classList.add (required)
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove the task from DOM and update localStorage when clicked
        removeBtn.onclick = function () {
            // Remove the li from the DOM
            taskList.removeChild(li);

            // Update localStorage: remove first occurrence of this task text
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append button to li, then li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If save flag is true, save task to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input if this was entered by the user
        if (taskText === null) {
            taskInput.value = "";
        }
    }

    /**
     * Load tasks from localStorage and render them in the DOM.
     * Uses addTask(taskText, false) to avoid double-saving.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (taskText) {
            addTask(taskText, false); // do not save again while loading
        });
    }

    // Event listener for clicking the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask(); // reads from input, saves to localStorage
    });

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage when page loads
    loadTasks();
});
