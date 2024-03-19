import { useState } from "react";
import { Form } from "./Components/Form/Form";
import { Task } from "./Components/Task/Task";
import { getSubheading } from "./Components/utils/getSubheading";
import styles from "./App.module.css";

function App() {
  const [isFormShown, setIsFormShown] = useState(true);
  const [todos, setTodos] = useState([
    { content: "1 Zapłacić rachunki", id: "2341", isDone: false },
    { content: "2 Wyrzucić śmieci", id: "22345", isDone: true },
    { content: "3 Wyrzucić ", id: "5234", isDone: true },
    { content: "4 Zapłacić rachunki", id: "`234fd1", isDone: false },
    { content: "5 Wyrzucić śmieci", id: "223d45", isDone: true },
    { content: "6 Wyrzucić ", id: "523cd4", isDone: true },
  ]);

  function addItem(newTodoName) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { content: newTodoName, id: Math.random(), isDone: false },
    ]);

    setIsFormShown(false);
  }

  function deleteItem(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function finishItem(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, isDone: true };
      })
    );
  }

  function moveUp(index) {
    const copy = [...todos];
    [copy[index], copy[index - 1]] = [copy[index - 1], copy[index]];
    setTodos(copy);
  }

  function moveDown(index) {
    const copy = [...todos];
    [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    setTodos(copy);
  }

  function editItem(id, newTodoName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, content: newTodoName };
      })
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Do zrobienia</h1>
          <h2>{getSubheading(todos.length)}</h2>
        </div>
        {!isFormShown && (
          <button
            className={styles.button}
            onClick={() => setIsFormShown(true)}
          >
            +
          </button>
        )}
      </header>
      {isFormShown && (
        <Form onFormSubmit={(newTodoName) => addItem(newTodoName)} />
      )}
      <ul>
        {todos.map((todo, index) => (
          <Task
            key={todo.id}
            {...todo}
            isFirst={index === 0}
            isLast={index === todos.length - 1}
            onDeleteButtonClick={() => deleteItem(todo.id)}
            onToggleDone={() => finishItem(todo.id)}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
            onEdit={(newName) => editItem(todo.id, newName)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
