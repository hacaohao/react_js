import constants from '../constants';
import KanbanAPI from '../api/KanbanApi';
import {getCard, getCardIndex} from '../reducers/cardReducer';

export function fetchCards(){
  return {
    type: constants.FETCH_CARDS,
    payload: KanbanAPI.fetchCards()
  }
}

export function addCard(card){
  return {
    type: constants.CREATE_CARD,
    payload: KanbanAPI.addCard(card),
    meta: {card}
  }  
}

export function toggleCardDetails(cardId){
  return function(dispatch){
    dispatch({
        type: constants.TOGGLE_CARD_DETAILS,
        payload: {cardId}
    })
  }  
}

export function updateCard(card, draftCard){
  return{
    type: constants.UPDATE_CARD,
    payload: KanbanAPI.updateCard(card, draftCard),
    meta: {card, draftCard}
  }
}

export function updateCardStatus(cardId, listId){
  return function(dispatch){
    dispatch({
      type: constants.UPDATE_CARD_STATUS,
      payload: {cardId, listId}
    });
  }
}

export function updateCardPosition(cardId , afterId){
  return function(dispatch){
    dispatch({
      type: constants.UPDATE_CARD_POSITION,
      payload: {cardId , afterId}
    });
  }
}

export function persistCardDrag(cardProps){
  let card = getCard(cardProps.card, cardProps.id);
  let cardIndex = getCardIndex(cardProps.card, cardProps.id);
  return {
    type: constants.PERSIST_CARD_DRAG,
    payload: KanbanAPI.persistCardDrag(card.id, card.status, cardIndex),
    meta: {cardProps}
  }
}

export function createDraft(card){
  return function(dispatch){
    dispatch({
      type: constants.CREATE_DRAFT,
      payload: {card}
    });
  }
}

export function updateDraft(field, value){
  return function(dispatch){
    dispatch({
      type: constants.UPDATE_DRAFT,
      payload: {field, value}
    });
  }
}
