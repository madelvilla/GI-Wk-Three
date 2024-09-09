import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TaskDetail.css';

class TaskDetail extends Component {
  state = {
    task: null,
    addMode: false,
    newDetail: '',
  };

  componentDidMount() {
    const { id } = this.props.params;
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const task = taskList.find((task) => task.id === parseFloat(id));
    this.setState({ task });
  }

  handleDetailChange = (e) => {
    this.setState({ newDetail: e.target.value });
  };

  addDetail = () => {
    const { task, newDetail } = this.state;
    if (task && newDetail.trim()) {
      const updatedTask = { ...task, details: [...(task.details || []), newDetail] };
      this.updateTaskList(updatedTask);
      this.setState({ task: updatedTask, addMode: false, newDetail: '' });
    }
  };

  deleteDetail = (detailToDelete) => {
    const { task } = this.state;
    if (task) {
      const updatedTask = { ...task, details: task.details.filter((detail) => detail !== detailToDelete) };
      this.updateTaskList(updatedTask);
      this.setState({ task: updatedTask });
    }
  };

  updateTaskList = (updatedTask) => {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const updatedTaskList = taskList.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  render() {
    const { task, addMode, newDetail } = this.state;

    return (
      <div className="task-detail-container">
        <h2>Task Details</h2>
        {task ? (
          <>
            <p>{task.value}</p>
            {task.details && (
              <ul>
                {task.details.map((detail, index) => (
                  <li key={index}>
                    {detail}
                    <button onClick={() => this.deleteDetail(detail)}>X</button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => this.setState({ addMode: !addMode })}>
              {addMode ? 'Cancel' : 'Add Details'}
            </button>
            {addMode && (
              <>
                <input
                  type="text"
                  placeholder="Add details"
                  value={newDetail}
                  onChange={this.handleDetailChange}
                />
                <button onClick={this.addDetail}>Save</button>
              </>
            )}
          </>
        ) : (
          <p>Task not found</p>
        )}
        <Link to="/hard">Back to Task List</Link>
      </div>
    );
  }
}

const TaskDetailWithParams = (props) => {
  const { id } = useParams();
  return <TaskDetail {...props} params={{ id }} />;
};

export default TaskDetailWithParams;
