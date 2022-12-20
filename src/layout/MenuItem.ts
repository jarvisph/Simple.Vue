class MenuItem {
    constructor({ name = "", title = "", icon = "", path = "", meta = undefined }, childer: MenuItem[] | undefined = undefined) {
        this.name = name
        this.title = title
        this.icon = icon
        this.meta = meta
        this.path = path
        this.childer = childer
    }
    public name: string;
    public title: string;
    public icon: string | undefined;
    public meta: object | undefined;
    public path: string | undefined;
    public childer: MenuItem[] | undefined;
}
export default MenuItem