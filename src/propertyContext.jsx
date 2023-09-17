// PropertyContext.js

import React, { createContext, useReducer, useContext } from 'react';

const PropertyContext = createContext();

const initialState = {
  properties: [],
};

const propertyReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'BOOK_PROPERTY':
      const updatedProperties = state.properties.map((property) =>
        property.id === action.payload.id
          ? { ...property, booked: true, bookingData: action.payload.bookingData }
          : property
      );
      return { ...state, properties: updatedProperties };
    default:
      return state;
  }
};

const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  return (
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
};

const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

export { PropertyProvider, usePropertyContext };
