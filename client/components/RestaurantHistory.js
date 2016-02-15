import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class RestaurantHistory extends React.Component {

  render(){
    const { restaurantName, link, date, city, restaruantId, rating, phone, image } = this.props;
    console.log('+++ logging city = >', city);
    return (
      <div>
        <li className='list-group-item'>
          <img src={image} height="80px" style={{'margin-right':'5px', 'float':'left'}} />
          <a href={link} target='_blank'><h3 style={{'margin-top':'-4px'}}>{restaurantName}<img src={rating} className='pull-right' /></h3></a>
          <span className='pull-right'>Visited on {date}</span>
          <p>{phone}&nbsp;<a href={`tel:${phone}`}><Glyphicon glyph="phone" /></a></p>
          <p>{city}</p>
        </li>
      </div>
    )
  }
}

export default RestaurantHistory;
