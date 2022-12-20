<template>
  <div class="toolbar-container">
    <div>
      <el-icon class="el-dropdown-link" @click="global.UpdateLayoutCollapse">
        <Expand v-if="global.Layout.Collapse" />
        <Fold v-else
      /></el-icon>
    </div>
    <div>
      <el-dropdown @command="onChange">
        <div style="display: flex; align-items: center">
          <div>
            <el-avatar :size="30" :src="user.Info.Face" />
          </div>
          <div>
            <span class="el-dropdown-link">{{ user.Info.AdminName }}</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/stores/global";
import { Fold, Expand } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { UserStore } from "@/stores/user";
const router = useRouter();
const user = UserStore();
const global = GlobalStore();
const onChange = (command: string | number | object) => {
  switch (command) {
    case "profile":
      router.push({ path: command });
      break;
    case "logout":
      break;
  }
};
</script>
