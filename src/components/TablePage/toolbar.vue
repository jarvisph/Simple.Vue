<template>
  <el-button
    v-if="props.options?.type === 'delete'"
    size="small"
    :disabled="state.disabled"
    type="danger"
    @click="onDelete"
  >
    <i class="am-icon-remove"></i>&nbsp;{{ props.options?.title }}</el-button
  >
  <el-button
    v-else-if="props.options?.type === 'edit'"
    size="small"
    :disabled="state.disabled"
    type="primary"
    plain
    @click="onClick"
  >
    <i class="am-icon-edit"></i>&nbsp;{{ props.options?.title }}</el-button
  >
  <el-button
    v-else
    size="small"
    :disabled="state.disabled"
    :type="props.options?.type"
    @click="onClick"
  >
    <i v-if="props.options?.icon" :class="props.options?.icon"></i>&nbsp;{{
      props.options?.title
    }}</el-button
  >
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive } from "vue";
const props = defineProps({
  options: {
    type: Object,
    defualt: function () {
      return {
        type: "plain",
        to: "",
        icon: "",
        url: "",
        title: "按钮",
      };
    },
  },
});
const state = reactive({
  disabled: false,
});
const onDelete = () => {
  state.disabled = true;
  ElMessageBox.confirm("您确定删除该数据吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      state.disabled = false;
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      state.disabled = false;
      ElMessage({
        type: "info",
        message: "您已取消",
      });
    });
};
const onClick = () => {
  props.options?.event();
};
</script>
