<template>
  <el-form-item :label="item.Description" v-for="item in props.data">
    <el-input v-model="item.Value" :placeholder="item.Description" />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps({ data: Array });
</script>
