<template>
  <el-select v-model="value" placeholder="请选择游戏" clearable>
    <el-option
      v-for="(game, key) in $global.game"
      :key="key"
      :value="Number(key)"
      :label="game.Name"
    />
  </el-select>
</template>
<script>
export default {
  props: {
    model: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      value: undefined
    }
  },
  watch: {
    model(newVal) {
      this.value = newVal
    }
  }
}
</script>
