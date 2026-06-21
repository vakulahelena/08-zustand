"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes(searchQuery, currentPage, tag as NoteTag | undefined),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log("DATA:", data);
  console.log("ERROR:", isError);
  console.log("LOADING:", isLoading);
  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal}></NoteForm>
        </Modal>
      )}
      {isLoading && <Loader />}
      {isError && <p>Помилка завантаження нотаток</p>}
      <Toaster position="top-center" />
    </div>
  );
};
export default NotesClient;
