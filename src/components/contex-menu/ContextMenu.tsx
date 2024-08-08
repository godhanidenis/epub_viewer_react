import React, { useContext, useMemo } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// components
import Wrapper from "../../common/contextMenu/Wrapper";
import ColorItem from "../../common/contextMenu/ColorItem";
import Item from "../../common/contextMenu/Item";
// utils
import { getParagraphCfi } from "../../utils/commonUtil";
// slices
import { contextmenuWidth } from "../pdf_viewer/PdfViewer";
// types
import Highlight, { Color } from "../../types/highlight";
import Selection from "../../types/selection";
import { RootState } from "../../slices";
import NoteServices from "../../services/NoteServices";
import { getHighlight } from "../../slices/book";
import { toast } from "react-toastify";
import { bookId, userId } from "../pdf_viewer/PdfViewer";
import { changeLoadingState } from "../../slices/fontSetting";

const ContextMenu = ({
  active,
  viewerRef,
  selection,
  onAddHighlight,
  onRemoveHighlight,
  onUpdateHighlight,
  onContextmMenuRemove,
}: Props) => {
  const highlights = useSelector<RootState, Highlight[]>(
    (state) => state.book.highlights
  );

  const colorList = useSelector<RootState, Color[]>(
    (state) => state.book.colorList
  );

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [highlight, setHighlight] = useState<Highlight | null>(null);

  const [display, setDisplay] = useState<boolean>(false);
  const [isEraseBtn, setIsEraseBtn] = useState<boolean>(false);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [apiCall, setApiCall] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [y, setY] = useState<number>(selection.y);
  const dispatch = useDispatch();

  const ColorList = colorList.map((color) => (
    <ColorItem
      key={color.code}
      name={color.name}
      color={color.code}
      onClick={
        selection.update
          ? () => onUpdateHighlight(highlight, color.code)
          : () => onAddHighlight(color.code)
      }
    />
  ));

  /** Remove highlight */
  const onRemoveHighlight_ = useCallback(() => {
    if (!highlight) return;

    onRemoveHighlight(highlight.key, highlight.cfiRange);
    onContextmMenuRemove();
    setIsEraseBtn(false);

    const removeBookMark = async () => {
      dispatch(changeLoadingState(true));
      try {
        const response = await NoteServices.deleteNote(highlight.id);
        if (response.message !== "all records fetched successfully")
          return toast.error("Opps ! Highlight could not be removed.");
        dispatch(getHighlight(response.notes));
        toast.success("Your Highlight has been removed successfully.");
        dispatch(changeLoadingState(false));
      } catch (error) {
        console.error("Error Remove highlights:", error);
        dispatch(changeLoadingState(false));
      } finally {
        dispatch(changeLoadingState(false));
      }
    };
    if (bookId && userId) {
      removeBookMark();
    }
  }, [highlight, onRemoveHighlight, onContextmMenuRemove]);

  /**
   * Remove contextmenu
   * @param e Mouse Event
   * @param e.path
   */
  const onRemove = useCallback(
    (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onContextmMenuRemove();
        setApiCall(true);
      }
    },
    [menuRef, onContextmMenuRemove]
  );

  useEffect(() => {
    const saveBookmark = async () => {
      dispatch(changeLoadingState(true));
      const bookMark = { ...highlight };
      delete bookMark.note_content;
      try {
        const response = await NoteServices.saveNote(bookMark);
        if (response.message !== "all records fetched successfully")
          return toast.error("Opps ! Highlight could not be saved.");
        dispatch(getHighlight(response.notes));
        toast.success("Your Highlight has been saved successfully.");
        dispatch(changeLoadingState(false));
      } catch (error) {
        console.error("Error saving note:", error);
        dispatch(changeLoadingState(false));
      } finally {
        dispatch(changeLoadingState(false));
      }
    };

    if (apiCall && !display && bookId && userId) {
      saveBookmark();
      setApiCall(false);
      setDisplay(false);
    }
  }, [apiCall, display]);

  /**
   * Arrow event
   * @param e Keyboard Event
   * @param e.key
   */
  const onKeyPress = useCallback(
    ({ key }: any) => {
      key && key === "ArrowLeft" && onContextmMenuRemove();
      key && key === "ArrowRight" && onContextmMenuRemove();
    },
    [onContextmMenuRemove]
  );

  /** Check whether the menu button is visible */
  useEffect(() => {
    if (!active) setIsEraseBtn(false);

    const paragraphCfi = getParagraphCfi(selection.cfiRange);
    if (!paragraphCfi) return;

    const filtered = highlights.filter(
      (highlight) => highlight.key === paragraphCfi + selection.cfiRange
    );

    if (!filtered.length) return;
    const highlight_ = filtered[0];
    setHighlight(highlight_);

    if (selection.update) {
      setIsEraseBtn(true);
    } else {
      setIsEraseBtn(false);
    }
  }, [active, highlights, selection.cfiRange, selection.update]);

  /** Register contextmenu events */
  useEffect(() => {
    if (!viewerRef.current) return;

    const iframe = document.querySelector("iframe");
    const node =
      iframe && iframe.contentWindow && iframe.contentWindow.document;
    const scrolledTarget = viewerRef.current.querySelector("div");

    if (active) {
      setDisplay(true);
      scrolledTarget &&
        scrolledTarget.addEventListener("scroll", onContextmMenuRemove);
      node && node.addEventListener("mousedown", onRemove);
      node && node.addEventListener("keyup", onKeyPress);
      document.addEventListener("mousedown", onRemove);
      document.addEventListener("keyup", onKeyPress);
    } else {
      setDisplay(false);
      scrolledTarget &&
        scrolledTarget.removeEventListener("scroll", onContextmMenuRemove);
      node && node.removeEventListener("mousedown", onRemove);
      node && node.removeEventListener("keyup", onKeyPress);
      document.removeEventListener("mousedown", onRemove);
      document.removeEventListener("keyup", onKeyPress);
    }

    return () => {
      node && node.removeEventListener("mousedown", onContextmMenuRemove);
      node && node.removeEventListener("keyup", onKeyPress);
      document.removeEventListener("keyup", onKeyPress);
    };
  }, [viewerRef, active, onRemove, onContextmMenuRemove, onKeyPress]);

  /** Set modified contextmenu height & whether menu is reverse */
  useEffect(() => {
    const menuPadding = 8;
    const itemHeight = 32;
    let itemCnt = ColorList.length;

    if (isEraseBtn) itemCnt += 1;

    const defaultHeight = itemCnt * itemHeight + menuPadding;
    let y_ = selection.y;
    const { innerHeight } = window;

    if (selection.y + defaultHeight > innerHeight) {
      y_ = selection.y - selection.height - defaultHeight;
      if (y_ < 0) {
        setHeight(defaultHeight + y_ - 8);
        y_ = 8;
      } else {
        setHeight(defaultHeight);
      }
      setIsReverse(true);
    } else {
      setHeight(defaultHeight);
      setIsReverse(false);
    }

    setY(y_);
  }, [selection.y, selection.height, ColorList, isEraseBtn, setHeight]);

  return (
    <>
      {display && (
        <Wrapper
          x={selection.x}
          y={y}
          width={contextmenuWidth}
          height={height}
          isReverse={isReverse}
          ref={menuRef}
        >
          <div>
            {ColorList}
            {isEraseBtn && <Item text="Remove" onClick={onRemoveHighlight_} />}
          </div>
        </Wrapper>
      )}
    </>
  );
};

interface Props {
  active: boolean;
  viewerRef: any;
  selection: Selection;
  onAddHighlight: (color: string) => void;
  onRemoveHighlight: (key: string, cfiRange: string) => void;
  onUpdateHighlight: (highlight: Highlight | null, color: string) => void;
  onContextmMenuRemove: () => void;
}

export default ContextMenu;
