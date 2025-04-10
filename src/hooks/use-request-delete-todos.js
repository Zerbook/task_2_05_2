import { useState } from 'react';

export const useRecuestDeleteTodos = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodos = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена, ответ сервера:', response);
				refreshTodos();
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestDeleteTodos,
	};
};
