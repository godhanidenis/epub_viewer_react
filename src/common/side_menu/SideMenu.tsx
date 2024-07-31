import React from "react";
import "./sidemenu.css";
import { useDispatch } from "react-redux";
import { handleModal } from "../../slices/fontSetting";

const SideMenu = ({ name, body }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="popup" key={name}>
      <div className="popup_inner">
        <span className="title">{name}</span>
        <img
          src={"/img/close.svg"}
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
