import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create A New Note",
  description:
    "Create a new note in NoteHub - Smart Note Management Application.",
  openGraph: {
    title: "Create A New Note",
    description:
      "Organize your thoughts, tasks, and ideas in one place. NoteHub helps you create, filter, and manage your personal and work notes effectively with modern speed.",
    url: "https://08-zustand-one-azure.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Create A New Note",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
