import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class MessageFriends extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <Modal
        show={this.props.showMessageFriendsModal}>
        <Modal.Header closeButton className='close-btn'>
        </Modal.Header>
        <Modal.Body>Test Message Friends</Modal.Body>
      </Modal>
    )
  }
}
