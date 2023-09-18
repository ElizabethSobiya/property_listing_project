import { BOOK_PROPERTY } from '../actions/bookingActions';

const initialState = {
  properties: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_PROPERTY:
      const { propertyId, bookingData } = action.payload;
      const updatedProperties = state.properties.map((property) =>
        property.id === propertyId
          ? { ...property, booked: true, bookingData }
          : property
      );
      return {
        ...state,
        properties: updatedProperties,
      };
    default:
      return state;
  }
};

export default bookingReducer;
