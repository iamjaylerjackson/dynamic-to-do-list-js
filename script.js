// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {

        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Remove the task when button is clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to the li
        li.appendChild(removeBtn);

        // Add the li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Event listener for clicking the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded (as instructed)
    addTask();
});
