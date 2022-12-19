import { ITodoState } from "@/interfaces/todo.interface";
import { createContext } from "react";

export type TodoContextProps = {
	todoState: ITodoState;
    toggleTodo: (id: string) => void;
};

export const TodoContext = createContext<TodoContextProps>(
	{} as TodoContextProps
);
