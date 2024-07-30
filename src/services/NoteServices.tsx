let token = localStorage.getItem("token") || '';
//token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM5NTczMDM2LCJqdGkiOiI3MzYwMTRjYzIzNGE0NjY0YmY4Y2QwNDhmN2NlN2E0ZiIsInVzZXJfaWQiOjd9.7MIjsAhxZcFV1kBCEYT7nhF2tnNeg6Qiu4DJKWIQ3I8"

//get all notes on the basis of bookId
const getAllNotes = async (bookId: any) => {

    let response = await fetch(`${process.env.REACT_APP_NOTE_URL}?book_id=${bookId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    let res = await response.json();
    return res;
}

//save note on the basis of bookId & userToken
const saveNote = async (data: any) => {
    const { note_id, note_content, book_id, accessTime, cfiRange, chpaterName, color, content, createTime, key, pageNum, paragraphCfi } = data;
    let response = await fetch(`${process.env.REACT_APP_NOTE_URL}`, {
        method: 'POST',
        body: JSON.stringify({
            note_id, note_content, book_id, accessTime,
            cfiRange, chpaterName, color, content,
            createTime, key, pageNum, paragraphCfi
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    let res = await response.json();
    return res;
}

//delete note on the basis of noteId
const deleteNote = async (noteId: any) => {
    let response = await fetch(`${process.env.REACT_APP_NOTE_URL}?note_id=${noteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    let res = await response.json();
    return res;
}

const prepareNoteBeforeSave = (bookId: any, highlight: { key: any; accessTime: any; cfiRange: any; chpaterName: any; color: any; content: any; pageNum: any; paragraphCfi: any; }, note_content: any) => {
    let savingNote = {
        "note_id": highlight.key,
        "note_content": note_content,
        "book_id": bookId,
        "accessTime": highlight.accessTime,
        "cfiRange": highlight.cfiRange,
        "chpaterName": highlight.chpaterName,
        "color": highlight.color,
        "content": highlight.content,
        "createTime": new Date().toISOString(),
        "key": highlight.key,
        "pageNum": highlight.pageNum,
        "paragraphCfi": highlight.paragraphCfi
    }

    return savingNote;
}

const NoteServices = {
    getAllNotes,
    prepareNoteBeforeSave,
    saveNote,
    deleteNote,
};

export default NoteServices;