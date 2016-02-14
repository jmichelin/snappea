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
      <div>
        <div className='poll-header'>
          <h1>Select <span className='cursive'>one</span></h1>
          <PollCategory
            pollActions={this.props.pollActions}
            data={this.props.data}
            username={this.props.username}
            categories={this.props.categories} />
          <h1>Optional <span className='cursive'>preferences</span></h1>
          <p>If you wish to increase (or decrease) the likelihood of seeing particular restaurant categories, feel free to like (or dislike) them here.</p>
          <TopCategories
            pollActions={this.props.pollActions}
            topCategories={this.props.topCategories}
            username={this.props.username}
            wasReset={this.props.wasReset}/>
        </div>
      </div>
    );
  }
}

export default Poll;
