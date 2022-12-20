<template>
  <el-container>
    <el-aside>
      <el-scrollbar>
        <MenuContainer />
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <HeaderContainer />
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import MenuContainer from "./components/MenuContainer.vue";
import HeaderContainer from "./components/HeaderContainer.vue";
import { GlobalStore } from "../stores/global";
const global = GlobalStore();
</script>


