import React from "react";
import "./sidemenu.css";
import { useDispatch } from "react-redux";
import { handleModal } from "../../slices/fontSetting";

const SideMenu = ({ name, body }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1>{name}</h1>
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
