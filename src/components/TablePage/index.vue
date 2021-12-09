<template>
  <div :class="options.elem || 'app-body'">
    <div v-if="search" class="filter-container">
      <el-form ref="searchForm">
        <slot name="search" />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="reload"
        >~搜索~</el-button>
        <button
          v-waves
          style="height: 29px"
          size="mini"
          class="el-button filter-item el-button--mini"
          type="reset"
          @click="options.where = {}"
        >
          ~重 置~
        </button>
      </el-form>
    </div>
    <div class="table-container">
      <div v-if="options.title" class="table-title">
        <h3>
          {{ options.title }}
          <span
            v-if="page"
          >&nbsp;&nbsp;<i
            class="el-icon-refresh"
            title="~刷新~"
            style="cursor: pointer"
            @click="reload"
          /></span>
        </h3>
      </div>
      <!--表头工具栏-->
      <div v-if="options.toolbar" class="table-toolbar">
        <slot name="toolbar" />
      </div>
      <div v-else style="float: right; padding-bottom: 8px">
        <slot name="toolbar" />
      </div>
      <div class="table-tab">
        <slot name="tab" />
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="~拼命加载中~"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="options.url ? list : data"
        border
        size="mini"
        row-key="ID"
        :max-height="options.height"
        @sort-change="sortChange"
        @selection-change="selectionChange"
      >
        <template v-for="(item, index) in options.cols">
          <template v-if="item.type === 'checkbox'">
            <el-table-column
              :key="item.type"
              type="selection"
              :width="item.width"
              :align="item.align || 'center'"
            />
          </template>
          <template v-else>
            <el-table-column
              v-if="item.visible === undefined || item.visible"
              :key="item.name"
              :prop="item.name"
              :width="item.width"
              :type="item.type"
              :align="item.align || 'center'"
              :sortable="item.sortable"
            >
              <!--自定义header头-->
              <template slot="header">
                {{ item.title }}
                <el-tooltip
                  v-if="item.tip"
                  class="item"
                  effect="dark"
                  :content="item.tip"
                  placement="top"
                >
                  <a
                    href="javascript:void(0)"
                    class="am-icon-question-circle-o"
                  />
                </el-tooltip>
              </template>
              <!--嵌套header头-->
              <template v-if="item.cols">
                <template v-for="childItem in item.cols">
                  <el-table-column
                    :key="childItem.name"
                    :prop="childItem.name"
                    :label="childItem.title"
                    :align="childItem.align || 'center'"
                  >
                    <template slot-scope="scope">
                      <!--html模版-->
                      <div
                        v-if="childItem.template"
                        v-html="childItem.template(scope.row, item)"
                      />
                      <div v-else>{{ scope.row[childItem.name] }}</div>
                    </template>
                  </el-table-column>
                </template>
              </template>
              <template slot-scope="scope">
                <!--数字编号-->
                <template v-if="item.type === 'number'">{{
                  (index += 1)
                }}</template>
                <!--拖动排序-->
                <template v-else-if="item.type === 'sort'">
                  <svg-icon class="drag-handler" icon-class="drag" />
                </template>
                <!--工具栏-->
                <template v-else-if="item.type === 'toolbar'">
                  <template v-for="btn in item.template">
                    <template v-if="btn.show">
                      <table-toolbar
                        v-if="btn.show(scope.row)"
                        :key="btn.type"
                        :btn="btn"
                        :options="options"
                        :list="list"
                        :data="data"
                        :scope="scope"
                        :item="item"
                      />
                    </template>
                    <template v-else>
                      <table-toolbar
                        :key="btn.type"
                        :btn="btn"
                        :options="options"
                        :list="list"
                        :data="data"
                        :scope="scope"
                        :item="item"
                      />
                    </template>
                  </template>
                </template>
                <!--html模版-->
                <div
                  v-else-if="item.template"
                  v-html="item.template(scope.row, item)"
                />
                <!--vue模版-->
                <el-slot
                  v-else-if="item.render"
                  :render="item.render"
                  :row="scope.row"
                  :index="scope.$index"
                  :coumn="item"
                />
                <!--表格编辑-->
                <el-input
                  v-else-if="item.edit"
                  v-model="scope.row[item.name]"
                  size="mini"
                  class="table-edit-input"
                  @blur="handleInput(item.name, $event)"
                />
                <div v-else>{{ scope.row[item.name] }}</div>
              </template>
            </el-table-column>
          </template>
        </template>
        <slot name="column" />
      </el-table>
      <el-table
        v-if="total > 0 && tableData.length > 0"
        :show-header="false"
        :data="tableData"
        row-class-name="el-table-total-row"
      >
        <template v-for="(item, index) in options.cols">
          <template v-if="item.cols">
            <template v-for="childItem in item.cols">
              <el-table-column
                :key="childItem.name"
                :width="childItem.width"
                :align="childItem.align || 'center'"
              >
                <template slot-scope="scope">
                  <div
                    v-if="childItem.total"
                    v-html="childItem.total(scope.row, item)"
                  />
                </template>
              </el-table-column>
            </template>
          </template>
          <el-table-column
            v-else
            :key="item.name"
            :width="item.width"
            :align="index === 0 || !item.align ? 'center' : item.align"
          >
            <template slot-scope="scope">
              <div v-if="index === 0">~统计~</div>
              <div
                v-else-if="item.total"
                v-html="item.total(scope.row, item)"
              />
              <div v-else>{{ scope.row[item.name] }}</div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <pagination
        v-show="page"
        :page.sync="options.page"
        :limit.sync="options.limit"
        :total="total"
        @pagination="reload"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
import TableToolbar from './toolbar'
import Sortable from 'sortablejs'
var elSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    return data.props.render(data.props.row, h, data.props)
  }
}
export default {
  name: 'TablePage',
  components: { Pagination, elSlot, TableToolbar },
  directives: { waves },
  props: {
    options: {
      type: Object,
      default: function() {
        return new {
          limit: 20,
          page: 1,
          // 加载url
          url: '',
          // 搜索请求数据
          where: {},
          // 默认请求数据
          data: {},
          // 标题
          title: '',
          // 列内容
          cols: [],
          // 表头
          header: [],
          // 统计栏
          total: [],
          // 表头工具栏
          toolbar: false,
          done: (res) => {}
        }()
      }
    },
    data: {
      type: Array,
      default: () => []
    },
    // 是否显示分页 默认显示
    page: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索栏，默认不显示
    search: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      // url加载数据
      list: [],
      total: 0,
      // 列表拖动排序
      sortable: null,
      header: [],
      // 统计数据
      tableData: []
    }
  },
  created() {
    this.reload()
  },
  methods: {
    reload(params) {
      if (this.options.url) {
        this.loading = true
        if (this.options.where === undefined) {
          this.options.where = {}
        }
        this.options.where.page = this.options.page
        this.options.where.limit = this.options.limit
        this.options.where.PageIndex = this.options.page
        this.options.where.PageSize = this.options.limit
        if (params) {
          for (var item in params) {
            this.options.where[item] = params[item]
          }
        }
        this.$form(this.options.url, this.options.where)
          .then((res) => {
            const { info } = res
            this.loading = false
            if (info.items) {
              this.list = info.items
              this.total = info.total
            } else if (info.list) {
              this.list = info.list
              this.total = info.RecordCount
              if (
                info.data &&
                this.options.cols.filter((c) => c.total).length > 0
              ) {
                this.tableData = [info.data]
              }
            } else {
              this.list = info
              this.total = info.length
            }
            if (this.options.done) {
              this.options.done(res)
            }
            this.$nextTick(() => {
              this.$emit('success', info)
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
      if (this.options.cols.find((item) => item.type === 'sort')) {
        this.$nextTick(() => {
          this.setSort()
        })
      }
    },
    // 排序方法
    setSort() {
      var elem = '.el-table__body-wrapper > table > tbody'
      if (this.options.elem) {
        elem = `.${this.options.elem} .el-table__body-wrapper > table > tbody`
      }
      const el = this.$el.querySelectorAll(elem)[0]
      this.sortable = Sortable.create(el, {
        handle: '.drag-handler',
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = this.options.url
            ? this.list.splice(evt.oldIndex, 1)[0]
            : this.data.splice(evt.oldIndex, 1)[0]

          this.options.url
            ? this.list.splice(evt.newIndex, 0, targetRow)
            : this.data.splice(evt.newIndex, 0, targetRow)

          this.options.cols.find((item) => {
            if (item.type === 'sort' && item.sort) {
              item.sort(this.options.url ? this.list : this.data)
            }
          })
        }
      })
    },
    handleChange() {
      var _self = this
      var query = _self.options.cols.filter((item) => item.header)
      query.find((item) => {
        if (_self.header.indexOf(item.name) === -1) {
          item.visible = false
        } else {
          item.visible = true
        }
      })
    },
    selectionChange: function(row) {
      this.$emit('checkbox-change', row)
    },
    // 表格内容排序事件
    sortChange: function(column) {
      this.options.where.order = column.order
      this.options.where.field = column.prop
      this.reload()
      this.$emit('sort-change', column)
    },
    // 表格编辑事件
    handleInput(field, event) {
      this.$emit('table-edit', { field: field, value: event.target.value })
    }
  }
}
</script>

<style>
.table-container {
  padding: 10px;
  background-color: white;
  margin-top: 10px;
}
.table-title {
  width: 200px;
  position: absolute;
}
.table-title h3 {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.table-toolbar {
  padding: 5px;
  background-color: #fafafa;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #c2c2c2 !important;
}
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
.filter-container {
  padding: 10px;
  background-color: white;
}

.filter-container .filter-item {
  display: inline-block;
  vertical-align: middle;
}
</style>

