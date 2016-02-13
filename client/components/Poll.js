import React from 'react';

//Components
import PollCategory from './../components/PollCategory';
import TopCategories from './../components/TopCategories';

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
        <TopCategories
          pollActions={this.props.pollActions}
          topCategories={this.props.topCategories}
          username={this.props.username}/>
      </div>
    )
  }
}

export default Poll;
