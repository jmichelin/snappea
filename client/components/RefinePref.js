import React from 'react';

//Components
import Poll from './Poll';
import DeletePref from './DeletePref';

class RefinePref extends React.Component {
  constructor(){
    super();
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.displayPreferencePoll = this.displayPreferencePoll.bind(this);
    this.displayLoadingSpinner = this.displayLoadingSpinner.bind(this);
    this.state = {
      showDeleteModal: false,
    }
  }

  openDeleteModal(){
    this.setState({
      showDeleteModal: true
    })
  }

  closeDeleteModal(){
    this.setState({
      showDeleteModal: false
    })
  }

  displayPreferencePoll(){
    if(this.props.isSubmitting){
      return(
        <Poll {...this.props} />
      )
    } else {
      return(
        <div>
          Save some food for tomorrow!
        </div>
      )
    }
  }

  displayLoadingSpinner(){
    if(this.props.isFetchingYelp){
      return(
        <div className='spinner'>
          <h1 className='cursive'>One moment please</h1>
          <image src='./../static/assets/spinner.gif' />
        </div>
      )
    } else {
      return null;
    }
  }

  render(){
    return(
      <div className='poll-header text-center'>
        <h6 className='cursive'>Refine your preferences</h6>
        <p>By giving us an idea of your preferences, the SnapPea algorithm can provide better recommendations!</p>
        <p>Want to <a onClick={this.openDeleteModal}>reset your preferences</a>?</p>
        {this.displayPreferencePoll()}
        {this.displayLoadingSpinner()}
        <div className='text-center'>
          <DeletePref
            {...this.props}
            showDeleteModal={this.state.showDeleteModal}
            closeDeleteModal={this.closeDeleteModal} />
        </div>
      </div>
    )
  }
}

export default RefinePref;
