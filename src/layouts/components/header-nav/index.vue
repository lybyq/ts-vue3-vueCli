<template>
  <div class="header-nav">
    <div class="aegis-nav">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="left-panel">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                  v-for="(name, index) in breadcrumbData"
                  :key="index">
                {{ name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right-panel">
            <i class="el-icon-full-screen font-15 ml-20"></i>
            <i class="el-icon-refresh font-16 ml-20"></i>
            <el-dropdown
                class="avatar-dropdown"
                trigger="click">
              <span class="user-avatar"><img src="../../../assets/images/16022_100.gif"></span>
              <span class="user-name">aegis<i class="el-icon--right el-icon-arrow-down"></i></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="el-icon-plus">我是谁</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="aegis-nav-tabs">
      <el-tabs
          v-model="activeTab"
          class="aegis-tabs-content-smooth"
          type="card"
          closable
          @tab-click="handleChangeTab"
          @tab-remove="handleCloseCurrent">
        <el-tab-pane
            v-for="(nav, index) in tabNavData"
            :key="index"
            :closable="false"
            :name="nav.fullPath">
          <template #label>
            <el-dropdown
                trigger="contextmenu"
                placement="bottom-start">
              <div style="display: inline-block">
                {{ nav.name }}
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleCloseOthers(nav)"><i class="el-icon-close"></i>关闭其他</el-dropdown-item>
                  <el-dropdown-item @click="handleCloseLeft(nav)"><i class="el-icon-back"></i>关闭左侧</el-dropdown-item>
                  <el-dropdown-item @click="handleCloseRight(nav)"><i class="el-icon-right"></i>关闭右侧</el-dropdown-item>
                  <el-dropdown-item @click="handleCloseAll"><i class="el-icon-close"></i>关闭全部</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-dropdown
          class="avatar-dropdown"
          trigger="hover">
        <span class="el-tabs-menu"><i class="el-icon-menu"></i></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCloseOthers"><i class="el-icon-close"></i>关闭其他</el-dropdown-item>
            <el-dropdown-item @click="handleCloseLeft"><i class="el-icon-back"></i>关闭左侧</el-dropdown-item>
            <el-dropdown-item @click="handleCloseRight"><i class="el-icon-right"></i>关闭右侧</el-dropdown-item>
            <el-dropdown-item @click="handleCloseAll"><i class="el-icon-close"></i>关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { MenuItem } from '@/layouts/components/side-bar/types'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import routes from '@/router/routes'

export default defineComponent({
  name: 'HeaderNav',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const breadcrumbData: Ref<string[] | undefined> = computed(() => {
      return store.getters['route/breadcrumb']
    })
    const activeTab = computed(() => {
      return route.fullPath
    })
    // 多标签
    const tabNavData: Ref<MenuItem[]> = computed(() => {
      return store.getters['route/tabNav']
    })
    /**
     * 点击切换tab
     */
    const handleChangeTab = (tab: any) => {
      router.push({
        path: tab.props.name || ''
      })
    }
    /**
     * 关闭当前标签
     * @param fullPath
     */
    const handleCloseCurrent = (fullPath: string) => {
      if (tabNavData.value.length === 1) {
        return ElMessage.warning('这已经是最后一页，不能再关闭了！')
      }
      store.dispatch('route/closeCurrentTab', fullPath)
      console.log('fullPath === activeTab.value:', fullPath === activeTab.value)
      if (fullPath === activeTab.value) {
        const currentRoute = tabNavData.value[Math.max(0, tabNavData.value.length - 1)]
        console.log('currentRoute:', currentRoute)
        router.push({
          path: currentRoute.fullPath || ''
        })
      }
    }

    const pushRouterByFullPath = (fullPath: string) => {
      router.push({
        path: fullPath || '/home'
      })
    }
    /**
     * 关闭其他tab
     * @param tab
     */
    const handleCloseOthers = (tab?: MenuItem) => {
      const _fullPath = tab && tab.fullPath ? tab.fullPath : activeTab.value
      store.dispatch('route/closeOtherTab', _fullPath)
      // 跳转到当前tab
      if (_fullPath !== activeTab.value) {
        pushRouterByFullPath(_fullPath || '')
      }
    }

    /**
     * 关闭左侧tab
     * @param tab
     */
    const handleCloseLeft = (tab?: MenuItem) => {
      const _fullPath = tab && tab.fullPath ? tab.fullPath : activeTab.value
      store.dispatch('route/closeLeftTab', _fullPath)
      // 同时跳转到当前操作tab
      pushRouterByFullPath(_fullPath || '')
    }
    /**
     * 关闭右侧tab
     * @param tab
     */
    const handleCloseRight = (tab?: MenuItem) => {
      const _fullPath = tab && tab.fullPath ? tab.fullPath : activeTab.value
      store.dispatch('route/closeRightTab', _fullPath)
      // 同时跳转到当前操作tab
      pushRouterByFullPath(_fullPath || '')
    }
    /**
     * 关闭所有tab
     */
    const handleCloseAll = () => {
      store.dispatch('route/closeAllTab')
      // 同时跳转到当前操作tab
      pushRouterByFullPath('/home')
    }
    return {
      activeTab,
      breadcrumbData,
      tabNavData,
      handleChangeTab,
      handleCloseCurrent,
      handleCloseOthers,
      handleCloseLeft,
      handleCloseRight,
      handleCloseAll
    }
  }
})
</script>

<style lang="scss">
.header-nav {
  position: fixed;
  top: 0;
  --leftMenuWith: $base-left-menu-width;
  left: $base-left-menu-width;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  width: calc(100% - 256px);

  .aegis-nav {
    $nav-height: 60px;
    position: relative;
    height: $nav-height;
    padding-right: 20px;
    padding-left: 20px;
    overflow: hidden;
    user-select: none;
    background: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $nav-height;
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: 60px;

      .font-15 {
        font-size: 15px;
      }

      .font-16 {
        font-size: 16px;
      }

      .ml-20 {
        margin-left: 20px;
      }

      .avatar-dropdown {
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;

        .user-avatar {
          width: 40px;
          height: 40px;
          overflow: hidden;
          margin-left: 15px;
          cursor: pointer;
          display: inline-block;
          border-radius: 50%;

          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }

        .user-name {
          height: 40px;
          position: relative;
          display: flex;
          align-content: center;
          align-items: center;
          margin-left: 6px;
          line-height: 40px;
          cursor: pointer;
        }
      }
    }
  }

  .aegis-nav-tabs {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    padding-right: 20px;
    padding-left: 20px;
    user-select: none;
    background: #fff;
    border-top: 1px solid #f6f6f6;

    .aegis-tabs-content-smooth {
      height: 38px;
      width: calc(100% - 40px);

      .el-tabs__header {
        border-bottom: 0;

        .el-tabs__nav {
          border: 0;
        }

        .el-tabs__item {
          height: 38px;
          padding: 0 30px 0 30px;
          margin-top: 6px;
          margin-right: -18px;
          line-height: 38px;
          text-align: center;
          border: 0;
          outline: none;
          transition: padding .3s cubic-bezier(.645, .045, .355, 1) !important;

          &:hover {
            color: #515a6e;
            background: #dee1e6;
            padding: 0 30px 0 30px;
            mask-image: url('../../../assets/images/tab-bg.png');
            -webkit-mask-size: 100% 100%;
          }

          &.is-active {
            color: #1890ff;
            background: #e8f4ff;
            padding: 0 30px 0 30px;
            mask-image: url('../../../assets/images/tab-bg.png');
            -webkit-mask-size: 100% 100%;

            &:hover {
              color: #1890ff;
              background: #e8f4ff;
            }

            .el-dropdown {
              color: #1890ff;
            }
          }
        }
      }
    }

    .el-tabs-menu {
      .el-icon-menu {
        font-size: 18px;
        color: #9a9a9a;

        &:hover {
          transform: rotate(90deg);
          color: #1890ff;
        }
      }
    }
  }
}
</style>
