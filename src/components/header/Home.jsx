import React from "react";
import Icon from "../../assets/vaccinateHomeIcon.png";

function Home() {
  return (
    <>
      <div className="home-container">
       <div> <h1>Rent the smart way <br/> with Nestaway!</h1></div>
       <div> <img src={Icon} alt="" /></div>
      </div>
    </>
  );
}

export default Home;
