<template>
  <div>
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group v-model="value" @change="handleCheckedChange">
      <el-checkbox
        v-for="(value, key) in $global.game"
        :key="key"
        :label="Number(key)"
        :value="key"
      >{{ value.Name }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'GameCheckBox',
  props: {
    data: {
      type: Array,
      defalut: () => []
    }
  },
  data() {
    return {
      value: [],
      checkAll: false,
      isIndeterminate: false
    }
  },
  watch: {
    data(newVal) {
      this.value = newVal
    }
  },
  mounted() {},
  methods: {
    handleCheckedChange(val) {
      this.isIndeterminate = this.value.length > 0
    },
    handleCheckAllChange(val) {
      if (val) {
        for (var item in this.$global.game) {
          this.value.push(Number(item))
        }
      } else {
        this.isIndeterminate = false
        this.value.splice(0, this.value.length)
      }
    }
  }
}
</script>
