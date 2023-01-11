<template>
    <el-date-picker v-model="state.startTime" type="date" placeholder="开始时间" :shortcuts="shortcuts"
        @change="onChange" />
    <span>-</span>
    <el-date-picker v-model="state.endTime" type="date" placeholder="结束时间" @change="onChange" />
</template>
<script lang="ts" setup>
    import {
        reactive,
        watch
    } from 'vue';
    const emit = defineEmits(["on-change"])
    const props = defineProps({
        type: String,
        startTime: String,
        endTime: String,
        placeholder1: String,
        placeholder2: String,
    })

    const state = reactive({
        startTime:new Date(props.startTime||""),
        endTime: new Date(props.endTime||"")
    })

    watch(() => props.startTime, (value) => {
        state.startTime = new Date(value||"")
    })
    watch(() => props.endTime, (value) => {
        state.endTime =  new Date(value||"")
    })
    const onChange = () => {
        emit("on-change", {
            startTime: state.startTime,
            endTime: state.endTime
        })
    }
    const shortcuts = [{
            text: '今天',
            value: () => {
                const start = new Date()
                state.endTime = start
                return start
            },
        },
        {
            text: '昨天',
            value: () => {
                const start = new Date()
                const end = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                state.endTime = end;
                return start;
            },
        },
        {
            text: '本周',
            value: () => {
                const start = new Date()
                const end = new Date()
                start.setDate(start.getDate() - start.getDay() + 1)
                end.setDate(start.getDate() + 6)
                state.endTime = end;
                return start;
            },
        },
        {
            text: '上周',
            value: () => {
                const start = new Date()
                const end = new Date()
                start.setDate(start.getDate() - 7 - start.getDay() + 1)
                end.setDate(start.getDate() + 6)
                state.endTime = end;
                return start;
            },
        },
        {
            text: '本月',
            value: () => {
                const start = new Date()
                start.setDate(1)
                const end = new Date(start)
                end.setMonth(start.getMonth() + 1)
                end.setDate(0)
                state.endTime = end;
                return start;
            },
        },
        {
            text: '上月',
            value: () => {
                const start = new Date()
                start.setMonth(start.getMonth() - 1)
                start.setDate(1)
                const end = new Date(start)
                end.setMonth(start.getMonth() + 1)
                end.setDate(0)
                state.endTime = end;
                return start;
            },
        },
    ]
</script>