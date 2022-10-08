import { useState as reactUseState } from 'react';
import { useState as hooksUseState } from 'chromogen';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <div>
        <span style={{ textDecoration: todo.isDone ? 'line-through' : '' }}>{todo.text}</span>
        <button className="todoButton" onClick={() => markTodo(index)}>
          &#10003;
        </button>{' '}
        <button className="todoButton" onClick={() => removeTodo(index)}>
          X
        </button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [, setValue] = hooksUseState<string>('', 'todo');
  const [inputVal, setInputVal] = reactUseState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    setValue(inputVal);
    addTodo(inputVal);
    setInputVal('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formDiv">
        <label>Add Todo</label>
        <input
          type="text"
          className="inputTodo"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        ></input>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

function TodoList() {
  const [todos, setTodos] = reactUseState<Array<any>>([]);

  const addNewTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const checkTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todolist">
      <div className="container">
        <div className="todoHeader">
          <h1 className="todoH1">Todo List</h1>
          <FormTodo addTodo={addNewTodo} />
        </div>
        <div>
          {todos.map((todo, index) => (
            <div className="card">
              <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={checkTodo}
                removeTodo={removeTodo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
