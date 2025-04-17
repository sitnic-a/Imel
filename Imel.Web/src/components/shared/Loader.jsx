import React from "react";
import imelLogo from "../../assets/images/Imel-NoBackground.png";

export const Loader = () => {
  return (
    <section id="loader">
      <div className="loading-box">
        <img src={imelLogo} className="imel-image" />
        <p>Loading...</p>
      </div>
    </section>
  );
};
