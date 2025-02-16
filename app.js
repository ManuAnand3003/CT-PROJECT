// Add a new to-do
const addTodo = () => {
    const input = document.getElementById("todo-input");
    const task = input.value.trim();
    if (task) {
        db.collection("todos").add({
            task: task,
            completed: false,
            createdAt: new Date()
        });
        input.value = ""; // Clear the input
    }
};

// Fetch and display to-dos in real-time
const fetchTodos = () => {
    const todosContainer = document.getElementById("todos-container");

    db.collection("todos").orderBy("createdAt").onSnapshot((snapshot) => {
        todosContainer.innerHTML = ""; // Clear the container
        snapshot.forEach((doc) => {
            const todo = doc.data();
            const todoElement = document.createElement("div");
            todoElement.className = "todo-item";
            todoElement.innerHTML = `
                <p>${todo.task} - ${todo.completed ? "Completed" : "Pending"}</p>
                <button onclick="markTodoAsCompleted('${doc.id}')">Mark as Completed</button>
                <button onclick="deleteTodo('${doc.id}')">Delete</button>
            `;
            todosContainer.appendChild(todoElement);
        });
    });
};

// Mark a to-do as completed
const markTodoAsCompleted = (todoId) => {
    db.collection("todos").doc(todoId).update({
        completed: true
    });
};

// Delete a to-do
const deleteTodo = (todoId) => {
    db.collection("todos").doc(todoId).delete();
};

// Fetch todos on page load
fetchTodos();