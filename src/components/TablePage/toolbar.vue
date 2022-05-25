<template>
  <router-link v-if="btn.type === 'link'" :to="btn.to + scope.row[btn.name]">
    <el-button type="primary" class="table-mini-btn" :icon="btn.icon">
      {{ btn.title }}
    </el-button>
  </router-link>
  <el-button
    v-else
    :icon="
      btn.type === 'delete'
        ? 'am-icon-remove'
        : btn.type === 'edit'
          ? 'am-icon-edit'
          : btn.icon
    "
    :title="btn.title"
    class="table-mini-btn"
    :type="btn.type === 'delete' ? 'danger' : btn.type || 'primary'"
    @click="
      btn.type === 'delete'
        ? handleDelete(
            btn.url,
            scope.$index,
            scope.row,
            options.url ? list : data
          )
        : btn.event(scope.row, item)
    "
  >&nbsp;{{ btn.icon === undefined ? btn.title : "" }}</el-button>
</template>
<script>
import { form } from '@/api/common'
export default {
  name: 'TableToolbar',
  props: {
    btn: {
      type: Object,
      default: function() {
        return {}
      }
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    scope: {
      type: Object,
      default: function() {
        return {}
      }
    },
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    // 删除事件
    handleDelete(url, index, row, rows) {
      if (url) {
        this.$confirm('确定删除数据？', '提示', {
          confirmButtonText: '确定',
          canceButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const loading = this.$loading({ text: '正在删除' })
            form(url, row, 'delete')
              .then((res) => {
                loading.close()
                this.$message({
                  message: res.success ? '删除成功' : res.msg,
                  type: res.success ? 'success' : 'error'
                })
                if (res.success) {
                  rows.splice(index, 1)
                }
              })
              .catch(() => {
                loading.close()
              })
          })
          .catch(() => {})
      } else {
        rows.splice(index, 1)
      }
    }
  }
}
</script>
