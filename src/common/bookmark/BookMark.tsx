import "./bookmark.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { cfiRangeSpliter } from "../../utils/commonUtil";
import { RefContext } from "../../App";

function hexToRgba(hex, alpha = 1) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Highlight = () => {
  const highlights = useSelector((state: any) => state.book.highlights);
  const { currentLocation } = useSelector((state: any) => state.book);
  const viewerRef = useContext(RefContext);
  const [notes, setNotes] = useState<string[]>(
    Array(highlights.length).fill("")
  );

  const handleNoteChange = (event, index) => {
    const newNotes = [...notes];
    newNotes[index] = event.target.value;
    setNotes(newNotes);
  };

  const handleId = (range) => {
    const splitCfi = cfiRangeSpliter(range);
    if (!splitCfi) return;
    const { startCfi } = splitCfi;
    viewerRef.current.setLocation(startCfi);
  };

  return (
    <>
      <div className="outer-bookmark">
        {highlights.map((highlight, id) => (
          <>
            <div
              className="bookmark"
              key={id}
              onClick={() => handleId(highlight.cfiRange)}
            >
              <div className="bookmark-header">
                <p className="show-page">
                  Bookmark - Show Page {highlight.pageNum}
                </p>
              </div>
              <div className="bookmark-content">
                <p className="selected-text">{highlight.content}</p>
                {/* <div className="note-input">
                  <input
                    type="text"
                    placeholder="Add a note..."
                    value={notes[id]}
                    onChange={(event) => handleNoteChange(event, id)}
                    className="note-input-field"
                  />
                  <span className="note-divider"></span>
                  <button className="note-input-button">
                    <img
                      src="/img/notesave.svg"
                      alt="save"
                      className="note-save"
                    />
                  </button>
                </div> */}
              </div>
              <div
                style={{
                  backgroundColor: hexToRgba(highlight.color, 0.3),
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  borderRadius: "10px",
                  zIndex: -5,
                }}
              ></div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

const BookMark = () => {
  const { bookmark } = useSelector((state: any) => state.fontSetting.model);

  return (
    <>
      {bookmark && (
        <SideMenu name="Notes and Bookmarks" body={Highlight}></SideMenu>
      )}
    </>
  );
};

export default BookMark;
