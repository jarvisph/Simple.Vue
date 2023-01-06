<template>
  <template v-for="(item, index) in global.Language">
    <el-form-item :label="item[1]" v-if="index > 2 ? state.visible : true">
      <el-input v-model="state.data[item[0]]" :placeholder="item[1]" />
    </el-form-item>
  </template>
  <el-form-item>
    <div class="text-center width-100">
      <span class="el-button-icon" title="更多语种" @click="onMore">
        <i v-if="state.visible" class="am-icon-angle-double-up"></i>
        <i v-else class="am-icon-angle-double-down"></i>
      </span>
    </div>
  </el-form-item>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { GlobalStore } from "@/stores/global";
const global = GlobalStore();
const props = defineProps({ data: Object });
const state = reactive({
  visible: false,
  data: props.data,
});
const onMore = () => {
  state.visible = !state.visible;
};
</script>
