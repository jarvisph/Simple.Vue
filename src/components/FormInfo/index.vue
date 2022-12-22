<template>
  <el-dialog
    class="el-form-info"
    v-model="state.visible"
    :title="props.title"
    width="50%"
    @close="onClose"
    draggable
  >
    <el-scrollbar>
      <el-form :model="props.model" label-width="120px">
        <slot></slot>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onSubmit" :disabled="state.disabled"
          >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import request from "@/utils/request";
const props = defineProps({
  visible: Boolean,
  title: String,
  url: String,
  model: Object,
});

watch(
  () => props.visible,
  (value) => {
    state.visible = value;
  }
);
const emit = defineEmits(["on-close", "on-submit", "callback"]);
const state = reactive({
  visible: props.visible,
  disabled: false,
});

const onClose = () => {
  emit("on-close");
};

const onSubmit = () => {
  state.disabled = true;
  request
    .form({ url: props.url, data: props.model })
    .then((res) => {
      state.disabled = false;
      emit("callback", res);
    })
    .catch((err) => {
      state.disabled = false;
      console.log(err);
    });
};
</script>
