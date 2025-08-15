import { Interface__Career } from "@/constants/interfaces";
import { create } from "zustand";

interface State_Actions {
  activeCareer: Interface__Career | null;
  setActiveCareer: (newState: Interface__Career | null) => void;
}

const STORAGE_KEY = "activeCareer";

const useActiveCareer = create<State_Actions>((set) => {
  // load from localStorage saat pertama kali
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialState = saved ? (JSON.parse(saved) as Interface__Career) : null;

  return {
    activeCareer: initialState,
    setActiveCareer: (newState) => {
      set({ activeCareer: newState });
      if (newState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  };
});

export default useActiveCareer;
