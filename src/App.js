import "./App.css";
import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiCheckSquare, BiEdit } from 'react-icons/bi';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodo, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodo];
    updatedTodoArr.push(newTodoItem);
    setTodo(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }

  const handleClearTodo = () => {
    console.log('cleared');
  }

  const handleUpdateTodo = () => {
    console.log('updated');
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodo(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m;

    let filteredItem = {
      ...allTodo[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index);
    localStorage.setItem('completedTodo', JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    if (savedTodo) {
      setTodo(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo);
    }
  }, [])

  return (
    <div className='App'>
      <h1>To-Do App</h1>
      <div className="container">
        <div className='todo-wrapper'>
          <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title of task" />
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description of task" />
            </div>
            <div className='todo-input-item'>
              <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
              <button type="button" onClick={handleUpdateTodo} className="primaryBtn">Update</button>
              <button type="button" onClick={handleClearTodo} className="primaryBtn">Clear</button>
            </div>
          </div>
          <div className="btn-area">
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => setIsCompleteScreen(false)}> Task Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => setIsCompleteScreen(true)}> Task Completed</button>
          </div>
          <div className="todo-list">
            {isCompleteScreen === false && allTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <BiCheckSquare className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                    <BiEdit className="icon-edit" onClick={console.log('clicked')} title="Edit?" />
                    <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                  </div>
                </div>
              )
            })
            }

            {isCompleteScreen === true && completedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>
                  <div>
                    <BiEdit className="icon-edit" onClick={console.log('clicked')} title="Edit?" />
                    <AiOutlineDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete?" />
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
