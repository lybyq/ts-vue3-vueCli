<template>
  <div class="default-title">
    <span>Vue Admin Plus</span>
  </div>
  <el-scrollbar>
    <el-menu
        :default-active="routePath"
        :collapse="collapse"
        :collapse-transition="false"
        background-color="#282C34"
        text-color="#ffffff"
        active-text-color="#ffffff"
    >
      <menu-side-item
          v-for="(item, index) in menus"
          :key="index"
          :index="index + ''"
          :parent-ids="[item.name]"
          :menu="item"
      ></menu-side-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, Ref, ref, reactive } from 'vue'
import { ElScrollbar, ElMenu } from 'element-plus'
import { cloneDeep } from 'lodash'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { MenuItem } from '@/layouts/components/side-bar/types'
import { UnwrapRef } from '@vue/reactivity'
import MenuSideItem from './item.vue'
import { makeTree } from '@/utils/common'

export default defineComponent({
  name: 'SideBarIndex',
  components: {
    ElScrollbar,
    MenuSideItem,
    ElMenu
  },

  setup () {
    const store = useStore()
    const route = useRoute()
    const menus: UnwrapRef<MenuItem[]> = reactive([
      {
        path: '/home',
        name: '首页',
        icon: 'el-icon-monitor'
      },
      {
        path: '/cards',
        name: '卡片',
        icon: 'el-icon-monitor',
        children: [
          {
            path: '/cards/1',
            name: '卡片模块1',
            icon: 'el-icon-monitor',
            children: [
              {
                path: '/cards/card-1',
                name: '卡片1',
                icon: 'el-icon-collection-tag'
              },
              {
                path: '/cards/card-2',
                name: '卡片2',
                icon: 'el-icon-collection-tag'
              }
            ]
          },
          {
            path: '/cards/2',
            name: '卡片模块2',
            icon: 'el-icon-monitor',
            children: [
              {
                path: '/cards/card-3',
                name: '卡片3',
                icon: 'el-icon-collection-tag'
              },
              {
                path: '/cards/card-4',
                name: '卡片4',
                icon: 'el-icon-collection-tag'
              }
            ]
          }
        ]
      }
    ])
    // 权限数据扁平化
    const tree = makeTree(cloneDeep(menus))
    store.commit('route/initMakeTree', tree)
    // 展开/折叠
    const collapse: Ref<boolean> = ref(false)
    const routePath = computed(() => {
      return route.path
    })
    return {
      routePath,
      collapse,
      menus
    }
  }
})
</script>

<style lang="scss" scoped>
.default-title {
  text-align: center;
  display: block;
  margin-left: 5px;
  overflow: hidden;
  font-size: 20px;
  line-height: 55px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 206px;
}

.el-scrollbar {
  height: calc(100vh - 55px);
  .el-scrollbar__wrap {
    padding-bottom: 55px;
    box-sizing: border-box;
  }
}
</style>
