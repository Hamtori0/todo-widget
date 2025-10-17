const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({ text: li.textContent.replace('삭제', '').trim(), completed: li.classList.contains('completed') });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach(todo => addTodo(todo.text, todo.completed));
}

function addTodo(text, completed = false) {
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  delBtn.style.marginLeft = '10px';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
  input.value = '';
  saveTodos();
}

addBtn.addEventListener('click', () => addTodo(input.value));
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo(input.value);
});

loadTodos();
