function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  const handleToggleComplete = (todo) => {
    onUpdateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo)}
          />
          <span>{todo.title}</span>
          <button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;