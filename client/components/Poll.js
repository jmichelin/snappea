import React from 'react';

//Components
import PollCategory from './../components/PollCategory';

class Poll extends React.Component {
  constructor(){
    super();
  }

  render(){
    console.log("this.props:", this.props);
    return (
      <div className='poll-header'>
        <h1>Select <span className='cursive'>one</span></h1>
        <PollCategory
          pollActions={this.props.pollActions}
          data={this.props.data}
          username={this.props.username}
          categories={this.props.categories} />
      </div>
    )
  }
}

export default Poll;
