import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Home from "../header/Home";
import { usePropertyContext } from "../../propertyContext";

function PropertyList() {
  const navigate = useNavigate();

  const handleViewDetails = (property) => {
    navigate(`/property-details/${property.nestaway_id}`);
  };

  const { state, dispatch } = usePropertyContext();

  const propertyReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_PROPERTIES":
        return { ...state, properties: action.payload.houses };
      case "BOOK_PROPERTY":
        const updatedProperties = state.properties.map((property) => {
          if (property.nestaway_id === action.payload.propertyId) {
            return { ...property, booked: true };
          }
          return property;
        });
        return { ...state, properties: updatedProperties };
      default:
        return state;
    }
  };

  const initialState = {
    properties: [],
  };

  const [propertyState, propertyDispatch] = useReducer(
    propertyReducer,
    initialState
  );

  useEffect(() => {
    fetch("https://mocki.io/v1/c1b8d087-971c-472f-870c-47185f710c17")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "list");
        propertyDispatch({ type: "FETCH_PROPERTIES", payload: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Home />
      <div className="property-list">
        {Array.isArray(propertyState.properties) &&
        propertyState.properties.length > 0 ? (
          propertyState.properties.map((property) => (
            <div key={property.nestaway_id} className="property-card">
              <img
                src={property.image_url}
                style={{ minHeight: "280px" }}
                alt={property.title}
              />
              <h2 style={{ paddingTop: "1rem" }}>{property.house_type}</h2>
              <h2>{property.nestaway_id}</h2>
              <p>Location: {property.locality.toUpperCase()}</p>
              <p>Rent: {property.rent}</p>
              {property.booked ? (
                <p>Booked</p>
              ) : (
                <div className="btnDetails">
                  <button
                    onClick={() => handleViewDetails(property)}
                    className="btn first"
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
            
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </>
  );
}

export default PropertyList;
