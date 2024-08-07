import "./pdfViewer.css";
import { useState, useEffect, useContext } from "react";
import { ReactEpubViewer } from "react-epub-viewer";
import { useDispatch, useSelector } from "react-redux";
import {
  getHighlight,
  pushHighlight,
  updateBook,
  updateCurrentPage,
  updateToc,
} from "../../slices/book";
import ContextMenu from "../contex-menu/ContextMenu";
import useHighlight from "../../hooks/useHighlight";
import { RefContext } from "../../App";
import LoadingView from "./LoadingView";
import NoteServices from "../../services/NoteServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const viewerLayout = {
  MIN_VIEWER_WIDTH: 300,
  MIN_VIEWER_HEIGHT: 300,
  VIEWER_HEADER_HEIGHT: 50,
  VIEWER_FOOTER_HEIGHT: 50,
  VIEWER_SIDEMENU_WIDTH: 0,
};
export const contextmenuWidth = 160;

const PdfViewer = () => {
  const viewerRef = useContext(RefContext);
  const dispatch = useDispatch();
  const { bookStyle, bookOption } = useSelector(
    (state: any) => state.fontSetting
  );
  const [isContextMenu, setIsContextMenu] = useState(false);
  const {
    selection,
    onSelection,
    onClickHighlight,
    onAddHighlight,
    onRemoveHighlight,
    onUpdateHighlight,
  } = useHighlight(viewerRef, setIsContextMenu, bookStyle, bookOption.flow);

  const onContextmMenuRemove = () => {
    setIsContextMenu(false);
  };

  // CHANGE PAGE LOGIC
  const onPageMove = (type: any) => {
    const node: any = viewerRef.current;
    if (!node || !node.prevPage || !node.nextPage) return;
    type === "PREV" && node.prevPage();
    type === "NEXT" && node.nextPage();
  };

  // CALLBACK FIRED WHEN PAGE && BOOK INFORMATION && TABLE OF CONTENT IS CHANGED TO UPDATE STORE
  const onPageChange = (page: any) => dispatch(updateCurrentPage(page));
  const onBookInfoChange = (book: any) => dispatch(updateBook(book));
  const onTocChange = (toc: any) => dispatch(updateToc(toc));
  const onContextMenu = (cfiRange: string) => {
    const result = onSelection(cfiRange);
    setIsContextMenu(result);
  };

  const queryParams = new URLSearchParams(window.location.search);
  const bookId = queryParams.get("id") || "";
  const userId = queryParams.get("user") || "";

  if (bookId || userId) {
    window.localStorage.setItem("bookId", bookId);
    window.localStorage.setItem("userId", userId);
  }

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [EPUB_URL, setUrl] = useState("");

  const URL = `${BASE_URL}/api/book-detail/${bookId}/?format=json`;

  const loadFile = async () => {
    //console.log("fetching file..");
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + "",
      },
    });
    const res = await response.json();
    setUrl(`${BASE_URL}${res.library.epub_file}`);

    // setLoading(false);

    // setDocumnetType("epub");

    // let ext = getUrlExtension(EPUB_URL);
    //console.log(ext);

    // switch (ext) {
    //   case "pdf":
    //     setDocumnetType("pdf");
    //     break;
    //   case "epub":
    //     setDocumnetType("epub");
    //     break;
    // }
    // setUrl(EPUB_URL);
  };

  useEffect(() => {
    const loadAllHighlights = async () => {
      try {
        const allHighlight = await NoteServices.getAllNotes();
        dispatch(getHighlight(allHighlight.notes));
      } catch (error) {
        console.error("Error loading highlights:", error);
      }
    };
    if (bookId && userId) {
      loadAllHighlights();
    }
    loadFile();
  }, []);

  const viewerElement = viewerRef.current;
  if (viewerElement && viewerElement.children.length >= 2) {
    viewerElement.removeChild(viewerElement.children[0]);
  }

  return (
    <>
      <div className="prevBtn navBtn" onClick={() => onPageMove("PREV")}>
        &lt;
      </div>
      <div className="eBook_outer">
        <ReactEpubViewer
          url={EPUB_URL}
          onPageChange={onPageChange}
          viewerLayout={viewerLayout}
          viewerStyle={bookStyle}
          viewerOption={bookOption}
          onBookInfoChange={onBookInfoChange}
          onTocChange={onTocChange}
          onSelection={onContextMenu}
          loadingView={<LoadingView />}
          ref={viewerRef}
        />
      </div>
      <div className="nextBtn navBtn" onClick={() => onPageMove("NEXT")}>
        &gt;
      </div>

      <ContextMenu
        active={isContextMenu}
        viewerRef={viewerRef}
        selection={selection}
        onAddHighlight={onAddHighlight}
        onRemoveHighlight={onRemoveHighlight}
        onUpdateHighlight={onUpdateHighlight}
        onContextmMenuRemove={onContextmMenuRemove}
      />

      <ToastContainer
        position="top-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default PdfViewer;
