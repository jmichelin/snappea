import React from 'react';

class TopCategoriesItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  componentWillMount() {
    if(this.props.multiplier === 2) {
      this.setState({
        likeButton: "btn btn-left btn-primary btn-xs active focus",
        dislikeButton: "btn btn-right btn-primary btn-xs"
      });
    } else if(this.props.multiplier === 0) {
      this.setState({
        likeButton: "btn btn-left btn-primary btn-xs",
        dislikeButton: "btn btn-right btn-primary btn-xs active focus"
      });
    } else {
      this.setState({
        likeButton: "btn btn-left btn-primary btn-xs",
        dislikeButton: "btn btn-right btn-primary btn-xs"
      });
    }
  }

  handleLike() {
    const { category, username } = this.props;
    const { likeCategory } = this.props.pollActions;
    const request = {
      username: username,
      category: category
    };
    likeCategory(request);
    this.setState( {
      likeButton: "btn btn-left btn-primary btn-xs active focus",
      dislikeButton: "btn btn-right btn-primary btn-xs"
    });
  }

  handleDislike() {
    const { category, username } = this.props;
    const { dislikeCategory } = this.props.pollActions;
    const request = {
      username: username,
      category: category
    };
    dislikeCategory(request);
    this.setState( {
      likeButton: "btn btn-left btn-primary btn-xs",
      dislikeButton: "btn btn-right btn-primary btn-xs active focus"
     });
  }

  render() {
    return(
      <li className='col-sm-6 col-md-4 list-group-item'>
        <p>{this.props.category}</p>
        <button onClick={ this.handleLike } type="button" className={this.state.likeButton}><span className="glyphicon glyphicon-thumbs-up"></span> Like</button>
        <button onClick={ this.handleDislike } type="button" className={this.state.dislikeButton}><span className="glyphicon glyphicon-thumbs-down"></span> Dislike</button>
      </li>
    );
  }
}

export default TopCategoriesItem;
