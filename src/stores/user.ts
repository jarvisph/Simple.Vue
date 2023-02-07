import { defineStore } from "pinia";
import MenuItem from "@/layout/MenuItem";

export const UserStore = defineStore({
    id: "user",
    state: () => {
        return {
            Menus: [] as MenuItem[],
            Info: {
                ID: 0,
                AdminName: "Admin",
                CreateAt: "2022-12-20",
                Face: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            }
        }
    },
    actions: {
        GetInfo() {
            this.Menus = []
            this.Menus.push(new MenuItem({ name: "user", title: '会员管理', icon: "am-icon-user" }, [new MenuItem({ name: "user", title: "会员列表", path: "/user" })]))
        },
        Logout(){
            
        }
    }
})