import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { getNotes } from "../../services/noteService";

import css from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => getNotes(debouncedSearch, page,12),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearchChange={setSearch} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}

      {data && Array.isArray(data.notes) && data.notes.length > 0 && ( <NoteList notes={data.notes} />
)}

      {data && Array.isArray(data.results) && data.results.length === 0 && (
        <p className={css.empty}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal>
          <NoteForm onCloseModal={closeModal} resetPage={() => setPage(1)} />
        </Modal>
      )}
    </div>
  );
}