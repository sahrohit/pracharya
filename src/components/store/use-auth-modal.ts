import { create } from "zustand";

interface UseAuthModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useAuthModal = create<UseAuthModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
