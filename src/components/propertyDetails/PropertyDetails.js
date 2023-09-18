import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { usePropertyContext } from "../../propertyContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import House from "../../assets/guided-tour.png";

const initialState = {
  property: null,
  formData: { name: "", contact: "", dates: "" },
  formErrors: { name: "", contact: "", dates: "" },
  successMessage: "",
  isDialogOpen: false,
};

const propertyReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, property: action.payload };
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "SET_FORM_ERRORS":
      return { ...state, formErrors: action.payload };
    case "SET_SUCCESS_MESSAGE":
      return { ...state, successMessage: action.payload };
    case "OPEN_DIALOG":
      return { ...state, isDialogOpen: true };
    case "CLOSE_DIALOG":
      return { ...state, isDialogOpen: false };
    case "SET_BOOKED_STATUS":
      return { ...state, isPropertyBooked: action.payload };
    default:
      return state;
  }
};

function PropertyDetails() {
  const { id } = useParams();
  const { state, dispatch } = usePropertyContext();
  const [propertyState, propertyDispatch] = useReducer(
    propertyReducer,
    initialState
  );

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/c1b8d087-971c-472f-870c-47185f710c17")
      .then((response) => response.json())
      .then((data) => {
        // Find the property with the matching ID
        const selectedProperty = data.houses.find(
          (property) => property.nestaway_id === id
        );

        if (selectedProperty) {
          propertyDispatch({ type: "SET_PROPERTY", payload: selectedProperty });
          // Retrieve the booking status from localStorage
          const isPropertyBooked = localStorage.getItem(`property_${id}_booked`) === "true";
          propertyDispatch({ type: "SET_BOOKED_STATUS", payload: isPropertyBooked });
        } else {
          console.error(`Property with ID ${id} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [propertyDispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    propertyDispatch({ type: "SET_FORM_DATA", payload: { [name]: value } });
  };

  const validateForm = () => {
    const errors = {};

    if (!propertyState.formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!propertyState.formData.contact.trim()) {
      errors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(propertyState.formData.contact)) {
      errors.contact = "Invalid contact format (10 digits)";
    }

    propertyDispatch({ type: "SET_FORM_ERRORS", payload: errors });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch({
        type: "BOOK_PROPERTY",
        payload: {
          id: propertyState.property.id,
          bookingData: propertyState.formData,
        },
      });

      propertyDispatch({
        type: "SET_SUCCESS_MESSAGE",
        payload: "Booking successful!",
      });

      propertyDispatch({ type: "SET_BOOKED_STATUS", payload: true });
      propertyDispatch({ type: "CLOSE_DIALOG" });

      // Store the booking status in localStorage
      localStorage.setItem(`property_${id}_booked`, "true");
    }
  };

  const openDialog = () => {
    propertyDispatch({ type: "OPEN_DIALOG" });
  };

  const closeDialog = () => {
    propertyDispatch({ type: "CLOSE_DIALOG" });
  };

  return (
    <>
      <div className="centered-container" style={{marginBottom:'100px'}}>
        <div className="property_details">
          <h2>Property Details</h2>

          <p style={{ paddingTop: "15px", lineHeight: "1.8rem" }}>
            <span>Description:</span>{" "}
            {propertyState?.property?.description?.short_description || "-"}
          </p>
          <p style={{ paddingTop: "15px" }}>
            <span>Amenities: </span>
            {propertyState.property?.amenity_list?.length > 0
              ? propertyState.property?.amenity_list[0].amenity
              : "-"}
          </p>
          <div className="amtImg">
            {propertyState.property?.amenity_list?.length > 0 && (
              <img
                src={propertyState.property?.amenity_list[0].icon_url}
                className=""
                alt=""
              />
            )}
          </div>
          <div className="ametitiesDetails">
            <div className="amtfirst">
              <p>
                <span>Available from:</span>{" "}
                {propertyState.property?.available_from || "-"}
              </p>
              <p>
                <span>Furnishing Type:</span>{" "}
                {propertyState.property?.furnishing_type || "-"}
              </p>
              <p>
                <span>Gender:</span> {propertyState.property?.gender || "-"}
              </p>
            </div>
            <div className="amtTwo">
              <p>
                <span>House Type:</span>{" "}
                {propertyState.property?.house_type || "-"}
              </p>
              <p>
                <span>BHK:</span> {propertyState.property?.bhk_details || "-"}
              </p>
              <p>
                <span>Sharing:</span> {propertyState.property?.shared || "-"}
              </p>
            </div>
          </div>

          <div className="descriptionDetails">
            <p>
              <span>Pg:</span>{" "}
              {propertyState.property?.mdescriptions?.pg || "-"}
            </p>
            <p>
              <span>House:</span>{" "}
              {propertyState.property?.mdescriptions?.house || "-"}
            </p>
          </div>
        </div>
        <div className="book-container-whole">
          <h2>Visit the house</h2>
          <img src={House} alt="House" />
          <p className="tour">FREE Guided Tour</p>
          <p className="executive">with our executive</p>
          <div className="btnDetails">
            {propertyState.property && (
              <div>
                {propertyState.isPropertyBooked ? (
                  <p className="booked">This property is already booked.</p>
                ) : (
                  <div>
                    {propertyState.successMessage && (
                      <p className="success">
                        {propertyState.successMessage}
                      </p>
                    )}
                    <button
                      className="btn first"
                      onClick={openDialog}
                      disabled={propertyState.isPropertyBooked}
                    >
                      {propertyState.isPropertyBooked
                        ? "Already Booked"
                        : "Book Now"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {propertyState.isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <span className="close-button" onClick={closeDialog}>
              &times;
            </span>
            <h2>Book Property</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={propertyState.formData.name}
                  onChange={handleInputChange}
                />
                {propertyState.formErrors.name && (
                  <div className="error">{propertyState.formErrors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact Number:</label>
                <input
                  type="number"
                  id="contact"
                  name="contact"
                  value={propertyState.formData.contact}
                  onChange={handleInputChange}
                />
                {propertyState.formErrors.contact && (
                  <div className="error">
                    {propertyState.formErrors.contact}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dates">Booking Dates:</label>
                <DatePicker
                  id="dates"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
                {propertyState.formErrors.dates && (
                  <div className="error">
                    {propertyState.formErrors.dates}
                  </div>
                )}
              </div>
              <div className="btnDetails">
                <button type="submit" className="btn first">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyDetails;
