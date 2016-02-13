import React from 'react';

class TopCategoriesItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike() {
    const { category, username } = this.props;
    const { likeCategory } = this.props.pollActions;
    const request = {
      username: username,
      category: category
    };
    likeCategory(request);
  }

  handleDislike() {
    const { category, username } = this.props;
    const request = {
      username: username,
      category: category
    };
    dislikeCategory(request);
  }

  render() {
    return(
      <li className='col-sm-6 col-md-4 list-group-item'>
        <p>{this.props.category}: {this.props.multiplier}</p>
        <button onClick={ this.handleLike } type="button" className="btn btn-left btn-primary btn-xs"><span className="glyphicon glyphicon-thumbs-up"></span> Like</button>
        <button onClick={ this.handleDislike } type="button" className="btn btn-right btn-primary btn-xs"><span className="glyphicon glyphicon-thumbs-down"></span> Dislike</button>
      </li>
    );
  }
}

export default TopCategoriesItem;
