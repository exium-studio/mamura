import { DUMMY_CONTENTS } from "@/constants/dummy";
import { create } from "zustand";

interface State_Actions {
  data: any;
  setData: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => {
  return {
    // TODO make data to null if finished dev
    data: DUMMY_CONTENTS,
    setData: (newState) => set({ data: newState }),
  };
});

export default useContents;
