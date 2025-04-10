import { useState } from 'react';

export const useRecuestAddTodos = (refreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodos = (title) => {
		setIsCreating(true);
		// console.log(title);
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Новая задача добавлена, ответ сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodos,
	};
};
