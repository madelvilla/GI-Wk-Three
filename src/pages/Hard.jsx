import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Hard.css';

class Hard extends Component {
  state = {
    addTask: '',
    taskList: [],
    showEdit: -1,
    updatedText: '',
  };

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
    this.setState({ taskList: savedTasks });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.taskList !== this.state.taskList) {
      localStorage.setItem('taskList', JSON.stringify(this.state.taskList));
    }
  }

  addTaskItem = () => {
    const { addTask, taskList } = this.state;
    if (addTask.trim()) {
      const newTask = { id: Math.random(), value: addTask, details: [] };
      this.setState({ taskList: [...taskList, newTask], addTask: '' });
    }
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      taskList: prevState.taskList.filter((task) => task.id !== id),
    }));
  };

  editItem = (id, newText) => {
    this.setState((prevState) => ({
      taskList: prevState.taskList.map((task) =>
        task.id === id ? { ...task, value: newText } : task
      ),
      showEdit: -1,
      updatedText: '',
    }));
  };

  render() {
    const { addTask, taskList, showEdit, updatedText } = this.state;

    return (
      <div className="hard-container">
        <h1>Todo List:</h1>
        <input
          type="text"
          placeholder="Add task to list"
          value={addTask}
          onChange={(e) => this.setState({ addTask: e.target.value })}
        />
        <button onClick={this.addTaskItem}>Add Task</button>
        <ul className="todo-list">
          {taskList.map((task) => (
            <li key={task.id}>
              <Link to={`/task/${task.id}`}>{task.value}</Link>
              <button onClick={() => this.deleteTask(task.id)}>Delete</button>
              <button onClick={() => this.setState({ showEdit: task.id, updatedText: task.value })}>Edit</button>
              {showEdit === task.id && (
                <>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => this.setState({ updatedText: e.target.value })}
                  />
                  <button onClick={() => this.editItem(task.id, updatedText)}>Update</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Hard;
