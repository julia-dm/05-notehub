
import axios from 'axios';
import type { NewNoteData, Note} from '../types/note';
import type { NotesResponse } from "../types/api";

axios.defaults.baseURL="https://notehub-public.goit.study/api"
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export const getNotes = async (search: string = "",
  page: number = 1,
  perPage: number = 12) : Promise<NotesResponse> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("perPage", perPage.toString());
  const res = await axios.get<NotesResponse>(`/notes?${params.toString()}`);
  
  return res.data; 
  
};
export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await axios.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};




