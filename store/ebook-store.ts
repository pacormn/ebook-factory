import { create } from "zustand";

// Types
export type Section = {
  id: string;
  title: string;
};

export type Chapter = {
  id: string;
  title: string;
  sections: Section[];
  content?: string; // Génération finale
};

type EbookState = {
  // --- Informations principales ---
  title: string;
  description: string;
  promise: string;
  goal: string;
  style: string;

  // --- Audience ---
  audience: string;
  audienceLevel: string;
  audienceProblem: string;

  // --- Structure ---
  chapters: Chapter[];

  // --- Longueur demandée ---
  length: string;

  // --- Preview & Full book ---
  preview: any | null;
  fullBook: any | null;

  // --- Setters ---
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setPromise: (v: string) => void;
  setGoal: (v: string) => void;
  setStyle: (v: string) => void;

  setAudience: (v: string) => void;
  setAudienceLevel: (v: string) => void;
  setAudienceProblem: (v: string) => void;

  setChapters: (chapters: Chapter[]) => void;
  setLength: (v: string) => void;

  setPreview: (data: any) => void;
  setFullBook: (data: any) => void;

  reset: () => void;
};

export const useEbookStore = create<EbookState>((set) => ({
  // --- Champs globaux ---
  title: "",
  description: "",
  promise: "",
  goal: "",
  style: "",

  // --- Audience ---
  audience: "",
  audienceLevel: "",
  audienceProblem: "",

  // --- Structure ---
  chapters: [],

  // --- Longueur ---
  length: "",

  // --- Preview / Full book ---
  preview: null,
  fullBook: null,

  // --- Setters ---
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPromise: (promise) => set({ promise }),
  setGoal: (goal) => set({ goal }),
  setStyle: (style) => set({ style }),

  setAudience: (audience) => set({ audience }),
  setAudienceLevel: (audienceLevel) => set({ audienceLevel }),
  setAudienceProblem: (audienceProblem) => set({ audienceProblem }),

  setChapters: (chapters) => set({ chapters }),
  setLength: (length) => set({ length }),

  setPreview: (preview) => set({ preview }),
  setFullBook: (fullBook) => set({ fullBook }),

  // Reset complet
  reset: () =>
    set({
      title: "",
      description: "",
      promise: "",
      goal: "",
      style: "",
      audience: "",
      audienceLevel: "",
      audienceProblem: "",
      chapters: [],
      length: "",
      preview: null,
      fullBook: null,
    }),
}));
