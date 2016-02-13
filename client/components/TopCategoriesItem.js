import React from 'react';

class TopCategoriesItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <li className='col-sm-6 col-md-4 list-group-item'>
        <p>{this.props.category}: {this.props.multiplier}</p>
        <button type="button" className="btn btn-left btn-primary btn-xs"><span className="glyphicon glyphicon-thumbs-up"></span> Like</button>
        <button type="button" className="btn btn-right btn-primary btn-xs"><span className="glyphicon glyphicon-thumbs-down"></span> Dislike</button>
      </li>
    );
  }
}

export default TopCategoriesItem;
