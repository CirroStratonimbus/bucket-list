import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoAction,
  deleteTodoAction,
  editTodoAction,
  completeTodoAction
} from './store/store';

// create app function
function App() {
  const todos = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  // new todo
  function handleAddTodo() {
    if (newTodo.trim() === '') return;
    dispatch(addTodoAction(newTodo.trim()));
    setNewTodo('');
  }

  // delete todo
  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodoAction(id));
    }
  }

  // edit todo
  function handleEdit(id, content) {
    const newContent = window.prompt('Enter new content:', content);
    if (newContent && newContent.trim() !== '') {
      dispatch(editTodoAction(id, newContent.trim()));
    }
  }

  // toggle todo
  function handleComplete(id) {
    dispatch(completeTodoAction(id));
  }

  // return jsx
  return (
    <div className='bucket-list-box'>
      <h1>Bucket List</h1>
      <form onSubmit={e => { e.preventDefault(); handleAddTodo(); }}>
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} autoFocus/>
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.content}
            </span>
            <div className='list-button-box'>
              <button onClick={() => handleEdit(id, todo.content)}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
              {!todo.completed && <button onClick={() => handleComplete(id)}>Complete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
