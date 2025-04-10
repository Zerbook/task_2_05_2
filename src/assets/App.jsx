import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState(''); // Для поиска
	const [isSorted, setIsSorted] = useState(false); // Флаг сортировки

	// Функция для получения списка задач
	const fetchTodos = async () => {
		try {
			const response = await fetch('http://localhost:3001/todos');
			if (!response.ok) throw new Error('Ошибка при загрузке задач');
			const data = await response.json();
			setTodos(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Функция для добавления задачи
	const addTodo = async (title) => {
		try {
			const response = await fetch('http://localhost:3001/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, completed: false }),
			});
			if (!response.ok) throw new Error('Ошибка при добавлении задачи');
			const newTodo = await response.json();
			setTodos([...todos, newTodo]);
		} catch (err) {
			setError(err.message);
		}
	};

	// Функция для обновления задачи
	const updateTodo = async (id, updatedTodo) => {
		try {
			const response = await fetch(`http://localhost:3001/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTodo),
			});
			if (!response.ok) throw new Error('Ошибка при обновлении задачи');
			setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
		} catch (err) {
			setError(err.message);
		}
	};

	// Функция для удаления задачи
	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`http://localhost:3001/todos/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Ошибка при удалении задачи');
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (err) {
			setError(err.message);
		}
	};

	// Загрузка задач при монтировании
	useEffect(() => {
		fetchTodos();
	}, []);

	// Фильтрация и сортировка задач
	let filteredAndSortedTodos = [...todos];

	// Поиск
	if (searchTerm) {
		filteredAndSortedTodos = filteredAndSortedTodos.filter((todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}

	// Сортировка по алфавиту, если включена
	if (isSorted) {
		filteredAndSortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}

	if (loading) return <div className="loading">Загрузка...</div>;
	if (error) return <div className="error">Ошибка: {error}</div>;

	return (
		<div className="App">
			<h1>Список дел</h1>
			<div className="controls">
				<input
					type="text"
					placeholder="Поиск задач..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
				/>
				<button onClick={() => setIsSorted(!isSorted)} className="sort-button">
					{isSorted ? 'Отключить сортировку' : 'Сортировать по алфавиту'}
				</button>
			</div>
			<TodoForm onAddTodo={addTodo} />
			<TodoList
				todos={filteredAndSortedTodos}
				onUpdateTodo={updateTodo}
				onDeleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default App;
