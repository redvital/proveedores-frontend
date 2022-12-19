import { ITodo, ITodoState } from "@/interfaces/todo.interface";

type TTodoAction =
	| {
			type: "addTodo";
			payload: ITodo;
	  }
	| {
			type: "toggleTodo";
			payload: {
				id: string;
			};
	  };

export const todoReducer = (state: ITodoState, action: TTodoAction) => {
	switch (action.type) {
		case "addTodo":
			return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case "toggleTodo":
            console.log(action.payload.id , "Traduce")
            return {

            }

		default:
			return state;
	}
};
