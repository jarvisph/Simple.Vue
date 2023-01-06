import { defineStore } from "pinia";
export const GlobalStore = defineStore({
    id: 'global',
    state: () => {
        const language = new Map();
        language.set("CHN", "简体中文")
        language.set("THN", "正體中文")
        language.set("ENG", "English")
        language.set("VI", "Tiếng việt")
        language.set("TH", "ไทย")
        language.set("JA", "日本語")
        return {
            Layout: {
                Collapse: false,
                Title: '管理系统'
            },
            Language: language
        }
    },
    actions: {
        UpdateLayoutCollapse() {
            this.Layout.Collapse = !this.Layout.Collapse
        }
    }
})