import {
    FETCH_PROPERTIES_SUCCESS,
    FETCH_PROPERTIES_FAILURE,
  } from '../actions/bookingActions';
  
  const initialState = {
    properties: [], 
    error: null,
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROPERTIES_SUCCESS:
        return {
          ...state,
          properties: action.payload,
          error: null,
        };
      case FETCH_PROPERTIES_FAILURE:
        return {
          ...state,
          properties: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;
  