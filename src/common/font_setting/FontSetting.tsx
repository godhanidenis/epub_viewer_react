import React, { useEffect, useMemo, useState } from "react";
import "./fontSetting.css";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { updateBookStyle } from "../../slices/fontSetting";

const Option = () => {
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

  const handleChange = (event) => {
    const font = event.target.value;
    setFontFamily(font);
  };

  return (
    <div className="fontSetting">
      <div className="fontFamily">
        <h3>Font Family</h3>
        <div className="fontSelector">
          <select
            className="fontSelectorDropdown"
            value={fontFamily}
            onChange={handleChange}
          >
            {["Original", "Roboto"].map((font, id) => (
              <option key={id} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="fontSize">
        <h3>Font Size</h3>
        <input
          type="range"
          min="10"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
      </div>
      <div className="lineHeight">
        <h3>Line Height</h3>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
        />
      </div>
      <div className="marginHorizontal">
        <h3>Margin Horizontal</h3>
        <input
          type="range"
          min="10"
          max="30"
          value={marginHorizontal}
          onChange={(e) => setMarginHorizontal(e.target.value)}
        />
      </div>
      <div className="marginVertical">
        <h3>Margin Vertical</h3>
        <input
          type="range"
          min="10"
          max="30"
          value={marginVertical}
          onChange={(e) => setMarginVertical(e.target.value)}
        />
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
