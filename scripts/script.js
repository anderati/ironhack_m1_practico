// scripts/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const newTaskTitleInput = document.getElementById('newTaskTitle');
    const newTaskDescriptionInput = document.getElementById('newTaskDescription');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    let tasks = []; 
    function renderTasks() {
        pendingTasksList.innerHTML = ''; 
        completedTasksList.innerHTML = ''; 

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.setAttribute('data-id', task.id);
            
            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';
            
            const taskTitle = document.createElement('h4');
            taskTitle.textContent = task.title;
            taskContent.appendChild(taskTitle);

            if (task.description) {
                const taskDescription = document.createElement('p');
                taskDescription.textContent = task.description;
                taskContent.appendChild(taskDescription);
            }
            
            taskItem.appendChild(taskContent);

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Deshacer' : 'Completar';
            completeButton.className = task.completed ? 'undo-button' : 'complete-button';
            completeButton.addEventListener('click', () => toggleComplete(task.id));
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            taskActions.appendChild(completeButton);
            taskActions.appendChild(deleteButton);
            taskItem.appendChild(taskActions);

            if (task.completed) {
                taskItem.classList.add('completed');
                completedTasksList.appendChild(taskItem);
            } else {
                pendingTasksList.appendChild(taskItem);
            }
        });

    }


    function addTask(event) {
        event.preventDefault(); 

        const title = newTaskTitleInput.value.trim();
        const description = newTaskDescriptionInput.value.trim();

        if (title === '') {
            alert('El título de la tarea es obligatorio.');
            return;
        }

        const newTask = {
            id: Date.now(), 
            title: title,
            description: description,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();

        taskForm.reset(); 
        newTaskTitleInput.focus();
    }


    function toggleComplete(taskId) {
        tasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
    }


    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }


    taskForm.addEventListener('submit', addTask);


    renderTasks();
});