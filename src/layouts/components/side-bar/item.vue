<template>
  <el-menu-item
      v-if="!menuData.children || menuData.children.length === 0"
      :index="menuData.path"
      class="submenu-title-noDropdown"
      @click="handleMenusTap(menuData)">
    <i :class="menuData.icon"></i>
    <span
        v-show="menuData.name"
        class="span-menu-name">{{ menuData.name }}</span>
  </el-menu-item>
  <el-submenu
      v-else
      :index="menuData.path">
    <template #title>
      <i :class="menuData.icon"></i>
      <span class="span-menu-name">{{ menuData.name }}</span>
    </template>
    <template v-for="(rc, k1) in menuData.children">
      <el-menu-item
          v-if="!rc.children || rc.children.length < 1"
          :key="k1"
          :index="rc.path"
          @click="handleMenusTap(rc)">
        <i
            v-show="rc.icon"
            :class="rc.icon"></i>
        <span
            v-show="rc.name"
            class="span-menu-name">{{ rc.name }}</span>
      </el-menu-item>
      <sidebar-item
          v-else
          :key="`${menuIndex}-${k1}`"
          :index="`${menuIndex}-${k1}`"
          :parent-ids="[...parentIds,rc.name]"
          :menu="rc"></sidebar-item>
    </template>
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent, toRef, Ref } from 'vue'
import { useStore } from 'vuex'
import { ElSubmenu, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'
import { MenuItem } from '@/layouts/components/side-bar/types'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    ElSubmenu,
    ElMenuItem
  },
  props: {
    menu: Object,
    index: String,
    parentIds: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const menuIndex: Ref<string | undefined> = toRef(props, 'index')
    const menuData: Ref<any> = toRef(props, 'menu')
    /**
     * menu点击
     * @param item
     */
    const handleMenusTap = (item: MenuItem) => {
      if (item && item.path) {
        router.push({
          path: item.path
        })
      }
      // 面包屑链路
      const routeLink = props.parentIds.includes(item.name) ? [...props.parentIds] : [...props.parentIds, item.name]
      store.dispatch('route/saveBreadcrumb', routeLink)
    }
    return {
      menuIndex,
      menuData,
      handleMenusTap
    }
  }
})
</script>
