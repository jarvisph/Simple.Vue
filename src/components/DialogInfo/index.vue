<template>
    <el-dialog v-model="state.visible" :title="props.title" :before-close="onClose" custom-class="el-dialog-info">
        <el-tabs v-model="state.active" type="border-card" @tab-click="onTabClick">
           <el-tab-pane v-for="item in props.items" :key="item.name">
                <template #label>
                        <i :class="item.icon"></i>
                        <p>{{ item.title }}</p>
                </template>
           </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive,watch } from 'vue';
    const props = defineProps({
        visible: Boolean,
        title: String,
        items:Array
    });
    const state=reactive({
        active:undefined,
        visible:props.visible
    })
    const emit=defineEmits(["on-close"])
    const onClose = () => {
        emit("on-close")
    }

    const onTabClick=()=>{

    }
</script>