import React from 'react';

import TopCategoriesItem from './../components/TopCategoriesItem';

class TopCategories extends React.Component {
  constructor() {
    super();
    this.displayTopCategories = this.displayTopCategories.bind(this);
  }

  displayTopCategories() {
    const topCategories = this.props.topCategories.slice();
    return topCategories.map((category) => {
      return(
        <TopCategoriesItem
          key={category.name}
          category={category.name}
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
