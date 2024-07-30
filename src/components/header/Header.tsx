import "./Header.css";
import HederButton from "../../common/header_button/HederButton";
import { useDispatch, useSelector } from "react-redux";
import { handleModal, updateBookOption } from "../../slices/fontSetting";

const Header = ({ fullScreenToggler }: any) => {
  const dispatch = useDispatch();
  const bookOption = useSelector((state: any) => state.fontSetting.bookOption);

  // OPEN MODEL COROSPONDING TO THE HEADER BUTTON
  const toggleModel = (name) => {
    dispatch(handleModal(name));
  };

  // BOOK VIEW - MULTIVIEW | SINGLE VIEW
  const handleMultiView = () => {
    const flow = bookOption.flow === "paginated" ? "scrolled-doc" : "paginated";
    dispatch(updateBookOption(flow));
  };

  return (
    <div className="container">
      <div className="left-section">
        {/* <CustomTitle title="Back to Library" onClick={() => goToLib()} /> */}
        <HederButton
          name="refresh"
          icon="fa fa-refresh lg"
          onClick={() => window.location.reload()}
        />
        <HederButton
          name="fontSize"
          icon="fa fa-font lg"
          onClick={() => toggleModel("fontsetting")}
        />
        <HederButton
          name="fullscreen"
          icon="fa fa-arrows-alt lg"
          onClick={() => fullScreenToggler()}
        />
        {/* <HederButton name="search" icon="fa-window-maximize lg" onClick={() => spreadOption()} /> */}
        <HederButton
          name="multiview"
          icon="fa fa-columns lg"
          onClick={() => handleMultiView()}
        />
      </div>
      <div className="right-section">
        <HederButton
          name="bookmark"
          icon="fa fa-bookmark lg"
          onClick={() => toggleModel("bookmark")}
        />
        <HederButton
          name="show notebook"
          icon="fa fa-bookmark lg"
          onClick={() => toggleModel("content")}
        />
      </div>
    </div>
  );
};

export default Header;
