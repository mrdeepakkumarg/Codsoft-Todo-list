const todoInput = document.getElementById('todo-input');
const addItemButton = document.getElementById('add-item');
const todoList = document.getElementById('todo-list');

function addTodoItem() {
  const inputValue = todoInput.value.trim();

  if (inputValue === '') {
    alert('Please enter a valid to-do item.');
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = inputValue;

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('checked');
    updateLocalStorage();
  });

  const closeButton = document.createElement('span');
  closeButton.textContent = '';

  closeButton.addEventListener('click', () => {
    listItem.remove();
    updateLocalStorage();
  });

  listItem.appendChild(closeButton);
  todoList.appendChild(listItem);

  todoInput.value = '';

  updateLocalStorage();
}

function updateLocalStorage() {
  const todoItems = [];
  const todoItemsElements = document.querySelectorAll('#todo-list li');

  todoItemsElements.forEach((item) => {
    todoItems.push(item.textContent);
  });

  localStorage.setItem('todoList', JSON.stringify(todoItems));
}

function initializeTodoList() {
  const storedTodoList = localStorage.getItem('todoList');

  if (storedTodoList) {
    const todoItems = JSON.parse(storedTodoList);

    todoItems.forEach((itemText) => {
      const listItem = document.createElement('li');
      listItem.textContent = itemText;

      listItem.addEventListener('click', () => {
        listItem.classList.toggle('checked');
        updateLocalStorage();
      });

      const closeButton = document.createElement('span');
      closeButton.textContent = '';

      closeButton.addEventListener('click', () => {
        listItem.remove();
        updateLocalStorage();
      });

      listItem.appendChild(closeButton);
      todoList.appendChild(listItem);
    });
  }
}

addItemButton.addEventListener('click', addTodoItem);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodoItem();
  }
});

initializeTodoList();
