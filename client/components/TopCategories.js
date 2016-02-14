import React from 'react';

import TopCategoriesItem from './../components/TopCategoriesItem';

class TopCategories extends React.Component {
  constructor(props) {
    super(props);
    this.displayTopCategories = this.displayTopCategories.bind(this);
  }

  displayTopCategories() {
    const topCategories = this.props.topCategories.slice();
    return topCategories.map((category) => {
      return(
        <TopCategoriesItem
          key={category.name}
          pollActions={this.props.pollActions}
          category={category.name}
          username={this.props.username}
          multiplier={category.multiplier} />
      );
    });
  }

  render() {
    return(
      <ul className='list-group'>
        {this.displayTopCategories()}
      </ul>
    );
  }
}

export default TopCategories;
