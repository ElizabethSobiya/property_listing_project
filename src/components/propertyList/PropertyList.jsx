import React from "react";
import { connect } from "react-redux"; // Import connect from react-redux
import { useNavigate } from "react-router-dom";
import "./style.css";
import Home from "../header/Home";
import PropertyDetails from "../propertyDetails/PropertyDetails";


const mapStateToProps = (state) => {
  console.log(state.propertyReducer.properties, 'list');

  return {
    properties: state.propertyReducer.properties,
  };
};


function PropertyList({ properties }) {
  const navigate = useNavigate();

  const handleViewDetails = (property) => {
    navigate(`/property-details/${property.nestaway_id}`);
  };

  return (
    <>
      <Home />
      <div className="property-list">
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((property) => (
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
              <div className="btnDetails">
                <button
                  onClick={() => handleViewDetails(property)}
                  className="btn first"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
        <PropertyDetails properties={properties} />
      </div>
    </>
  );
}

export default connect(mapStateToProps)(PropertyList);
