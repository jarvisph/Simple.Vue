class TableColumnItem {
    constructor({ name = "", title = "标题", align = "center", sort = false, template = undefined }) {
        this.name = name
        this.title = title
        this.align = align
        this.sort = false
        this.template = template
    }
    public name: string;
    public title: string;
    public align: string;
    public sort: boolean;
    public template: void | undefined;
}

export default TableColumnItem