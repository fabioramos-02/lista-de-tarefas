$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editIndex = -1;

    function renderTasks() {
        $('#taskList').empty();
        tasks.forEach((task, index) => {
            const checked = task.completed ? 'checked' : '';
            const textDecoration = task.completed ? 'line-through' : 'none';
            $('#taskList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="taskCheckbox${index}" ${checked} data-index="${index}">
                        <label class="form-check-label" for="taskCheckbox${index}" style="text-decoration: ${textDecoration};">
                            ${task.text}
                        </label>
                    </div>
                    <div>
                        <button class="btn btn-warning btn-sm mr-2 edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Deletar</button>
                    </div>
                </li>
            `);
        });
    }

    function addTask(taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function editTask(index, newTaskText) {
        tasks[index].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    $('#taskForm').on('submit', function(event) {
        event.preventDefault();
        const taskText = $('#taskInput').val();
        if (taskText) {
            addTask(taskText);
            $('#taskInput').val('');
        }
    });

    $('#taskList').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        deleteTask(index);
    });

    $('#taskList').on('click', '.edit-btn', function() {
        editIndex = $(this).data('index');
        const task = tasks[editIndex].text;
        $('#editTaskInput').val(task);
        $('#editModal').modal('show');
    });

    $('#taskList').on('change', '.form-check-input', function() {
        const index = $(this).data('index');
        toggleTaskCompletion(index);
    });

    $('#saveEditBtn').on('click', function() {
        const newTaskText = $('#editTaskInput').val();
        if (newTaskText) {
            editTask(editIndex, newTaskText);
            $('#editModal').modal('hide');
        }
    });

    renderTasks();
});
