<template>
  <div class="aegis-admin-wrapper">
    <div class="aegis-layout-vertical">
      <div class="aegis-side-bar">
        <sidebar></sidebar>
      </div>
      <header-nav></header-nav>
      <div class="aegis-main">
        <section>
          <router-view></router-view>
        </section>
        <footer>
          <span>Copyright</span><i></i> <span>沙发上地方</span><span>发生的 -4</span><span>网站标识码:的故事说的</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/side-bar/index.vue'
import HeaderNav from './components/header-nav/index.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    HeaderNav
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
@import "./index";
</style>
