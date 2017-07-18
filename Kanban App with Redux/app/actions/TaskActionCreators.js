import constants from '../constants';
import KanbanAPI from '../api/KanbanApi';

export function addTask(cardId, task){
  return {
    type: constants.CREATE_TASK,
    payload: KanbanAPI.addTask(cardId, task),
    meta: {cardId, task}
  }
}

export function deleteTask(cardId, task, taskIndex){
  return {
    type: constants.DELETE_TASK,
    payload: KanbanAPI.deleteTask(cardId, task, taskIndex),
    meta: {cardId, task, taskIndex}
  }
}

export function toggleTask(cardId, task, taskIndex){
  return {
    type: constants.TOGGLE_TASK,
    payload: KanbanAPI.toggleTask(cardId, task, taskIndex),
    meta: {cardId, task, taskIndex}
  } 
}