import { routeActions } from 'react-router-redux';

export const LOAD_YELP_REQUEST = 'LOAD_YELP_REQUEST';
export const LOAD_YELP_SUCCESS = 'LOAD_YELP_SUCCESS';
export const LOAD_YELP_DATA = 'LOAD_YELP_DATA';

// Fetches restaurants to be used in poll
export const fetchYelpData = () => {
  return dispatch => {
    dispatch(loadYelpRequest());

    return fetch('/poll', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(loadYelpData(response));
      dispatch(loadYelpSuccess());
    })
  }
}

const loadYelpData = (info) => {
  return {
    type: LOAD_YELP_DATA,
    info
  }
}

const loadYelpRequest = () => {
  return {
    type: LOAD_YELP_REQUEST
  }
}

const loadYelpSuccess = () => {
  return {
    type: LOAD_YELP_SUCCESS
  }
}

export const SEND_POLL_REQUEST = 'SEND_POLL_REQUEST';
export const SEND_POLL_SUCCESS = 'SEND_POLL_SUCCESS';
export const SEND_POLL_ERROR = 'SEND_POLL_ERROR';
export const UPDATE_POLL = 'UPDATE_POLL';
export const SYNC_POLL = 'SYNC_POLL';
export const END_POLL = 'END_POLL';
export const REFRESH_POLL = 'REFRESH_POLL';

// Sends poll responses to backend
export const sendPollChoices = (choices) => {
  return dispatch => {
    console.log('INSIDE DISPATCH');
    dispatch(sendPollRequest(choices));

    return fetch('/preference', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: choices.username,
        selected: choices.selected,
        unselected: choices.unselected
      })
    })
  }
}

const sendPollRequest = (info) => {
  return {
    type: SEND_POLL_REQUEST,
    info
  }
}

const sendPollSuccess = (info) => {
  return {
    type: SEND_POLL_SUCCESS,
    info
  }
}

const sendPollError = (err) => {
  return {
    type: SEND_POLL_ERROR,
    err
  }
}

export const updatePoll = (info, username) => {
  let results = shortenPoll(info, username);
  return {
    type: UPDATE_POLL,
    results
  }
}

const shortenPoll = (info) => {
  let results = info.slice(2);

  return results;
}

export const syncPoll = (info, username) => {
  return {
    type: SYNC_POLL,
    info,
    username
  }
}

export const endPoll = (userInfo) => {
  return {
    type: END_POLL,
    userInfo
  }
}

export const refreshPoll = () => {
  return {
    type: REFRESH_POLL
  }
}

export const RESET_SUCCESS = 'RESET_SUCCESS';

//Clears previous preferences and
//allows user to start with clean slate
export const resetPoll = (credentials) => {
  return dispatch => {
    return fetch('/preference', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(resetSuccess(response));
    })
    .catch(err => console.error('Error in Reset Poll:', err));
  }
}

const resetSuccess = (info) => {
  console.log('line 160', info);
  return {
    type: RESET_SUCCESS,
    info
  }
}

export const LOAD_TOP_CATEGORIES = 'LOAD_TOP_CATEGORIES';
export const LOAD_LIKES = 'LOAD_LIKES';

export const fetchTopCategories = (username) => {
  return dispatch => {
    return fetch('/preference?username=' + username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(loadTopCategories(response));
    })
  }
}

const loadTopCategories = (topCategories) => {
  return {
    type: LOAD_TOP_CATEGORIES,
    topCategories
  }
}

// Sends liked category to backend
export const likeCategory = (request) => {
  console.log('inside likeCategory');
  console.log("request:", request);
  return dispatch => {
    console.log('inside dispatch');

    return fetch('/preference', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: request.username,
        category: request.category,
        multiplier: 2
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(loadLikes(response));
    })
  }
}

const loadLikes = (info) => {
  console.log("inside action creator:");
  return {
    type: LOAD_LIKES,
    info
  }
}

export const dislikeCategory = (request) => {
  console.log('inside dislikeCategory');
  console.log("request:", request);
  return dispatch => {
    console.log('inside dispatch');

    // dispatch(sendDislikedCategory(request));

    return fetch('/preference', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: request.username,
        category: request.category,
        multiplier: 0
      })
    })
  }
}
