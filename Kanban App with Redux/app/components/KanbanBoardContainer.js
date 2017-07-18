import React, { Component } from 'react';
import {Container} from 'flux/utils';
import KanbanBoard from './KanbanBoard';
import {fetchCards} from '../actions/CardActionCreators';
import {connect} from 'react-redux';

class KanbanBoardContainer extends Component {

  componentDidMount(){
    this.props.dispatch(fetchCards());
  }

  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
      cards: this.props.cards,
    });

    return kanbanBoard;
  }

}

export default connect((state) => {
  return {cards: state.card}
})(KanbanBoardContainer);
