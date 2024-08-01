import "./pdfViewer.css";
import { useState, useEffect, useContext } from "react";
import { ReactEpubViewer } from "react-epub-viewer";
import { useDispatch, useSelector } from "react-redux";
import { updateBook, updateCurrentPage, updateToc } from "../../slices/book";
import ContextMenu from "../contex-menu/ContextMenu";
import useHighlight from "../../hooks/useHighlight";
import { RefContext } from "../../App";
import LoadingView from "./LoadingView";

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

  const onContextmMenuRemove = () => setIsContextMenu(false);

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
  const id = queryParams.get("id") || "";

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [EPUB_URL, setUrl] = useState("");

  const URL = `${BASE_URL}/api/book-detail/${id}/?format=json`;

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
    loadFile();
  }, []);

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
    </>
  );
};

export default PdfViewer;
