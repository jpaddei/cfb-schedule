import { create } from "zustand"

export const useGameStore = create((set) => ({
    games: [],
    setGames: (games) => set({ games }),
    fetchGames: async() => {
        const res = await fetch("/api/games");    
        const data = await res.json();
        set({ games: data.data });
    }
}))