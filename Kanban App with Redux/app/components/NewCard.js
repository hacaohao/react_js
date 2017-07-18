import React,{Component} from 'react';
import CardForm from './CardForm';
import {connect} from 'react-redux';
import {updateDraft, addCard, createDraft} from '../actions/CardActionCreators';

class NewCard extends Component{

  handleChange(field, value){
    this.props.dispatch(updateDraft(field, value));
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch(addCard(this.props.draft));
    this.props.history.pushState(null,'/');
  }

  handleClose(e){
    this.props.history.pushState(null,'/');
  }

  componentDidMount(){
    setTimeout(()=>this.props.dispatch(createDraft()), 0)
  }


  render(){
    return (
      <CardForm draftCard={this.props.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
    );
  }
}

export default connect((state) => {
  return {draft: state.draft}
})(NewCard);
