<template>
  <div class="home-index">
    {{ userName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const userName = store.getters['auth/name']
    return {
      userName
    }
  }
})
</script>

<style lang="scss">
.home-index {
  background-color: #fff;
}
</style>
