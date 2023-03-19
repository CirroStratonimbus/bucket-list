import { createStore } from 'redux';

// action types
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';

// initial state
const initialTodoState = {
  nextId: 2,
  data: {
    1: {
      content: 'Climb Fuji-san',
      completed: false
    },
    2: {
      content: 'Sail across the Atlantic',
      completed: false
    },
    3: {
      content: 'Masquerade in Venice',
      completed: false
    }
  }
};

// action creators
export function addTodoAction(content) {
  return {
    type: ADD_TODO,
    content
  };
}

export function deleteTodoAction(id) {
  return {
    type: DELETE_TODO,
    id
  };
}

export function editTodoAction(id, content) {
  return {
    type: EDIT_TODO,
    id,
    content
  };
}

export function completeTodoAction(id) {
  return {
    type: COMPLETE_TODO,
    id
  };
}

// reducer function
function todoReducer(state = initialTodoState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newId = state.nextId;
      const newTodo = {
        content: action.content,
        completed: false
      };
      return {
        ...state,
        nextId: newId + 1,
        data: {
          ...state.data,
          [newId]: newTodo
        }
      };
    }
    case DELETE_TODO: {
      const { [action.id]: deletedTodo, ...restOfTodos } = state.data;
      return {
        ...state,
        data: restOfTodos
      };
    }
    case EDIT_TODO: {
      const { id, content } = action;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content
          }
        }
      };
    }
    case COMPLETE_TODO: {
      const { id } = action;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            completed: true
          }
        }
      };
    }
    default:
      return state;
  }
}

// create store
const store = createStore(todoReducer);

export default store;