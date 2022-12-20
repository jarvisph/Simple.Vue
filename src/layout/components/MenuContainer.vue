<template>
  <div class="layout-logo">
    <span class="title" v-if="!global.Layout.Collapse">{{
      global.Layout.Title
    }}</span>
  </div>
  <div class="layout-menu">
    <el-menu
      :default-active="state.active"
      class="el-menu-vertical-demo"
      :router="true"
      :collapse="global.Layout.Collapse"
      @open="onOpen"
      @close="onClose"
    >
      <el-menu-item index="home" route="/">
        <el-icon><i class="am-icon-home"></i></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu :index="item.name" v-for="item in user.Menus">
        <template #title>
          <el-icon v-if="item.icon"><i :class="item.icon"></i></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="childerItem.name"
          :route="childerItem.path"
          v-for="childerItem in item.childer"
          >{{ childerItem.title }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/stores/global";
import { UserStore } from "@/stores/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const global = GlobalStore();
const user = UserStore();
const router = useRouter();
user.GetInfo();
const state = reactive({
  active: router.currentRoute.value.name,
});

const onOpen = () => {};
const onClose = () => {};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
