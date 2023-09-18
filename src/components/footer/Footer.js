import React from "react";
import { Link } from "react-router-dom";
import './style.css';

function Footer() {
  return (
    <>
    <section id="footer">
    <div class="main-footer">
      <div class="logoinfo" data-aos="fade-up">
        <div class="contact-details">
          <h1>Contact Us</h1>
          <li>
            <div class="fa fa-phone"></div><a href="tel:+919326048690">+91 098999099</a></li>
          <li>
            <div class="fa fa-envelope"></div><a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a></li>
      </div>
    </div>
    <div class="com " data-aos="fade-up">
      <h1>About</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>About</Link></li>
        <li><Link to='/'>Projects</Link></li>
        <li><Link to='/'>Contact</Link></li>
      </ul>
    </div>
    <div class="info" data-aos="fade-up">
      <h1>Social Media</h1>
      <div class="sociallogos">
        <div class="logobox">
          <Link to='/' class="fa fa-instagram"></Link>
          <Link to='/' class="fa fa-linkedin"></Link>
          <Link to='/' class="fa fa-facebook"></Link>
          <Link to='/' class="fa fa-youtube-play"></Link>
        </div>
      </div>
    </div>
    </div>
  <footer>© Your Copyright 2021 All Rights Reserved</footer>
  </section>
    </>
  );
}

export default Footer;
