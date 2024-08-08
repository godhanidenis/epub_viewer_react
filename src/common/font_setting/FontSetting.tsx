import React, { useEffect, useState } from "react";
import "./fontSetting.css";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { updateBookStyle } from "../../slices/fontSetting";

const Option = () => {
  const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;
  const dispatch = useDispatch();
  const bookStyle = useSelector((state: any) => state.fontSetting.bookStyle);
  const [fontFamily, setFontFamily] = useState(bookStyle.fontFamily);
  const [fontSize, setFontSize] = useState(bookStyle.fontSize);
  const [lineHeight, setLineHeight] = useState(bookStyle.lineHeight);
  const [marginHorizontal, setMarginHorizontal] = useState(
    bookStyle.marginHorizontal
  );
  const [marginVertical, setMarginVertical] = useState(
    bookStyle.marginVertical
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setFontFamily(option);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(
      updateBookStyle({
        fontFamily,
        fontSize,
        lineHeight,
        marginHorizontal,
        marginVertical,
      })
    );
  }, [fontFamily, fontSize, lineHeight, marginHorizontal, marginVertical]);

  return (
    <div className="fontSetting">
      <p className="titel_text">Font</p>
      <div className="dropdown-container">
        <div
          className={`dropdown-selected ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          {fontFamily}
          <span className={`dropdown-arrow ${isOpen ? "up" : "down"}`}>
            <img src={`${MEDIA_BASE_URL}/down.svg`} alt="arrow" />
          </span>
        </div>
        {isOpen && (
          <ul className="option-list">
            {["Original", "Roboto"].map((font, id) => (
              <li
                key={id}
                className={`option ${
                  id === ["Original", "Roboto"].length - 1 ? "last-option" : ""
                }`}
                onClick={() => handleOptionClick(font)}
              >
                {font}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p className="titel_text">Size</p>
        <div className="fontSize">
          <span className="size">{fontSize}</span>
          <span className="sign">-</span>
          <input
            type="range"
            min="8"
            max="36"
            value={fontSize}
            className="range"
            onChange={(e) => setFontSize(e.target.value)}
          />
          <span className="sign">+</span>
        </div>
      </div>
      <div className="lineHeight">
        <p className="titel_text">Line Height</p>
        <div className="fontSize">
          <span className="size">{lineHeight}</span>
          <span className="sign">-</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={lineHeight}
            className="range"
            onChange={(e) => setLineHeight(e.target.value)}
          />
          <span className="sign">+</span>
        </div>
      </div>
      <div className="marginHorizontal">
        <p className="titel_text">Margin Horizontal</p>
        <div className="fontSize">
          <span className="size">{marginHorizontal}</span>
          <span className="sign">-</span>
          <input
            type="range"
            min="0"
            max="100"
            value={marginHorizontal}
            className="range"
            onChange={(e) => setMarginHorizontal(e.target.value)}
          />
          <span className="sign">+</span>
        </div>
      </div>
      <div className="marginVertical">
        <p className="titel_text">Margin Vertical</p>
        <div className="fontSize">
          <span className="size">{marginVertical}</span>
          <span className="sign">-</span>
          <input
            type="range"
            min="0"
            max="100"
            value={marginVertical}
            className="range"
            onChange={(e) => setMarginVertical(e.target.value)}
          />
          <span className="sign">+</span>
        </div>
      </div>
    </div>
  );
};

const FontSetting = () => {
  const { fontsetting } = useSelector((state: any) => state.fontSetting.model);
  return (
    <>
      {fontsetting && <SideMenu name="Fonts Settings" body={Option}></SideMenu>}
    </>
  );
};

export default FontSetting;
