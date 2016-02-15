import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class MessageFriends extends React.Component {
  constructor(){
    super();
    this.triggerSendMessage = this.triggerSendMessage.bind(this);
    this.friendsString = this.friendsString.bind(this);
    this.concatFriends = this.concatFriends.bind(this);
  }

  friendsString(){
    const { userFriends } = this.props;
    if(userFriends.length > 1){
      return this.concatFriends();
    }
    else {
      return userFriends[0].firstname;
    }
  }

  concatFriends(){
    const { userFriends } = this.props;
    let str = userFriends[0].firstname;
    for(let i=1 ; i<userFriends.length ; i++){
      if(i === userFriends.length-1){
        str += ' & ' + userFriends[i].firstname;
      }
      else {
        str += ', ' + userFriends[i].firstname;
      }
    }
    return str;
  }

  triggerSendMessage(e){
    e.preventDefault();
    const { sendMessage } = this.props.friendActions;
    const { userFriends } = this.props;
    const { mobile_url } = this.props.topRestaurant;
    const message = this.refs.message;

    const messageObj = {
      message: message.value,
      sendTo: userFriends,
      restaurantUrl: mobile_url
    };
    sendMessage(messageObj);
  }

  render(){
    console.log('+++| 49 | props in MessageFriends: ', this.props);

    return(
      <Modal
        show={this.props.showMessageModal}
        onHide={this.props.closeMessageModal}
        className='loginmodal signin' >
        <Modal.Header closeButton className='close-btn'>
        </Modal.Header>
        <Modal.Body className='modalbody'>
          <p className='toggle'>Send a message to {this.friendsString()}:</p>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Hey Peap! Lets meet up!'
                ref='message'/>
              <button
                type='submit'
                className='btn btn-block submit'
                onClick={this.triggerSendMessage}>
                Send
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}


export default MessageFriends;
