import { useState } from 'react';

export const useRecuestUpdataTodos = (refreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodos = (id, updatedTodo) => {
		setIsUpdating(true);

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(updatedTodo),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача обновлена, ответ сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsUpdating(false));
	};
	return {
		isUpdating,
		requestUpdateTodos,
	};
};
