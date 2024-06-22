import { create } from 'zustand'

type PageStore = {
    page: string,
    icon: string,
    changePage: (page:string, icon: string) => void
}

export const usePageStore = create<PageStore>((set) => ({
    page: "",
    icon: "",
    changePage: (page: string, icon: string) => set({ page, icon })
}));