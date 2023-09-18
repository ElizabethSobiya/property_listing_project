const propertyReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'BOOK_PROPERTY':
      const { propertyId, bookingData } = action.payload;
      const updatedProperties = state.properties.map((property) =>
        property.id === propertyId
          ? { ...property, booked: true, bookingData }
          : property
      );
      return { ...state, properties: updatedProperties };
    default:
      return state;
  }
};

export default propertyReducer;
