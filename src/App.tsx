import React, { createContext, useRef } from "react";
import { Provider } from "react-redux";
import Header from "./components/header/Header";
import PdfViewer from "./components/pdf_viewer/PdfViewer";
import store from "./slices";
import FontSetting from "./common/font_setting/FontSetting";
import BookMark from "./common/bookmark/BookMark";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useCallback } from "react";
import TableOfContent from "./common/toc/TableOfContent";
import Footer from "./components/footer/Footer";

function App() {
  const fullScreenHandle = useFullScreenHandle();

  const fullScreenToggler = useCallback(() => {
    if (fullScreenHandle.active) {
      fullScreenHandle.exit();
    } else {
      fullScreenHandle.enter();
    }
  }, [fullScreenHandle]);

  const viewerRef = useRef(null);

  return (
    <>
      {/* <FullScreen handle={fullScreenHandle}> */}
      <Provider store={store}>
        <RefContext.Provider value={viewerRef}>
          <Header fullScreenToggler={fullScreenToggler} />
          <Footer />
          <PdfViewer />
          <FontSetting />
          <BookMark />
          <TableOfContent />
        </RefContext.Provider>
      </Provider>
      {/* </FullScreen> */}
    </>
  );
}

export default App;
const RefContext = createContext(null);
export { RefContext };
