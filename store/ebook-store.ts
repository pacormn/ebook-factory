import { create } from "zustand";

type Chapter = {
  id: string;
  title: string;
  content?: string;
};

type EbookState = {
  title: string;
  description: string;
  chapters: Chapter[];

  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setChapters: (chapters: Chapter[]) => void;
};

export const useEbookStore = create<EbookState>((set) => ({
  title: "",
  description: "",
  chapters: [],

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setChapters: (chapters) => set({ chapters }),
}));
