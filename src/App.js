import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyList from './components/propertyList/PropertyList';
import PropertyDetails from './components/propertyDetails/PropertyDetails';
import './App.css';
import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import { fetchProperties } from './actions/bookingActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log( 'app')
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header className="header" />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
