const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const filterAll = document.getElementById('filter-all');
const filterComplete = document.getElementById('filter-complete');
const filterIncomplete = document.getElementById('filter-incomplete');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    
    if (filter === 'complete') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'incomplete') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.toggle('complete', todo.completed);
        
        const span = document.createElement('span');
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(todo.id);

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
}

// Add Todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
}

// Toggle Todo completion
function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Delete Todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
addTodoBtn.addEventListener('click', addTodo);

filterAll.addEventListener('click', () => renderTodos('all'));
filterComplete.addEventListener('click', () => renderTodos('complete'));
filterIncomplete.addEventListener('click', () => renderTodos('incomplete'));

// Initial Render
renderTodos();
