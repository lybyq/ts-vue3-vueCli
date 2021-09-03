<template>
  <div class="login">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { ElMessage } from 'element-plus'
// eslint-disable-next-line vue/require-name-property
export default defineComponent({
  setup () {
    const userName: Ref<string> = ref('')
    ElMessage.error('测试消息提示！')
    console.log('userName:', userName.value)
  }
})
</script>

<style lang="scss" scoped>
.login {
  background-color: #fff;
}
</style>
