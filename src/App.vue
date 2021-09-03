<template>
  <router-view></router-view>
  <div v-ellipsis:200>随便打开不放卡司法部随便打开不放卡司法部卡夫卡舒服不考试的分布式开关师傅VB上岛咖啡随便打开不放卡司法部卡夫卡舒服不考试的分布式开关师傅VB上岛咖啡卡夫卡舒服不考试的分布式开关师傅VB上岛咖啡</div>

  <div v-format:1.toFixed.price="number"></div>

  <div v-drag>这是我的拖拽区域</div>

  <div v-clone>单击复制我去粘贴吧!</div>

  <div v-clone.dbclick>双击复制我去粘贴吧!</div>

  <div v-expandArea="[0,20,40,50]">扩展点击区域</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    const number = ref(5668888)

    return {
      number
    }
  }
})
</script>
