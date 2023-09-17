// actionTypes.js
export const FETCH_PROPERTIES = 'FETCH_PROPERTIES';
export const BOOK_PROPERTY = 'BOOK_PROPERTY';

// actions.js
export const fetchProperties = (properties) => ({
  type: FETCH_PROPERTIES,
  payload: properties,
});

export const bookProperty = (propertyId, bookingData) => ({
  type: BOOK_PROPERTY,
  payload: { propertyId, bookingData },
});
