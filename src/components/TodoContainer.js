import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/firebase.config';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from './pages/About';
import NotMatch from './pages/NotMatch';
import Navbar from './Navbar';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const docRef = db.collection('todo-liste').doc(uuidv4());

  useEffect(() => {
    db.collection('todo-liste')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTodos((prevTodos) => [...prevTodos, {
            docId: doc.id,
            id: doc.data().id,
            title: doc.data().title,
            completed: doc.data().completed,
          }]);
        });
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('todosItems', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (id) => {
    setTodos([...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const delTodo = async (id) => {
    const docIdToDel = [...todos.filter((todo) => todo.id === id)];
    await db.collection('todo-liste').doc(docIdToDel[0].docId).delete();
    await setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = async (title) => {
    const newTodos = {
      id: uuidv4(),
      title,
      completed: false,
    };
    await docRef.set(newTodos);
    await setTodos((prevTodos) => [...prevTodos, newTodos]);
  };

  const setUpdate = (updateTitle, id) => {
    setTodos([...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: updateTitle };
      }
      return todo;
    }));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo
                  addTodoProps={addTodoItem}
                />
                <TodosList
                  todos={todos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  setUpdate={setUpdate}
                />
              </div>
            </div>
        )}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
};

export default TodoContainer;
