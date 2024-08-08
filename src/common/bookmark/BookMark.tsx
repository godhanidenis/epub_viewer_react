import "./bookmark.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SideMenu from "../side_menu/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { cfiRangeSpliter } from "../../utils/commonUtil";
import { RefContext } from "../../App";
import NoteServices from "../../services/NoteServices";
import { addNoteContent, removeNoteContent } from "../../slices/book";
import { toast } from "react-toastify";
import LoadingView from "../../components/pdf_viewer/LoadingView";
import { bookId, userId } from "../../components/pdf_viewer/PdfViewer";

function hexToRgba(hex, alpha = 1) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Highlight = () => {
  const highlights = useSelector((state: any) => state.book.highlights);
  const bookMarkLoading = useSelector(
    (state: any) => state.fontSetting.bookMarkLoading
  );
  const viewerRef = useContext(RefContext);
  const dispatch = useDispatch();
  const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;
  const [noteLoading, setnoteLoading] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [bookMarkId, setBookMarkId] = useState(null);
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

  const handleSaveNote = (e, bookMarkId) => {
    setBookMarkId(bookMarkId);
    e.stopPropagation();
    const notesData = {
      note_id: bookMarkId,
      note_content: notes[bookMarkId],
    };
    const saveNote = async () => {
      setnoteLoading(true);
      try {
        const responce = await NoteServices.saveNoteContent(notesData);
        if (responce.message !== "Record created successfully")
          return toast.error("Opps ! Note could not be saved.");
        const noteData = responce.notes;
        dispatch(addNoteContent({ bookMarkId, noteData }));
        toast.success("Your note has been saved successfully.");
        const newNotes = [...notes];
        newNotes[bookMarkId] = "";
        setNotes(newNotes);
        setnoteLoading(false);
      } catch (error) {
        console.error("error in saving note", error);
        setnoteLoading(false);
      } finally {
        setnoteLoading(false);
      }
      setBookMarkId(null);
    };
    if (bookId && userId) {
      saveNote();
    }
  };

  const handleDeleteNote = (contentId) => {
    setNoteId(contentId);
    const removeNote = async () => {
      setnoteLoading(true);
      try {
        const responce = await NoteServices.deleteNoteContent(contentId);
        if (responce.message !== "remove successfully")
          return toast.error("Opps ! Note could not be deleted.");
        dispatch(removeNoteContent(contentId));
        toast.success("Note Deleted Successfully.");
        setnoteLoading(false);
      } catch (error) {
        console.error("error in removeing note", error);
        setnoteLoading(false);
      } finally {
        setnoteLoading(false);
      }
      setNoteId(null);
    };
    if (bookId && userId) {
      removeNote();
    }
  };

  return (
    <>
      {highlights && highlights.length > 0 ? (
        <>
          {bookMarkLoading && (
            <>
              <div className="loading-view">
                <LoadingView />
              </div>
            </>
          )}
          <div className="outer-bookmark">
            {highlights.map((highlight, id) => (
              <>
                <div
                  className="bookmark"
                  key={highlight.id}
                  onClick={() => handleId(highlight.cfiRange)}
                >
                  <div className="bookmark-header">
                    <p className="show-page">
                      Bookmark - Show Page {highlight.pageNum}
                    </p>
                  </div>
                  <div className="bookmark-content">
                    <p className="selected-text">{highlight.content}</p>
                    {userId &&
                      highlight.note_content.map((note) => (
                        <div
                          key={note.id}
                          className="note"
                          style={{
                            backgroundColor: hexToRgba(highlight.color, 0.1),
                          }}
                        >
                          <span className="note-text">
                            {note.note_content}
                            <span className="note-date">
                              Created at {formatDate(note.createTime)}
                            </span>
                          </span>
                          {noteId === note.id && noteLoading ? (
                            <img
                              src="/media/epub_viewer_v1/img/loading.svg"
                              alt="Loading..."
                              className="note-save"
                            />
                          ) : (
                            <img
                              src="/media/epub_viewer_v1/img/delete.svg"
                              alt="delete"
                              className="delete-img"
                              onClick={() => handleDeleteNote(note.id)}
                            />
                          )}
                        </div>
                      ))}
                    {userId && (
                      <div className="note-input">
                        <input
                          type="text"
                          placeholder="Add a note..."
                          value={notes[highlight.id]}
                          onChange={(event) =>
                            handleNoteChange(event, userId ? highlight.id : id)
                          }
                          className="note-input-field"
                        />
                        <span className="note-divider"></span>
                        <button
                          className="note-input-button"
                          onClick={(e) => handleSaveNote(e, highlight.id)}
                        >
                          {bookMarkId === highlight.id && noteLoading ? (
                            <img
                              src="/media/epub_viewer_v1/img/loading.svg"
                              alt="Loading..."
                              className="note-save"
                            />
                          ) : (
                            <img
                              src={`${MEDIA_BASE_URL}/notesave.svg`}
                              alt="save"
                              className="note-save"
                            />
                          )}
                        </button>
                      </div>
                    )}
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
      ) : (
        <div className="no-bookmark">No Bookmarks</div>
      )}
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
