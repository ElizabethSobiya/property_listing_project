
import axios from 'axios';

export const FETCH_PROPERTIES_SUCCESS = 'FETCH_PROPERTIES_SUCCESS';
export const FETCH_PROPERTIES_FAILURE = 'FETCH_PROPERTIES_FAILURE';
export const BOOK_PROPERTY = 'BOOK_PROPERTY';

export const fetchPropertiesSuccess = (properties) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  payload: properties,
});

export const fetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  payload: error,
});

// Asynchronous action to fetch properties
export const fetchProperties = () => {
  return (dispatch) => {
    axios
      .get('https://mocki.io/v1/c1b8d087-971c-472f-870c-47185f710c17')
      .then((response) => {
        const properties = response.data;
        console.log(response, 'actions')
        console.log(response.data);
        dispatch(fetchPropertiesSuccess(properties));
      })
      .catch((error) => {
        dispatch(fetchPropertiesFailure(error));
      });
  };
};

// Action creator for booking a property
export const bookProperty = (propertyId, bookingData) => ({
  type: BOOK_PROPERTY,
  payload: { propertyId, bookingData },
});


