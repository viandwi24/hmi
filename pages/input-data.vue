<template>
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
    <div class="screen tw-relative tw-px-40 tw-py-10 tw-bg-red-500">
      <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-flex tw-flex-col tw-h-full tw-max-h-full">
        <div class="tw-flex">
          <div class="tw-flex-1 tw-flex tw-space-x-4 tw-px-4 tw-py-4">
            <div class="tw-relative tw-overflow-hidden tw-rounded tw-border tw-border-gray-400">
              <div class="tw-top-1/2 tw-p-4 tw-self-center tw-inline">
                <font-awesome-icon :icon="['fas', 'calendar']" />
              </div>
              <input type="date" class="tw-text-xs tw-font-bold tw-py-2 tw-px-4 tw-outline-none">
            </div>
            <button class="tw-bg-gray-50 hover:tw-bg-gray-100 tw-text-xs tw-border tw-border-gray-400 tw-text-black tw-font-bold tw-py-2 tw-px-4 tw-rounded">
              SENIN
            </button>
          </div>
          <div class="tw-text-right tw-self-center tw-pr-4 tw-text-xl tw-text-blue-800 tw-font-semibold">
            <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-xs tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
              Save
            </button>
          </div>
        </div>
        <div class="tw-flex-1 tw-max-h-full tw-py-4 tw-px-6 tw-bg-gray-300 tw-overflow-y-scroll" style="max-height: 100%;">
          <table class="shadow-lg tw-w-full">
            <tr class="tw-text-sm" width="30%">
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-4 tw-py-2">
                NAME
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-4 tw-py-2">
                INLET
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-4 tw-py-2">
                OUTLET
              </th>
            </tr>
            <tr v-for="(item, i) in items" :key="i" class="tw-bg-gray-200 hover:tw-text-gray-800 hover:tw-bg-gray-100">
              <td class="tw-border tw-border-gray-300 tw-px-4 tw-py-2">
                <label for="toggle_1" class="tw-text-sm tw-font-font tw-text-gray-800">
                  {{ item.name }}
                </label>
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-4 tw-py-2">
                <input
                  v-model="item.inlet"
                  class="tw-text-xs tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Flow value..."
                >
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-4 tw-py-2">
                <input
                  v-model="item.outlet"
                  class="tw-text-xs tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Totalizer value..."
                >
              </td>
            </tr>
          </table>
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
    const toggle = reactive({
      debitInlet: true,
      debitOutlet: true
    })
    const items = reactive([
      { name: 'pH', inlet: 7.4, outlet: 7.5 },
      { name: 'COD', inlet: 0.5, outlet: 0.6 },
      { name: 'BOD5', inlet: 0.5, outlet: 0.6 },
      { name: 'TSS', inlet: 0.5, outlet: 0.6 },
      { name: 'LEMAK & MINYAK', inlet: 0.5, outlet: 0.6 },
      { name: 'Amoniak', inlet: 0.5, outlet: 0.6 },
      { name: 'Total Coliform', inlet: 0.5, outlet: 0.6 },
      { name: 'Fe', inlet: 0.5, outlet: 0.6 },
      { name: 'Cu', inlet: 0.5, outlet: 0.6 },
      { name: 'Suhu', inlet: 0.5, outlet: 0.6 },
      { name: 'Debit Air Limbah', inlet: 0.5, outlet: 0.6 },
      { name: 'Volume Produksi', inlet: 0.5, outlet: 0.6 }
    ])

    return {
      footerMenu,
      goBack,
      toggle,
      items
    }
  }
}
</script>
