import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class MessageFriends extends React.Component {
  constructor(){
    super();
  }

  render(){
    console.log('+++| 10 | this.props in MessageFriends: ', this.props);

    return(
      <Modal
        show={this.props.showMessageModal}
        onHide={this.props.closeMessageModal}
        className='loginmodal signin' >
        <Modal.Header closeButton className='close-btn'>
        </Modal.Header>
        <Modal.Body className='modalbody'>
          <p className='toggle'>Test Message Friends</p>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Hey Peap! Lets meet up!'
                ref='message'/>
              <button
                type='submit'
                className='btn btn-block submit'>
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
