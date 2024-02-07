import { create } from "zustand";

interface UseSigninModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSigninModal = create<UseSigninModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSigninModal;
