import { create } from 'zustand';

const useNotesStore = create((set) => ({
    notes: [],
    setNotes: (notes) => set({ notes: notes }),
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }))
}));

export default useNotesStore;