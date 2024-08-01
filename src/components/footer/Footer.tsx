import { useSelector } from "react-redux";
import "./footer.css";
import React from "react";

const Footer = () => {
  const { totalPage, currentPage } = useSelector(
    (state: any) => state.book.currentLocation
  );
  const percent = Number(((currentPage / totalPage) * 100).toFixed(0));

  return (
    <>
      <div className="progress-container">
        <div className="progress-layer"></div>
        <div
          className="progress-bar"
          style={{ width: `${isNaN(percent) ? 0 : percent}%` }}
        ></div>
      </div>
      <span className="progress-text">
        {isNaN(percent) ? 0 : percent}% - Location - {currentPage} of{" "}
        {totalPage}
      </span>
    </>
  );
};

export default Footer;
