import { Interface__Career } from "@/constants/interfaces";
import { create } from "zustand";

interface State_Actions {
  activeCareer: Interface__Career | null;
  setActiveCareer: (newState: any) => void;
}

const useActiveCareer = create<State_Actions>((set) => {
  return {
    activeCareer: null,
    setActiveCareer: (newState) => set({ activeCareer: newState }),
  };
});

export default useActiveCareer;
