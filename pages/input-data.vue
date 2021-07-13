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
    <div class="screen tw-relative tw-flex-1">
      <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-mx-40 tw-my-10 tw-flex tw-flex-col tw-overflow-hidden">
        <div style="display: flex; flex: 1 1 0%;overflow-y: auto;" class="tw-flex-col">
          <div class="tw-text-center tw-bg-gray-300 tw-font-semibold tw-py-4">
            Debit Inlet
          </div>
          <table class="shadow-lg tw-w-full tw-mb-12">
            <tr>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Action
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Flow
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Totalizer
              </th>
            </tr>
            <tr class="hover:tw-text-gray-800 hover:tw-bg-gray-200">
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <div class="tw-relative tw-inline-block tw-w-10 tw-mr-2 tw-align-middle tw-select-none tw-transition tw-duration-200 tw-ease-in">
                  <input id="toggle_1" v-model="toggle.debitInlet" type="checkbox" name="toggle_1" class="toggle-checkbox tw-absolute tw-block tw-w-6 tw-h-6 tw-rounded-full tw-bg-white tw-border-4 tw-appearance-none tw-cursor-pointer">
                  <label for="toggle_1" class="toggle-label tw-block tw-overflow-hidden tw-h-6 tw-rounded-full tw-bg-gray-400 tw-cursor-pointer" />
                </div>
                <label for="toggle_1" class="tw-text-xs tw-text-gray-700">
                  <span>
                    <span :class="{ 'tw-font-semibold': (toggle.debitInlet) }">Auto</span> /
                    <span :class="{ 'tw-font-semibold': (!toggle.debitInlet) }">Manual</span>
                  </span>
                </label>
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Flow value..."
                  :disabled="toggle.debitInlet"
                >
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Totalizer value..."
                  :disabled="toggle.debitInlet"
                >
              </td>
            </tr>
          </table>

          <div class="tw-text-center tw-bg-gray-300 tw-font-semibold tw-py-4">
            Debit Outlet
          </div>
          <table class="shadow-lg tw-w-full tw-mb-12">
            <tr>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Action
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Flow
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Totalizer
              </th>
            </tr>
            <tr class="hover:tw-text-gray-800 hover:tw-bg-gray-200">
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <div class="tw-relative tw-inline-block tw-w-10 tw-mr-2 tw-align-middle tw-select-none tw-transition tw-duration-200 tw-ease-in">
                  <input id="toggle_2" v-model="toggle.debitOutlet" type="checkbox" name="toggle_2" class="toggle-checkbox tw-absolute tw-block tw-w-6 tw-h-6 tw-rounded-full tw-bg-white tw-border-4 tw-appearance-none tw-cursor-pointer">
                  <label for="toggle_2" class="toggle-label tw-block tw-overflow-hidden tw-h-6 tw-rounded-full tw-bg-gray-400 tw-cursor-pointer" />
                </div>
                <label for="toggle_2" class="tw-text-xs tw-text-gray-700">
                  <span>
                    <span :class="{ 'tw-font-semibold': (toggle.debitOutlet) }">Auto</span> /
                    <span :class="{ 'tw-font-semibold': (!toggle.debitOutlet) }">Manual</span>
                  </span>
                </label>
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Flow value..."
                  :disabled="toggle.debitOutlet"
                >
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Totalizer value..."
                  :disabled="toggle.debitOutlet"
                >
              </td>
            </tr>
          </table>

          <div class="tw-text-center tw-bg-gray-300 tw-font-semibold tw-py-4">
            Data Swapantau Ipal
          </div>
          <table class="shadow-lg tw-w-full">
            <tr>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Name
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Inlet
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Outlet
              </th>
              <th class="tw-bg-blue-500 tw-text-gray-100 tw-border tw-border-gray-300 tw-text-left tw-px-8 tw-py-4">
                Unit
              </th>
            </tr>
            <tr v-for="(item, i) in dataSwapantau" :key="i" class="hover:tw-text-gray-800 hover:tw-bg-gray-200">
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                {{ item.text }}
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  v-model="dataSwapantau[i].inlet"
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Inlet value..."
                >
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  v-model="dataSwapantau[i].outlet"
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Outlet value..."
                >
              </td>
              <td class="tw-border tw-border-gray-300 tw-px-8 tw-py-4">
                <input
                  v-model="dataSwapantau[i].unit"
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                  type="text"
                  placeholder="Unit..."
                >
              </td>
            </tr>
          </table>
        </div>
        <div class="tw-py-4 tw-px-6 tw-flex tw-justify-center tw-bg-gray-300">
          <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Save
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
    const toggle = reactive({
      debitInlet: true,
      debitOutlet: true
    })

    // data
    const dataSwapantau = reactive([
      {
        id: 'cod',
        text: 'COD',
        inlet: 0,
        outlet: 100,
        unit: 'mg/l'
      },
      {
        id: 'bod',
        text: 'BOD',
        inlet: 0,
        outlet: 44.54,
        unit: 'mg/l'
      },
      {
        id: 'tss',
        text: 'TSS',
        inlet: 0,
        outlet: 80.84,
        unit: 'mg/l'
      },
      {
        id: 'ph',
        text: 'pH',
        inlet: 0,
        outlet: '6 - 9',
        unit: '-'
      },
      {
        id: 'oil',
        text: 'Lemak Minyak',
        inlet: 0,
        outlet: 2.82,
        unit: 'mg/l'
      },
      {
        id: 'amonia',
        text: 'Amonia',
        inlet: 0,
        outlet: 10,
        unit: 'mg/l'
      },
      {
        id: 'fe',
        text: 'Fe',
        inlet: 0,
        outlet: 3,
        unit: 'mg/l'
      },
      {
        id: 'cu',
        text: 'Cu',
        inlet: 0,
        outlet: 1,
        unit: 'mg/l'
      },
      {
        id: 'coliform',
        text: 'Total Coliform',
        inlet: 0,
        outlet: 3000,
        unit: '/100mm'
      }
    ])

    return {
      footerMenu,
      goBack,
      dataSwapantau,
      toggle
    }
  }
}
</script>
