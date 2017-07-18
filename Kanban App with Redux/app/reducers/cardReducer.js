import update from 'react-addons-update';
import constants from '../constants';

export function getCard(cards, id){
  return cards.find( (card) => card.id == id);
};

export function getCardIndex(cards, id){
  return cards.findIndex((card)=>card.id == id);
};

let reducer = (state = [], action) => {
    switch (action.type) {
      case constants.FETCH_CARDS + constants.FULFILLED:
        return action.payload;
    
      /*
       * Card Creation
       */
      case constants.CREATE_CARD + constants.PENDING:
        return update(state, {$push: [action.meta.card] })

      case constants.CREATE_CARD + constants.FULFILLED:
        cardIndex = getCardIndex(state, action.meta.card.id);
        return update(state, {
          [cardIndex]: {
            id: { $set: action.payload.id }
          }
        });

      case constants.CREATE_CARD + constants.REJECTED:
        cardIndex = getCardIndex(state, action.meta.card.id);
        return update(state, { $splice:[[cardIndex, 1]]});

      /*
       * Card Status Toggle
       */
      case constants.TOGGLE_CARD_DETAILS:
        cardIndex = getCardIndex(state, action.payload.cardId);
        return update(state, {
          [cardIndex]: {
            showDetails: { $apply: (currentValue) => (currentValue !== false)? false : true }
          }
        });

      /*
       * Card Update
       */
      case constants.UPDATE_CARD + constants.PENDING:
        cardIndex = getCardIndex(state, action.meta.card.id);
        return update(state, {
          [cardIndex]: {
            $set: action.meta.draftCard
          }
        });

      case constants.UPDATE_CARD + constants.REJECTED:
        cardIndex = getCardIndex(state, action.meta.card.id);
        return update(state, {
          [cardIndex]: {
            $set: action.meta.card
          }
        });

      /*
       * Card Drag'n Drop
       */
      case constants.UPDATE_CARD_POSITION:
        if(action.payload.cardId !== action.payload.afterId) {
          cardIndex = getCardIndex(state, action.payload.cardId);
          let card = state[cardIndex]
          let afterIndex = getCardIndex(state, action.payload.afterId);
          return update(state, {
            $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          });
        }

      case constants.UPDATE_CARD_STATUS:
        cardIndex = getCardIndex(state, action.payload.cardId);
        return update(state, {
          [cardIndex]: {
            status: { $set: action.payload.listId }
          }
        });

      case constants.PERSIST_CARD_DRAG + constants.REJECTED:
        cardIndex = getCardIndex(state, action.meta.cardProps.id);
        return update(state, {
          [cardIndex]: {
            status: { $set: action.meta.cardProps.status }
          }
        });

      /*
       * Task Creation
       */
      case constants.CREATE_TASK + constants.PENDING:
        cardIndex = getCardIndex(state, action.meta.cardId);
        return update(state, {
          [cardIndex]: {
            tasks: {$push: [action.meta.task] }
          }
        });

      case constants.CREATE_TASK + constants.FULFILLED:
        cardIndex = getCardIndex(state, action.meta.cardId);
        taskIndex = state[cardIndex].tasks.findIndex((task)=>(
          task.id == action.meta.task.id
        ));
        return update(state, {
          [cardIndex]: {
            tasks: {
              [taskIndex]: {
                id: { $set: action.payload.id }
              }
            }
          }
        });

      case constants.CREATE_TASK + constants.REJECTED:
        let cardIndex = getCardIndex(state, action.meta.cardId);
        let taskIndex = state[cardIndex].tasks.findIndex((task)=>(
          task.id == action.meta.task.id
        ));
        return update(state, {
          [cardIndex]: {
            tasks: {
              $splice:[[taskIndex, 1]]
            }
          }
        });

      /*
       * Task Deletion
       */
      case constants.DELETE_TASK + constants.PENDING:
        cardIndex = getCardIndex(state, action.meta.cardId);
        return update(state, {
          [cardIndex]: {
            tasks: {$splice: [[action.meta.taskIndex,1]] }
          }
        });

      case constants.DELETE_TASK + constants.REJECTED:
        cardIndex = getCardIndex(state, action.meta.cardId);
        return update(state, {
          [cardIndex]: {
            tasks: {$splice: [[action.meta.taskIndex, 0, action.meta.task]] }
          }
        });

      /*
       * Task Toggling
       */
      case constants.TOGGLE_TASK + constants.PENDING:
        cardIndex = getCardIndex(state, action.meta.cardId);
        return update(state, {
          [cardIndex]: {
            tasks: {
              [action.meta.taskIndex]: { done: { $apply: (done) => !done }}
            }
          }
        });

      case constants.TOGGLE_TASK + constants.REJECTED:
        cardIndex = getCardIndex(state, action.meta.cardId);
        return update(state, {
          [cardIndex]: {
            tasks: {
              [action.meta.taskIndex]: { done: { $apply: (done) => !done }}
            }
          }
        });

      default:
        return state;
    }
  }

  export default reducer;