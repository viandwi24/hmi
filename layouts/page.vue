<template>
  <div>
    <OverlayLoading v-if="loading" />
    <NotifyLoading v-if="notifyLoading.show" />
    <div class="page">
      <div class="navbar">
        <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-1">
        <div class="page-title">
          Page 03 - Input Data
        </div>
        <div class="menu">
          <div class="tw-flex tw-flex-row tw-space-x-2 tw-text-gray-200 tw-h-full tw-self-center tw-pl-4">
            <div class="tw-self-center">
              <font-awesome-icon :icon="['fas', 'user']" class="tw-text-4xl tw-self-center" />
            </div>
            <div class="tw-text-left tw-self-center">
              <div class="tw-text-sm">
                Username
              </div>
              <div class="tw-text-xs">
                Engineer
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nuxt />
      <div class="footer">
        <div class="footer-container">
          <div class="nav-container">
            <div v-for="(item, i) in footerMenu" :key="i" class="item">
              <div class="item-content" @click="item.onClick(item)">
                <div class="item-icon">
                  <img :src="`img/menu/${item.icon}.svg`">
                </div>
                <div class="item-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, useContext, useStore } from '@nuxtjs/composition-api'
import { footerMenu as footerMenuList } from '@/api/footerMenu.js'
export default {
  setup () {
    const { app } = useContext()
    const store = useStore()
    const loading = computed(() => store.state.loading)
    const notifyLoading = computed(() => store.state.notifyLoading)
    const footerMenu = reactive(footerMenuList(app.router))

    return {
      loading,
      notifyLoading,
      footerMenu
    }
  }
}
</script>
