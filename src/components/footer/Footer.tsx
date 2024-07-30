import { useSelector } from "react-redux";
import "./footer.css";
import React from "react";

const Footer = () => {
  const { totalPage, currentPage } = useSelector(
    (state: any) => state.book.currentLocation
  );
  const percent = ((currentPage / totalPage) * 100).toFixed(0);

  return (
    <div className="progress-container">
      <div className="progress-layer"></div>
      <div className="progress-bar" style={{ width: `${percent}%` }}></div>
      <span>
        {percent}% - Location - {currentPage} of {totalPage}
      </span>
    </div>
  );
};

export default Footer;
