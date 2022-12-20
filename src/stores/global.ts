import { defineStore } from "pinia";
export const GlobalStore = defineStore({
    id: 'global',
    state: () => {
        return {
            Layout: {
                Collapse: false,
                Title: '管理系统'
            }
        }
    },
    actions: {
        UpdateLayoutCollapse() {
            this.Layout.Collapse = !this.Layout.Collapse
        }
    }
})