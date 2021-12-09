<template>
  <div class="filter-container">
    <el-form ref="searchForm">
      <slot name="search" />
      <el-button-group>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="onSearch"
        >搜索</el-button>
        <button
          v-waves
          style="height: 29px;"
          size="mini"
          class="el-button filter-item el-button--primary el-button--mini"
          type="reset"
          @click="onReset"
        >重置</button>
        <slot name="button" />
      </el-button-group>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves'
export default {
  name: 'TableSearch',
  directives: { waves },
  methods: {
    onSearch() {
      this.$emit('onSearch')
    },
    onReset() {
      this.$emit('onReset')
    }
  }
}
</script>
