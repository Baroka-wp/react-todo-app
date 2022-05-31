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
  const batch = db.batch();

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

  const handleChange = async (id) => {
    const newTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    const docIdToUpdate = [...newTodo.filter((todo) => todo.id === id)];

    const sfRef = db.collection('todo-liste').doc(docIdToUpdate[0].docId);
    batch.update(sfRef, { completed: docIdToUpdate[0].completed });
    await batch.commit();
    await setTodos(newTodo);
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

  const setUpdate = async (updateTitle, id) => {
    const newTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: updateTitle };
      }
      return todo;
    });
    setTodos(newTodo);
    const docIdToUpdate = [...todos.filter((todo) => todo.id === id)];
    const sfRef = db.collection('todo-liste').doc(docIdToUpdate[0].docId);
    await batch.update(sfRef, { title: docIdToUpdate[0].title });
    await batch.commit();
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
