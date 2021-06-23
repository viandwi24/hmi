<template>
  <div class="page">
    <div class="navbar">
      <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-1">
      <div class="page-title">
        Page 04 - Report
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
    <div class="screen tw-relative tw-flex-1">
      <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-mx-40 tw-my-20 tw-flex tw-flex-col tw-overflow-hidden">
        <div style="display: flex; flex: 1 1 0%;overflow-y: auto;">
          <table class="shadow-lg tw-w-full">
            <tr>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Date
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Inlet
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Outlet
              </th>
            </tr>
          </table>
        </div>
        <div class="tw-py-4 tw-px-6 tw-flex tw-justify-center tw-bg-gray-300">
          <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Ok
          </button>
        </div>
      </div>
    </div>
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
</template>

<script>
import {
  reactive,
  useContext
} from '@nuxtjs/composition-api'
import { footerMenu as footerMenuList } from '@/api/footerMenu.js'

export default {
  setup () {
    const { app } = useContext()
    const goBack = () => {
      app.router.push({ path: '/', query: { page: 'overview' } })
    }
    const footerMenu = reactive(footerMenuList(app.router))

    return {
      footerMenu,
      goBack
    }
  }
}
</script>
