import { create } from "zustand";

interface State_Actions {
  data: any;
  setData: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => {
  return {
    data: null,
    setData: (newState) => set({ data: newState }),
  };
});

export default useContents;
