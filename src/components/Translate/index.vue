<template>
  <div class="translate-container">
    <el-form-item label="简体中文">
      <el-input v-model="value.CHN" />
    </el-form-item>
    <el-form-item label="繁体中文">
      <el-input v-model="value.THN" />
    </el-form-item>
    <el-form-item label="英文">
      <el-input v-model="value.ENG" />
    </el-form-item>
    <el-form-item v-if="visible" label="西班牙语">
      <el-input v-model="value.ES" />
    </el-form-item>
    <el-form-item v-if="visible" label="德语">
      <el-input v-model="value.DE" />
    </el-form-item>
    <el-form-item v-if="visible" label="法语">
      <el-input v-model="value.FR" />
    </el-form-item>
    <el-form-item v-if="visible" label="意大利语">
      <el-input v-model="value.IT" />
    </el-form-item>
    <el-form-item v-if="visible" label="日语">
      <el-input v-model="value.JP" />
    </el-form-item>
    <el-form-item v-if="visible" label="韩语">
      <el-input v-model="value.KR" />
    </el-form-item>
    <el-form-item v-if="visible" label="葡萄牙语">
      <el-input v-model="value.PT" />
    </el-form-item>
    <el-form-item v-if="visible" label="俄语">
      <el-input v-model="value.RU" />
    </el-form-item>
    <el-form-item v-if="visible" label="泰语">
      <el-input v-model="value.TH" />
    </el-form-item>
    <el-form-item v-if="visible" label="越南语">
      <el-input v-model="value.VN" />
    </el-form-item>
    <el-form-item>
      <div style="text-align: center">
        <el-button
          :icon="icon"
          circle
          title="点击获取更多语种"
          @click="handleDown"
        />
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'Translate',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          CHN: undefined,
          THN: undefined,
          ENG: undefined,
          ES: undefined,
          DE: undefined,
          FR: undefined,
          IT: undefined,
          JP: undefined,
          KR: undefined,
          PT: undefined,
          RU: undefined,
          TH: undefined,
          VN: undefined
        }
      }
    }
  },
  data() {
    return {
      icon: 'am-icon-angle-double-down',
      visible: false
    }
  },

  methods: {
    handleDown() {
      if (this.icon === 'am-icon-angle-double-down') {
        this.icon = 'am-icon-angle-double-up'
        this.visible = true
      } else {
        this.icon = 'am-icon-angle-double-down'
        this.visible = false
      }
    }
  }
}
</script>
