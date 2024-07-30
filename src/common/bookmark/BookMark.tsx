import "./bookmark.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { cfiRangeSpliter } from "../../utils/commonUtil";
import { RefContext } from "../../App";

const Highlight = () => {
  const highlights = useSelector((state: any) => state.book.highlights);
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
      {highlights.map((highlight, id) => (
        <>
          <div
            className="bookmark"
            key={id}
            onClick={() => handleId(highlight.cfiRange)}
          >
            <div className="bookmark-header">
              <h3>Bookmark - Show Page 0</h3>
            </div>
            <div className="bookmark-content">
              <p>{highlight.content}</p>
              <p>scs@sultanchandebooks.com...</p>
              <div className="note-input">
                <input
                  type="text"
                  placeholder="Add a note..."
                  value={notes[id]}
                  onChange={(event) => handleNoteChange(event, id)}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
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
