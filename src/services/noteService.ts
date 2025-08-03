
import axios from 'axios';
import type { NewNoteData, Note } from '../types/note';
import type { NoteUpdateData } from "../types/note";

axios.defaults.baseURL="https://notehub-public.goit.study/api"
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export const getNotes = async (search = "", page = 1, perPage = 12) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("perPage", perPage.toString());
  const res = await axios.get(`/notes?${params.toString()}`);

  return res.data; 
  
};

export const addNote= async (noteData:NewNoteData)=>{
    const res = await axios.post<Note>("/notes",noteData);
    return res.data
};

export const deleteNote = async (noteId: string) => {
    const res = await axios.delete<Note>(`/notes/${noteId}`);
    return res.data;
  };
  
  export const updateNote = async (noteData: NoteUpdateData) => {
    const res = await axios.put<Note>(`/notes/${noteData.id}`, noteData);
    return res.data;
  };

