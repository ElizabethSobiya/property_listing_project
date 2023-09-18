import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyList from '../src/components/propertyList/PropertyList';
import PropertyDetails from '../src/components/propertyDetails/PropertyDetails';
import { PropertyProvider } from '../src/propertyContext';
import Header from '../src/components/header/Header';
import './App.css';
import '../src/components/propertyDetails/style.css';
import '../src/components/propertyList/style.css';
import '../src/components/header/style.css';
import Footer from './components/footer/Footer';

function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </PropertyProvider>
  );
}

export default App;
