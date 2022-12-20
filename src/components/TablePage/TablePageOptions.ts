class TablePageOptions {
    constructor({
        search = true,
        page = true,
        url = undefined,
        data = undefined,
        // 固定参数
        params = {},
        // 列内容
        cols = [],
    }) {
        this.search = search
        this.page = page
        this.url = url
        this.data = data
    }
    //搜索框
    public search: boolean;
    //搜索开启分页
    public page: boolean;
    //远程数据
    public url: string | undefined;
    //数据集合
    public data: Array<object> | undefined;
}

export default TablePageOptions