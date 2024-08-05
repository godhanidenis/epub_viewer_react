import React from "react";
import "./sidemenu.css";
import { useDispatch } from "react-redux";
import { handleModal } from "../../slices/fontSetting";

const SideMenu = ({ name, body }: any) => {
  const dispatch = useDispatch();
  const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;
  return (
    <div className="popup" key={name}>
      <div className="popup_inner">
        <span className="title">{name}</span>
        <img
          src={`${MEDIA_BASE_URL}/close.svg`}
          alt="close"
          height={26}
          width={26}
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(handleModal(name))}
        />
      </div>
      {body()}
    </div>
  );
};

export default SideMenu;
