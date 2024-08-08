import React, { createContext, useRef, useEffect } from "react";
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

const App = () => {
  const fullScreenHandle = useFullScreenHandle();
  const fullScreenDivRef = useRef(null);

  useEffect(() => {
    fullScreenHandle.node.current = fullScreenDivRef.current;
  }, [fullScreenHandle]);

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
      <FullScreen handle={fullScreenHandle} />
      <div ref={fullScreenDivRef}>
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
      </div>
    </>
  );
};

export default App;
const RefContext = createContext(null);
export { RefContext };
