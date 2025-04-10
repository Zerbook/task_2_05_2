import { useState } from 'react';
import './App.css';
import {
	useRecuestGetTodos,
	useRecuestAddTodos,
	useRecuestUpdataTodos,
	useRecuestDeleteTodos,
} from './hooks';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const [searchTerm, setSearchTerm] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const { isLoading, todos } = useRecuestGetTodos(refreshTodosFlag);

	const { isCreating, requestAddTodos } = useRecuestAddTodos(refreshTodos);
	const { isUpdating, requestUpdateTodos } = useRecuestUpdataTodos(refreshTodos);
	const { isDeleting, requestDeleteTodos } = useRecuestDeleteTodos(refreshTodos);

	let filteredAndSortedTodos = [...todos];

	if (searchTerm) {
		filteredAndSortedTodos = filteredAndSortedTodos.filter((todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}

	if (isSorted) {
		filteredAndSortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}

	return (
		<div className="app">
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<div>
					<h1>Список дел</h1>
					<div className="controls">
						<input
							type="text"
							placeholder="Поиск задач..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
						<button
							onClick={() => setIsSorted(!isSorted)}
							className="sort-button"
						>
							{isSorted
								? 'Отключить сортировку'
								: 'Сортировать по алфавиту'}
						</button>
					</div>
					<TodoForm
						onRequestAddTodos={requestAddTodos}
						isCreating={isCreating}
					/>
					<TodoList
						todos={filteredAndSortedTodos}
						onUpdateTodo={requestUpdateTodos}
						onDeleteTodo={requestDeleteTodos}
						isUpdating={isUpdating}
						isDeleting={isDeleting}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
