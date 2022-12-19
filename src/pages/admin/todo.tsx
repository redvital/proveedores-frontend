import { TodoContext } from "@/app/context/TodoContext";
import { TodoItem } from "@/components/TodoItem"
import { ITodo } from "@/interfaces/todo.interface";
import React, { useContext } from "react";


const todo = () => {
	const { todoState, toggleTodo } = useContext(TodoContext);

	console.log(todoState);

	toggleTodo("2")

	return (
		<div>
			{todoState.todos.map((t) => (
				<TodoItem todo={t} key={t.id}></TodoItem>
			))}
		</div>
	);
};

export default todo;
