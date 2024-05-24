document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskItem(task);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskInput = document.getElementById('task-input').value;
        const priority = document.getElementById('priority').value;
        const dueDate = document.getElementById('due-date').value;
        const category = document.getElementById('category').value;

        const task = { taskInput, priority, dueDate, category, completed: false };
        tasks.push(task);

        createTaskItem(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskForm.reset();
    });

    function createTaskItem(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <span class="task-details">
                <span class="task-name">${task.taskInput}</span>
                <span class="task-category">${task.category}</span>
                <span class="task-due-date">${task.dueDate}</span>
                <span class="task-priority">${task.priority}</span>
            </span>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
        `;
        taskItem.querySelector('.complete').addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        taskItem.querySelector('.delete').addEventListener('click', () => {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            taskItem.remove();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskList.appendChild(taskItem);
    }
});
