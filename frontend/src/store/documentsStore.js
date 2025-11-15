import { create } from "zustand";

const useDocumentsStore = create((set) => ({
    documents: [],
    setDocuments: (documents) => set({ documents }),
    addDocument: (document) => set((state) => ({ documents: [...state.documents, document] })),
    removeDocument: (document) => set((state) => ({ documents: state.documents.filter((d) => d !== document) }))
}));

export default useDocumentsStore;