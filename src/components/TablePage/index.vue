<template>
  <div class="el-table-search" v-if="props.search">
    <el-form :model="props.where">
      <slot name="search"></slot>
      <div class="toolbar">
        <el-button type="primary" @click="onSearch"> 查询 </el-button>
        <el-button native-type="reset" @click="onReset"> 重置 </el-button>
      </div>
    </el-form>
  </div>
  <!--工具栏-->
  <div class="el-table-toolbar">
    <slot name="toolbar"></slot>
  </div>
  <el-table
    v-loading="state.loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="state.data"
    :stripe="true"
    :border="true"
    :summary-method="SummaryMethod"
    :show-summary="props.options.total ? true : false"
    ref="table"
    size="small"
    class="width-100"
  >
    <template v-for="item in props.options.cols">
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
  <div class="el-table-pagination" v-if="props.page">
    <el-pagination
      v-model:current-page="state.currentPage"
      v-model:page-size="state.pageSize"
      :page-sizes="[20, 100, 200, 500, 1000]"
      :small="false"
      layout=" sizes,total, prev, pager, next, jumper"
      :total="state.total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, nextTick } from "vue";
import type { TableColumnCtx } from "element-plus";
import Sortable from "sortablejs";
import toolbar from "./toolbar.vue";
import { sum } from "lodash";
const emit = defineEmits(["on-edit"]);
const props = defineProps({
  options: {
    type: Object,
    default: function () {
      return {
        //远程数据
        url: "",
        elem: "",
        // 固定参数
        params: {},
        // 列内容
        cols: [],
      };
    },
  },
  where: Object,
  data: Array,
  search: {
    type: Boolean,
    default: true,
  },
  page: {
    type: Boolean,
    default: true,
  },
});

const state = reactive({
  data: props.data,
  loading: false,
  currentPage: 1,
  pageSize: 20,
  total: props.data ? props.data.length : 0,
});

const onSizeChange = () => {};
const onCurrentChange = () => {};

interface SummaryMethodProps<T> {
  columns: TableColumnCtx<T>[];
  data: T[];
}

const SummaryMethod = () => {
  const sums: string[] = [];
  props.options.total.forEach((item: Object) => {
    sums.push(item.title);
  });
  return sums;
};
const setSort = () => {
  var elem = ".el-table__body tbody";
  if (props.options.elem) {
    elem = `.${props.options.elem} ${elem}`;
  }
  const el = document.querySelector(elem);
  Sortable.create(el, {
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

const onSearch = () => {
  console.log(props.where);
};
const onReset = () => {
  for (var item in props.where) {
    props.where[item] = null;
  }
};

const onEditInput = (field, event) => {
  emit("on-edit", {
    field: field,
    value: event.target.value,
  });
};

onMounted(() => {
  nextTick(() => {
    setSort();
  });
});
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #c2c2c2 !important;
}
.drag-handler {
  cursor: pointer;
}
</style>
