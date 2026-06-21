import { NewNoteBody } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: NewNoteBody;
  setDraft: (note: Partial<NewNoteBody>) => void;
  clearDraft: () => void;
}

const initialDraft: NewNoteBody = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
