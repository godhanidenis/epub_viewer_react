import "./Header.css";
import HederButton from "../../common/header_button/HederButton";
import { useDispatch, useSelector } from "react-redux";
import { handleModal, updateBookOption } from "../../slices/fontSetting";

const Header = ({ fullScreenToggler }: any) => {
  const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;
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
        <HederButton
          name="refresh"
          icon={`${MEDIA_BASE_URL}/Refresh.png`}
          onClick={() => window.location.reload()}
        />
        <HederButton
          name="fontSize"
          icon={`${MEDIA_BASE_URL}/Fontstyle.png`}
          onClick={() => toggleModel("fontsetting")}
        />
        <span className="divider"></span>
        <HederButton
          name="fullscreen"
          icon={`${MEDIA_BASE_URL}/zoomin.png`}
          onClick={() => fullScreenToggler()}
        />
        <span className="divider"></span>
        <HederButton
          name="multiview"
          icon={`${MEDIA_BASE_URL}/bookpreview.png`}
          onClick={() => handleMultiView()}
        />
      </div>
      <div className="right-section">
        <HederButton
          name="book mark"
          icon={`${MEDIA_BASE_URL}/wishlist.png`}
          onClick={() => toggleModel("bookmark")}
        />
        <HederButton
          name="show notebook"
          icon={false}
          onClick={() => toggleModel("content")}
        />
      </div>
    </div>
  );
};

export default Header;
