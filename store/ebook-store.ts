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
  content?: string; // Pour la génération finale
};

type EbookState = {
  // --- Informations principales ---
  title: string;
  description: string;
  promise: string;
  goal: string;
  style: string;

  // --- Audience (pour étapes suivantes) ---
  audience: string;
  audienceLevel: string;
  audienceProblem: string;

  // --- Structure ---
  chapters: Chapter[];
  length: string,

  // Setters
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
  length: "",

  // --- Mutateurs ---
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPromise: (promise) => set({ promise }),
  setGoal: (goal) => set({ goal }),
  setStyle: (style) => set({ style }),

  setAudience: (audience) => set({ audience }),
  setAudienceLevel: (audienceLevel) => set({ audienceLevel }),
  setAudienceProblem: (audienceProblem) => set({ audienceProblem }),

  setChapters: (chapters) => set({ chapters }),
  setLength: (v: string) => set({ length: v }),

  // --- Reset complet (utile après export PDF) ---
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
    }),
}));
