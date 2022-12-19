import { ITodo, ITodoState } from "@/interfaces/todo.interface";
import { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./TodoReducer";

const initialState: ITodoState = {
	todoCount: 2,
	todos: [
		{
			id: "1",
			desc: "Lorem",
			completed: false,
		},
        {
			id: "2",
			desc: "Lorem holaaa",
			completed: false,
		},
	],
	completed: 0,
	pending: 1,
};

interface props {
	children: JSX.Element | JSX.Element[];
}

export const TodoProvider = ({ children }: props) => {
	const [todoState, dispatch] = useReducer(todoReducer, initialState);


    const toggleTodo = (id:string) => {
        dispatch({ type: "toggleTodo", payload: {id}})

        const task : ITodo = {
            id: "3",
            completed: false,
            desc: "Lorem holaaaaaaa"
        }

        dispatch({ type: "addTodo", payload: task})
    }

	return (
		<TodoContext.Provider
			value={{
				todoState,
                toggleTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
