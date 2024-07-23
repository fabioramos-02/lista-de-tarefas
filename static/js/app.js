$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editIndex = -1;

    function renderTasks() {
        $('#taskList').empty();
        tasks.forEach((task, index) => {
            $('#taskList').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${task}
                    <div>
                        <button class="btn btn-warning btn-sm mr-2 edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Deletar</button>
                    </div>
                </li>
            `);
        });
    }

    function addTask(task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function editTask(index, newTask) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    $('#taskForm').on('submit', function(event) {
        event.preventDefault();
        const task = $('#taskInput').val();
        if (task) {
            addTask(task);
            $('#taskInput').val('');
        }
    });

    $('#taskList').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        deleteTask(index);
    });

    $('#taskList').on('click', '.edit-btn', function() {
        editIndex = $(this).data('index');
        const task = tasks[editIndex];
        $('#editTaskInput').val(task);
        $('#editModal').modal('show');
    });

    $('#saveEditBtn').on('click', function() {
        const newTask = $('#editTaskInput').val();
        if (newTask) {
            editTask(editIndex, newTask);
            $('#editModal').modal('hide');
        }
    });

    renderTasks();
});
