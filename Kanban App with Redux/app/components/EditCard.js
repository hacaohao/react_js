import React,{Component} from 'react';
import CardForm from './CardForm';
import {updateDraft, updateCard, createDraft} from '../actions/CardActionCreators';
import {getCard} from '../reducers/cardReducer';
import {connect} from 'react-redux';
import 'babel-polyfill';

class EditCard extends Component{

  handleChange(field, value){
    this.props.dispatch(updateDraft(field, value));
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch(updateCard(
      getCard(this.props.card, this.props.params.card_id), this.props.draft
    ));

    this.props.history.pushState(null,'/');
  }

  handleClose(e){
    this.props.history.pushState(null,'/');
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.dispatch(createDraft(getCard(this.props.card, this.props.params.card_id)));
    }, 0);
  }
  //

  render(){
    return (
      <CardForm draftCard={this.props.draft}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
    )
  }
}

export default connect((state) => {
  return {
    draft: state.draft,
    card: state.card
  }
})(EditCard);
