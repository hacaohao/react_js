import React, { Component, PropTypes } from 'react';
import {addTask, toggleTask, deleteTask} from '../actions/TaskActionCreators';
import {connect} from 'react-redux';

class CheckList extends Component {
  checkInputKeyPress(evt){
    if(evt.key === 'Enter'){
      let newTask = {id:Date.now(), name:evt.target.value, done:false};
      this.props.dispatch(addTask(this.props.cardId, newTask));
      evt.target.value = '';
    }
  }

  handleChange(task, taskIndex){
    this.props.dispatch(toggleTask(this.props.cardId, task, taskIndex));
  }

  handleDelete(task, taskIndex){
    this.props.dispatch(deleteTask(this.props.cardId, task, taskIndex));
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist__task">
        <input type="checkbox"
               checked={task.done}
               onChange={ this.handleChange.bind(this, task, taskIndex) } />
        {task.name}{' '}
        <a href="#"
           className="checklist__task--remove"
           onClick={ this.handleDelete.bind(this, task, taskIndex) } />
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
          className="checklist--add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object)
};
export default connect()(CheckList);
