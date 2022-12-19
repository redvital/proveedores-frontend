import { ITodo } from "@/interfaces/todo.interface";

export const TodoItem = ({ todo }: { todo: ITodo }) => {

    const handleClick = () => {
        console.log(todo.id)
    }

	return (
		<div>
			<li key={todo.id} onDoubleClick={handleClick}>
				{todo.id} - {todo.desc}
			</li>
		</div>
	);
};
