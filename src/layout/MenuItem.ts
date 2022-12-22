class MenuItem {
    constructor({ name = "", title = "", icon = "", path = "", meta = undefined }, childer: MenuItem[] | undefined = undefined) {
        this.name = name
        this.title = title
        this.icon = icon
        this.meta = meta
        this.path = path
        this.childer = childer
    }
    //名称（唯一）
    public name: string;
    //标题
    public title: string;
    //图标
    public icon: string | undefined;
    //参数
    public meta: object | undefined;
    //路由
    public path: string | undefined;
    //子级
    public childer: MenuItem[] | undefined;
}
export default MenuItem