import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, connect,useSelector } from "react-redux";
import { bookProperty } from '../../actions/bookingActions';

import "./style.css";
import "../propertyList/style.css";
import House from "../../assets/guided-tour.png";

const mapStateToProps = (state) => {
  console.log(state.properties)

  return {
    // properties: state.properties,
  };
};

function PropertyDetails() {
  const { id } = useParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dates: null, // Initialize dates as null
    contact: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: null,
  });

  const dispatch = useDispatch();
  const property = useSelector((state) =>
    state.propertyReducer.properties.find((prop) => prop.id === id)
  );

  if (!property) {
    return <p>Property not found</p>;
  }

  const containerStyle = {
    padding: "20px",
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!isValidContactNumber(formData.contact)) {
      errors.contact = "Invalid contact number format";
    }

    if (!formData.dates) {
      errors.dates = "Booking Date is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Include the selected date in the formData
      formData.dates = selectedDate;
  
      // Dispatch the bookProperty action with property ID and formData
     dispatch(bookProperty(property.id, formData))
       .then(() => {
         setSubmissionStatus({
           success: true,
           error: null,
         });
         setTimeout(() => {
           closeDialog();
         }, 2000);
       })
       .catch((error) => {
         setSubmissionStatus({
           success: false,
           error: "Booking failed. Please try again later.",
         });
       });
    }
  };
  

  const isValidContactNumber = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  return (
    <>
      <div className="centered-container">
        <div style={containerStyle} className="property_details">
          <h2>Property Details</h2>

          <p style={{ paddingTop: "15px" }}>
            <span>Description:</span>{" "}
            {property.description.short_description || "-"}
          </p>
          <p style={{ paddingTop: "15px" }}>
            <span>Amenities: </span>
            {property.amenity_list.length > 0
              ? property.amenity_list[0].amenity
              : "-"}
          </p>
          <div className="amtImg">
            {property.amenity_list.length > 0 && (
              <img
                src={property.amenity_list[0].icon_url}
                className=""
                alt=""
              />
            )}
          </div>
          <div className="ametitiesDetails">
            <div className="amtfirst">
              <p>
                <span>Available from:</span> {property.available_from || "-"}
              </p>
              <p>
                <span>Furnishing Type:</span>{" "}
                {property.furnishing_type || "-"}
              </p>
              <p>
                <span>Gender:</span> {property.gender || "-"}
              </p>
            </div>
            <div className="amtTwo">
              <p>
                <span>House Type:</span> {property.house_type || "-"}
              </p>
              <p>
                <span>BHK:</span> {property.bhk_details || "-"}
              </p>
              <p>
                <span>Sharing:</span> {property.shared || "-"}
              </p>
            </div>
          </div>

          <div className="descriptionDetails">
            <p>
              <span>Pg:</span>{" "}
              {property.mdescription ? property.mdescriptions.pg : "-"}
            </p>
            <p>
              <span>House:</span>{" "}
              {property.mdescription ? property.mdescriptions.house : "-"}
            </p>
          </div>
        </div>
        <div className="book-container-whole">
          <h1>Visit the house</h1>
          <img src={House} alt="House" />
          <p className="tour">FREE Guided Tour</p>
          <p className="executive">with our executive</p>
          <div className="btnDetails">
            <button className="btn first" onClick={openDialog}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
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
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && (
                  <div className="error">{formErrors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact Number:</label>
                <input
                  type="number"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
                {formErrors.contact && (
                  <div className="error">{formErrors.contact}</div>
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
                {formErrors.dates && (
                  <div className="error">{formErrors.dates}</div>
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
      {submissionStatus.success && (
        <div className="success-message">Booking successful!</div>
      )}

      {submissionStatus.error && (
        <div className="error-message">{submissionStatus.error}</div>
      )}
    </>
  );
}

export default connect(mapStateToProps)(PropertyDetails);
