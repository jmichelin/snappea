import React from 'react';
import { Button } from 'react-bootstrap';

//Components
import FriendsPref from './FriendsPref';
import Friends from './Friends';
import LocationPref from './LocationPref';
import RestaurantPref from './RestaurantPref';
import RefinePref from './RefinePref';
import RestaurantHistory from './RestaurantHistory';
import ClearHistory from './ClearHistory';

class ProfileHome extends React.Component {
  constructor(){
    super();
    this.openClearModal = this.openClearModal.bind(this);
    this.closeClearModal = this.closeClearModal.bind(this);
    this.displayHome = this.displayHome.bind(this);
    this.displayHistory = this.displayHistory.bind(this);
    this.displayFriendsChoice = this.displayFriendsChoice.bind(this);
    this.displayLocationChoice = this.displayLocationChoice.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.displayFriends = this.displayFriends.bind(this);
    this.displayPreferences = this.displayPreferences.bind(this);
    this.state = {
      showClearModal: false
    }
  }

  openClearModal(){
    this.setState({
      showClearModal: true
    })
  }

  closeClearModal(){
    this.setState({
      showClearModal: false
    })
  }

  displayHome(){
    if(this.props.displayProfileHome){
      return(
        <div>
          <LocationPref {...this.props} />
        </div>
      )
    } else {
      return null;
    }
  }

  displayHistory(){
    const { beenTo } = this.props;
    let history = [];
    //console.log("+++ line 57 component ProfileHome.js value of beenTo =>", beenTo);
    if(this.props.displayHistory){
      if(beenTo.length === 0){
        console.log('here');
        return(
          <div className='history-header'>
            <h1 className='text-center'>It looks like you haven't visited any restaurants recently...</h1>
            <h4 className='text-center'>Use <Button className='btn'>Save to History</Button> to keep track of places you've tried!</h4>
          </div>
        )
      } else {
        history = beenTo.map((res, ind) => {
          console.log("+++ res", res);
          return (
            <RestaurantHistory
              restaurantName={res.name}
              link={res.url}
              date={res.prettyDate}
              restaruantId={res.restaruantId}
              city={res.city}
              rating={res.rating}
              phone={res.phone}
              image={res.image}
              key={ind} />
          );
        }).slice(0,8);

        return (
          <div>
            <h1>Restaurants you've visited</h1>
            {history}
            <div>
              <button className='btn btn-block' onClick={this.openClearModal}>
                Clear your history
              </button>
              <ClearHistory
                {...this.props}
                showClearModal={this.state.showClearModal}
                closeClearModal={this.closeClearModal} />
            </div>
          </div>
        )
      }
    } else {
      return null;
    }
  }

  displayFriendsChoice(){
    if(this.props.displayFriendsChoice){
      return(
        <FriendsPref {...this.props} />
      )
    } else {
      return null;
    }
  }

  displayLocationChoice(){
    if(this.props.displayLocationChoice){
      return(
        <LocationPref {...this.props} />
      )
    } else {
      return null;
    }
  }

  displayResults(){
    if(this.props.displayResults){
      return(
        <RestaurantPref {...this.props} />
      )
    } else {
      return null;
    }
  }

  displayFriends(){
    if(this.props.displayAddFriends){
      return(
        <Friends {...this.props} />
      )
    } else {
      return null;
    }
  }

  displayPreferences(){
    if(this.props.displayPreferences){
      return(
        <RefinePref {...this.props} />
      )
    } else {
      return null;
    }
  }

  render(){
    return(
      <div>
        {this.displayHome()}
        {this.displayHistory()}
        {this.displayLocationChoice()}
        {this.displayFriendsChoice()}
        {this.displayResults()}
        {this.displayFriends()}
        {this.displayPreferences()}
      </div>
    )
  }
}

export default ProfileHome;
