<template>
    <el-select v-model="state.value" clearable :placeholder="props.placeholder">
        <el-option v-for="item in state.options" :key="item[0]" :label="item[1]" :value="item[0]" />
    </el-select>
</template>

<script lang="ts" setup>
    import {
        reactive,
        watch
    } from 'vue';
    const props = defineProps({
        value: [String, Number],
        enum: String,
        placeholder:String,
        data: Map,
    })
    const emit = defineEmits(["on-change"])
    const state = reactive({
        value: props.value,
        options: props.data
    })
    watch(() => props.value, (value) => {
        state.value = String(value)
    })
</script>