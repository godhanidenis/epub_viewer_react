import { bookId, userId } from "../components/pdf_viewer/PdfViewer";

const headers = {
  "Content-Type": "application/json",
};

//get all notes on the basis of bookId
const getAllNotes = async () => {
  if (!bookId && !userId) return;
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/saveNote/?book_id=${bookId}&user_id=${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const res = await response.json();
  return res;
};

//save note on the basis of bookId & userToken
const saveNote = async (data: any) => {
  if (!bookId && !userId) return;
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/saveNote/`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ ...data, user_id: userId, book_id: bookId }),
    }
  );
  let res = await response.json();
  return res;
};

// save pericular note
const saveNoteContent = async (data: any) => {
  if (!bookId && !userId) return;
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/saveNoteData/`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    }
  );
  let res = await response.json();
  return res;
};

// delete perticular note
const deleteNoteContent = async (contentId: any) => {
  if (!bookId && !userId) return;
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/saveNoteData/?id=${contentId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );
  let res = await response.json();
  return res;
};

//delete note on the basis of noteId
const deleteNote = async (bookMarkId: any) => {
  if (!bookId && !userId) return;
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/saveNote/?note_id=${bookMarkId}&user_id=${userId}&book_id=${bookId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );
  let res = await response.json();
  return res;
};

const NoteServices = {
  getAllNotes,
  saveNoteContent,
  deleteNoteContent,
  saveNote,
  deleteNote,
};

export default NoteServices;
