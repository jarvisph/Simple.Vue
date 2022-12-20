<template>
  <el-table
    v-loading="state.loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="state.data"
    :stripe="true"
    :border="true"
    ref="table"
    size="small"
    class="width-100"
  >
    <template v-for="(item, index) in props.options.cols">
      <!--多选列-->
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
          :key="item.name"
          :prop="item.name"
          :width="item.width"
          :type="item.type"
          :align="item.align || 'center'"
          :sortable="item.sort"
        >
          <!--自定义header头-->
          <template #header>
            {{ item.title }}
            <el-tooltip
              v-if="item.tip"
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top"
            >
              <i class="am-icon-question-circle-o"></i>
            </el-tooltip>
          </template>
          <!--嵌套header头-->
          <template v-if="item.cols" v-for="childItem in item.cols">
            <el-table-column
              :prop="childItem.name"
              :label="childItem.title"
              :align="childItem.align || 'center'"
              :sortable="childItem.sort"
            >
              <template #default="scope">
                <!--html模版-->
                <div
                  v-if="childItem.template"
                  v-html="childItem.template(scope.row, item)"
                ></div>
                <div v-else>{{ scope.row[childItem.name] }}</div>
              </template>
            </el-table-column>
          </template>
          <!--工具栏-->
          <template
            v-else-if="item.type === 'toolbar'"
            v-for="btn in item.template"
          >
            <toolbar :options="btn"></toolbar>
          </template>
          <!--拖动排序-->
          <template v-else-if="item.type === 'sort'">
            <span class="drag-handler am-icon-arrows"></span>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
  <div class="el-table-pagination">
    <el-pagination
      v-model:current-page="state.currentPage"
      v-model:page-size="state.pageSize"
      :page-sizes="[20, 100, 200, 500, 1000]"
      :small="false"
      layout=" sizes,total, prev, pager, next, jumper"
      :total="400"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, nextTick, ref, getCurrentInstance } from "vue";
import Sortable from "sortablejs";
import toolbar from "./toolbar.vue";

const proxy = getCurrentInstance();

const props = defineProps({
  options: {
    type: Object,
    default: function () {
      return {
        //搜索框
        search: true,
        //搜索开启分页
        page: true,
        //远程数据
        url: "",
        elem: "",
        //条件搜索参数
        where: {},
        //数据集
        data: [],
        // 固定参数
        params: {},
        // 列内容
        cols: [],
      };
    },
  },
});
const state = reactive({
  data: props.options.data,
  loading: false,
  currentPage: 1,
  pageSize: 20,
  total: 100,
});

// 存储dom数组
const myRef = ref(null);

const onSizeChange = () => {};
const onCurrentChange = () => {};

const setSort = () => {
  var elem = ".el-table__body tbody";
  if (props.options.elem) {
    elem = `.${props.options.elem} ${elem}`;
  }
  const el = document.querySelector(elem);
  const sortable = Sortable.create(el, {
    handle: ".drag-handler",
    ghostClass: "sortable-ghost", // Class name for the drop placeholder,
    onEnd: (evt: Sortable.SortableEvent) => {
      const targetRow = state.data.splice(evt.oldIndex, 1)[0];
      state.data.splice(evt.newIndex, 0, targetRow);
      props.options.cols.find((item: object) => {
        if (item.type === "sort" && item.event) {
          item?.event(state.data);
        }
      });
    },
  });
};

onMounted(() => {
  nextTick(() => {
    setSort();
  });
});
</script>

<style>
.el-table-pagination {
  background-color: white;
  padding: 10px;
}

.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #c2c2c2 !important;
}
.drag-handler {
  cursor: pointer;
}
</style>
