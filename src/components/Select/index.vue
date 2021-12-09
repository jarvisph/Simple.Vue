<template>
  <el-select
    v-model="svalue"
    :size="size"
    :placeholder="placeholder"
    @change="change"
  >
    <template v-if="enumname">
      <el-option
        v-for="(label, key) in $global.Enum[enumname]"
        :key="key"
        :label="label"
        :value="key"
      />
    </template>
    <template v-else-if="dictionary">
      <el-option
        v-for="(label, key) in dictionary"
        :key="key"
        :label="label"
        :value="key"
      />
    </template>
    <template v-else-if="data">
      <el-option
        v-for="item in data"
        :key="item[keyname]"
        :label="item[label]"
        :value="item[keyname]"
      />
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'SelectData',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String],
      default: undefined
    },
    enumname: {
      type: String,
      default: undefined
    },
    data: {
      type: Array,
      default: () => []
    },
    dictionary: {
      type: Object,
      default: () => {}
    },
    keyname: {
      type: String,
      default: 'ID'
    },
    label: {
      type: String,
      default: 'Name'
    }
  },
  data() {
    return {
      svalue: undefined
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      this.svalue = newVal === 0 ? undefined : newVal
    },
    svalue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', this.svalue)
      }
    }
  },
  methods: {
    change() {
      this.$emit('change', this.svalue)
    }
  }
}
</script>
