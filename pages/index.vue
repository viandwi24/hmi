/* eslint-disable vue/no-v-html */
<template>
  <div class="page">
    <div class="navbar">
      <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-1">
      <div class="page-title">
        Page 0{{ (activePage == 'overview' ? '1' : '2') }}
        - {{ (activePage == 'overview' ? 'Overview' : 'Submersible') }}
        Waste Water Treatment Plant
      </div>
      <div class="menu">
        <div class="actions">
          <div class="item clicked" :class="`${(controls.showPanelInfo || controls.showPanelComponent) ? 'selected' : ''}`" @click="() => { controls.showPanelInfo = !controls.showPanelInfo; controls.showPanelComponent = !controls.showPanelComponent; saveOption(); }">
            <img src="img/menu/Item View.svg" class="tw-mt-2">
            <div>
              Item View
            </div>
          </div>
          <div class="item clicked" :class="`${(componentsHaveAlarm.length > 0) ? 'red' : ''}`" @click="showAlarmPanel = !showAlarmPanel">
            <img src="img/menu/Alarm.svg">
            <div>
              Alarm
            </div>
          </div>
        </div>
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
    <div :key="renderComponent" class="screen tw-relative tw-flex-1">
      <div id="line-spotlight" class="tw-z-20" />
      <div class="controls left">
        <div class="controls-container">
          <div class="toggle" @click="togglePanelLeft">
            Show/Hide
          </div>
          <div class="group">
            <div class="header">
              Controls
            </div>
            <div class="content">
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Panel Info
                </div>
                <div class="tw-w-1/2">
                  <label class="flex items-center space-x-3">
                    <input
                      v-model="controls.showPanelInfo"
                      type="checkbox"
                      name="checked-demo"
                      class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      @change="saveOption"
                    >
                    <span class="text-gray-900 font-medium">Enable</span>
                  </label>
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Panel Comp.
                </div>
                <div class="tw-w-1/2">
                  <label class="flex items-center space-x-3">
                    <input
                      v-model="controls.showPanelComponent"
                      type="checkbox"
                      name="checked-demo"
                      class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      @change="saveOption"
                    >
                    <span class="text-gray-900 font-medium">Enable</span>
                  </label>
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Obj Scale
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <input
                    v-model="controls.objScale"
                    class="rounded-lg overflow-hidden appearance-none bg-gray-400 tw-w-full"
                    type="range"
                    min="0.2"
                    max="2"
                    step="0.05"
                    value="0.5"
                    @change="saveOption"
                  >
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Obj X
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <input
                    v-model="controls.objX"
                    class="rounded-lg overflow-hidden appearance-none bg-gray-400 tw-w-full"
                    type="range"
                    min="-1920"
                    max="1920"
                    step="0.1"
                    value="0"
                    @change="saveOption"
                  >
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Obj Y
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <input
                    v-model="controls.objY"
                    class="rounded-lg overflow-hidden appearance-none bg-gray-400 tw-w-full"
                    type="range"
                    min="-1920"
                    max="1920"
                    step="0.1"
                    value="0"
                    @change="saveOption"
                  >
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Refresh
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <button class="tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-800 tw-p-1 tw-rounded-sm tw-text-xs" @click="forceRerender">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="header">
              Components
            </div>
            <div class="content">
              <ul class="tw-list-disc tw-ml-4">
                <li
                  v-for="(item, i) in components"
                  :key="i"
                  class="tw-cursor-pointer hover:tw-text-blue-400"
                  :class="{ 'tw-text-blue-500': (componentSelected !== null && item.name === componentSelected.name) }"
                  @click="componentClicked(item)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="group">
            <div class="header">
              Testing
            </div>
            <div class="content tw-space-y-1">
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Send Alarm
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <button class="tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-800 tw-p-1 tw-rounded-sm tw-text-xs" @click="toggleAlarm">
                    Toggle
                  </button>
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Ch. lvl
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <button class="tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-800 tw-p-1 tw-rounded-sm tw-text-xs" @click="toggleChLvl">
                    Toggle
                  </button>
                </div>
              </div>
              <div class="tw-flex tw-w-full">
                <div class="tw-w-1/2">
                  Test DB
                </div>
                <div class="tw-w-1/2 tw-flex">
                  <button class="tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-800 tw-p-1 tw-rounded-sm tw-text-xs" @click="test">
                    test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showAlarmPanel" class="controls right danger">
        <div class="controls-container">
          <div class="group">
            <div class="header">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="tw-mx-1 tw-text-red-400" />
              <span class="tw-text-red-400">ALARM!!!</span>
            </div>
            <div class="content">
              <div v-if="componentsHaveAlarm.length == 0">
                None Component Have Alarm.
              </div>
              <ul class="tw-list-disc tw-ml-4">
                <li
                  v-for="(item, i) in componentsHaveAlarm"
                  :key="i"
                  class="tw-cursor-pointer tw-text-red-400"
                  @click="componentClicked(item)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="controls lg bottom left data-swapantau" @click="toggleDataSwap">
        <div class="controls-container">
          <div class="group">
            <div class="header tw-text-center">
              Data Swapantau Ipal
            </div>
            <div class="content">
              <table class="tw-w-full tw-table-auto">
                <tr>
                  <th class="tw-text-left">
                    Name
                  </th>
                  <th class="tw-text-left">
                    Inlet
                  </th>
                  <th class="tw-text-left">
                    Outlet
                  </th>
                  <th class="tw-text-right">
                    Unit
                  </th>
                </tr>
                <tr v-for="(item, i) in dataSwapantau" :key="i" class="tw-cursor-pointer hover:tw-text-gray-800 hover:tw-bg-gray-200" @click="changeDataSwap(i)">
                  <td width="50%">
                    {{ item.text }}
                  </td>
                  <td width="20%">
                    {{ item.inlet }}
                  </td>
                  <td width="20%">
                    {{ item.outlet }}
                  </td>
                  <td width="10%" class="tw-text-right">
                    {{ item.unit }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="obj-container" :style="{ transform: `scale(${controls.objScale}) translate(${controls.objX}px, ${controls.objY}px)` }">
        <img v-if="activePage == 'overview'" src="img/machine/all.png" class="overview">
        <img v-if="activePage == 'submersible'" src="img/machine/submersible.png" class="overview">
        <div class="layer-components">
          <div class="area-name">
            <div
              v-for="(item, i) in areasName"
              :id="`area-${item.id}`"
              :key="i"
              :class="(typeof item.meta.direction != 'undefined' ? item.meta.direction : 'bottom-left')"
            >
              <div
                class="area-container"
                :style="{
                  'visibility': (
                    (typeof item.meta.page !== 'undefined') ? (item.meta.page === activePage ? 'visible' : 'hidden') : (activePage == 'overview' ? 'visible' : 'hidden')
                  )
                }"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
          <div class="components">
            <div
              v-for="(item, i) in components"
              :key="i"
              :style="{
                'visibility': (
                  (typeof item.meta.page !== 'undefined') ? (item.meta.page === activePage ? 'visible' : 'hidden') : (activePage == 'overview' ? 'visible' : 'hidden')
                )
              }"
            >
              <img
                :id="`component-${item.id}`"
                :src="`img/machine/${(item.onImgShow(item) == null) ? (item.meta.defaultImg) : item.onImgShow(item)}.png`"
                :style="{
                  'opacity': (item.onImgShow(item) == null ? 0 : 1)
                }"
                class="component"
                :class="{ 'active': (componentSelected != null && componentSelected.id === item.id) }"
                :title="item.name"
                :alt="item.name"
                @click="(typeof item.meta.componentSpot == 'undefined') ? componentClicked(item) : () => {}"
              >
            </div>
          </div>
          <div v-if="controls.showPanelComponent" class="panels">
            <div
              v-for="(item, i) in components"
              :id="`panel-${item.id}`"
              :key="i"
              :style="{
                'visibility': (
                  (typeof item.meta.page !== 'undefined') ? (item.meta.page === activePage ? 'visible' : 'hidden') : (activePage == 'overview' ? 'visible' : 'hidden')
                )
              }"
              class="panel"
              :class="`
                ${((typeof item.meta.panel != 'undefined' && typeof item.meta.panel.position != 'undefined') ? item.meta.panel.position : '')}
                ${((typeof item.meta.panel != 'undefined' && typeof item.meta.panel.class != 'undefined') ? item.meta.panel.class : '')}
              `"
            >
              <div class="panel-container" v-html="item.panel(item)" />
            </div>
          </div>
          <div v-if="controls.showPanelInfo" class="panels">
            <div
              v-for="(item, i) in panels"
              :id="`panel-${item.id}`"
              :key="i"
              class="panel"
              :class="`panel-${item.type} ${(typeof item.meta.direction != 'undefined' ? item.meta.direction : '')} ${(typeof item.class != 'undefined' ? item.class : '')}`"
              :style="`${(typeof item.meta.page !== 'undefined' ? (item.meta.page === activePage ? '' : 'display: none;') : (activePage == 'overview' ? '' : 'display: none;') )}`"
            >
              <div v-if="item.type == 'default'" class="panel-container" v-html="item.panel(item, components, this)" />
              <div v-else-if="item.type == 'level'" class="tw-relative">
                <div class="panel-container">
                  <div class="percentage">
                    {{ (typeof item.state.percent === 'function') ? item.state.percent(item) : item.state.percent }}%
                  </div>
                  <div class="progress">
                    <div class="progress-bar" :style="{ height: `${(typeof item.state.percent === 'function') ? item.state.percent(item) : item.state.percent}%` }" />
                  </div>
                  <div>lvl</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-container">
        <div
          v-if="notifyLoading.show"
          style="background: rgba(0, 0, 0, .5);"
          class="tw-fixed tw-w-full tw-h-full"
        />
        <div v-if="componentSelected != null" class="menu-container">
          <div class="content">
            <div class="tw-w-full">
              <div v-for="(group, i) in componentSelected.menu(componentSelected)" :key="i" class="group">
                <div class="group-title">
                  {{ group.name }}
                </div>
                <div class="group-content">
                  <div v-for="(item, j) in group.child" :key="j" :class="(typeof group.class == 'undefined' ? '' : group.class)">
                    <button v-if="item.type == 'button'" :class="item.class" :disabled="item.disable" @click="(item.onClick) ? item.onClick(componentSelected, components, ctx) : false">
                      <font-awesome-icon v-if="item.icon" :icon="item.icon" class="tw-mx-1" />
                      <span>{{ item.text }}</span>
                    </button>
                    <div v-else-if="item.type == 'display'">
                      <div v-html="item.render(componentSelected, components, ctx)" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="group">
                <div class="group-title">
                  Description
                </div>
                <div class="group-content">
                  {{ componentSelected.description }} / {{ componentSelected.name }}
                </div>
              </div>
              <div class="group">
                <div class="group-content tw-mt-4">
                  <button class="icon red" @click="componentOnClose(componentSelected)">
                    <font-awesome-icon :icon="['fas', 'times']" class="tw-mx-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nav-container">
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
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useContext,
  useStore,
  watch
} from '@nuxtjs/composition-api'

import componentStateMapping from '@/api/componentStateMapping.js'
import panelStateMapping from '@/api/panelStateMapping.js'
import componentMBW01 from '@/api/components/mbw01.js'
import componentMBW02 from '@/api/components/mbw02.js'
import componentMT021 from '@/api/components/mto21.js'
import componentMT022 from '@/api/components/mto22.js'
import componentMT023 from '@/api/components/mto23.js'
import componentMT024 from '@/api/components/mto24.js'
import componentMDC01 from '@/api/components/mdc01.js'
import componentMCT01 from '@/api/components/mct01.js'
import componentVLV01 from '@/api/components/vlv01.js'
import componentVLV02 from '@/api/components/vlv02.js'
import componentMSB01 from '@/api/components/msb01.js'
import componentMSB02 from '@/api/components/msb02.js'
import componentMSB03 from '@/api/components/msb03.js'
import componentMSB04 from '@/api/components/msb04.js'
import componentMSB05 from '@/api/components/msb05.js'
import componentMSB06 from '@/api/components/msb06.js'

export default {
  setup () {
    const ctx = useContext()
    const { app, route } = ctx
    const store = useStore()
    const notifyLoading = computed(() => store.state.notifyLoading)

    // menu footer
    const resetUi = () => {
      // components.forEach((e) => {
      //   try {
      //     const a = document.querySelector(`#component-${e.id}`)
      //     if (typeof a.dataset.originalWidth !== 'undefined') {
      //       delete a.dataset.originalWidth
      //     }
      //   } catch (error) {
      //   }
      // })
    }
    const footerMenu = reactive([
      {
        id: 'footer-menu-1',
        text: 'Overview',
        icon: 'Overview',
        onClick: () => {
          activePage.value = 'overview'
          resetUi()
        }
      },
      {
        id: 'footer-menu-2',
        text: 'Submersible',
        icon: 'Submersible',
        onClick: () => {
          activePage.value = 'submersible'
          resetUi()
        }
      },
      {
        id: 'footer-menu-3',
        text: 'Input Data',
        icon: 'Input Data',
        onClick: () => {
          app.router.push('/input-data')
          // activePage.value = 'input-data'
        }
      },
      {
        id: 'footer-menu-4',
        text: 'Report',
        icon: 'Report',
        onClick: () => {
          app.router.push('/report')
          // activePage.value = 'report'
        }
      },
      {
        id: 'footer-menu-5',
        text: 'Access Lvl',
        icon: 'Access Level',
        onClick: () => {
          app.router.push('/access-level')
          // activePage.value = 'access-level'
        }
      }
    ])

    // controls
    const controls = reactive({
      showControl: true,
      showPanelInfo: true,
      showPanelComponent: true,
      objScale: 1,
      objX: 0,
      objY: 0,
      showDataSwap: true
    })
    const showAlarmPanel = ref(false)
    // const activePage = ref('submersible')
    const activePage = ref('overview')

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
        id: 'ce',
        text: 'Suhu',
        inlet: 0,
        outlet: 0,
        unit: 'c'
      },
      {
        id: 'coliform',
        text: 'Total Coliform',
        inlet: 0,
        outlet: 3000,
        unit: '/100mm'
      }
    ])

    // panels
    const buildPercent = (item) => {
      let res
      if (item.state.high) {
        res = 100
      } else if (item.state.med) {
        res = 80
      } else if (item.state.low) {
        res = 30
      } else {
        res = 0
      }
      return res
    }
    const panels = reactive([
      {
        type: 'level',
        id: 'bak',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 445,
            y: 237
          },
          direction: 'top',
          page: 'overview'
        }
      },
      {
        type: 'level',
        id: 'costic',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 690,
            y: 146
          },
          direction: 'bottom',
          page: 'overview'
        }
      },
      {
        type: 'level',
        id: 'decan-box',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 1305,
            y: 415
          },
          direction: 'bottom',
          page: 'overview'
        }
      },
      {
        type: 'level',
        id: 'influent',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 559,
            y: 460
          },
          direction: 'top',
          page: 'overview'
        }
      },
      {
        type: 'level',
        id: 'kultur',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 1481,
            y: 580
          },
          direction: 'bottom',
          page: 'overview'
        }
      },
      {
        type: 'level',
        id: 'iceas',
        state: {
          high: 0,
          med: 0,
          low: 0,
          percent: buildPercent
        },
        meta: {
          position: {
            x: 941,
            y: 366
          },
          direction: 'top',
          page: 'overview'
        }
      },
      {
        type: 'default',
        id: 'debit_inlet',
        state: {
          flow: 250,
          totalizer: 25000
        },
        meta: {
          position: {
            x: 636,
            y: 264
          },
          direction: 'top'
        },
        panel: (item) => {
          return `
            <div class="header">Debit Inlet</div>
            <div class="content">
              <div class="tw-mb-1">Flow ${item.state.flow}L/h</div>
              <div>Totalizer</div>
              <div>${item.state.totalizer}</>
            </div>
          `
        }
      },
      {
        type: 'default',
        id: 'debit_outlet',
        state: {
          flow: 250,
          totalizer: 25000
        },
        meta: {
          position: {
            x: 1377,
            y: 519
          },
          direction: 'top'
        },
        panel: (item) => {
          return `
            <div class="header">Debit Outlet</div>
            <div class="content">
              <div class="tw-mb-1">Flow ${item.state.flow}L/h</div>
              <div>Totalizer</div>
              <div>${item.state.totalizer}</>
            </div>
          `
        }
      },
      {
        type: 'default',
        id: 'ph_meter',
        state: {
          meter_text: 'Ideal',
          meter: 6
        },
        meta: {
          position: {
            x: 690,
            y: 307
            // x: 665,
            // y: 307
          },
          direction: 'bottom'
        },
        // class: 'no-line',
        panel: (item) => {
          return `
            <div class="header">pH Meter</div>
            <div class="content">
              <div>${item.state.meter_text}</>
              <div class="tw-text-lg">${item.state.meter}</>
            </div>
          `
        }
      }
    ])
    const areasName = reactive([
      {
        id: 'tanki',
        text: 'Tangki Penampung',
        meta: {
          position: {
            x: 445,
            y: 237
          },
          direction: 'bottom-left',
          page: 'overview'
        }
      },
      {
        id: 'oil-sludge',
        text: 'Oil Sludge',
        meta: {
          position: {
            x: 519,
            y: 338
          },
          direction: 'bottom-left',
          page: 'overview'
        }
      },
      {
        id: 'influent',
        text: 'Influent',
        meta: {
          position: {
            x: 560,
            y: 370
          },
          direction: 'bottom-left large',
          page: 'overview'
        }
      },
      {
        id: 'pre-react',
        text: 'Pre React',
        meta: {
          position: {
            x: 647,
            y: 406
          },
          direction: 'bottom-left large',
          page: 'overview'
        }
      },
      {
        id: 'iceas',
        text: 'Iceas',
        meta: {
          position: {
            x: 881,
            y: 513
          },
          direction: 'bottom-left',
          page: 'overview'
        }
      },
      {
        id: 'costic',
        text: 'Costic',
        meta: {
          position: {
            x: 690,
            y: 146
          },
          direction: 'top-right',
          page: 'overview'
        }
      },
      {
        id: 'kultur',
        text: 'Kultur',
        meta: {
          position: {
            x: 1481,
            y: 588
          },
          direction: 'top-right large',
          page: 'overview'
        }
      },
      {
        id: 'decan-box',
        text: 'Decan Box',
        meta: {
          position: {
            x: 1305,
            y: 435
          },
          direction: 'top-right large',
          page: 'overview'
        }
      },
      {
        id: 'holding',
        text: 'Holding',
        meta: {
          position: {
            x: 1239,
            y: 560
          },
          direction: 'top-left extra-large',
          page: 'overview'
        }
      }
    ])

    // components
    const componentSelected = ref(null)
    const components = reactive([
      componentMBW02,
      componentMBW01,

      componentVLV01,
      componentVLV02,

      componentMT021,
      componentMT022,
      componentMT023,
      componentMT024,

      componentMDC01,
      componentMCT01,

      componentMSB01,
      componentMSB02,
      componentMSB03,
      componentMSB04,
      componentMSB05,
      componentMSB06
    ])
    const componentOnClose = (item) => {
      const menuDiv = document.querySelector('div.footer')
      menuDiv.animate([
        { opacity: 1, transform: 'translateY(0px)' },
        { opacity: 0, transform: 'translateY(120px)' }
      ], {
        duration: 500
      })
      setTimeout(() => {
        document.querySelector('#line-spotlight').innerHTML = ''
        componentSelected.value = null
        menuDiv.animate([
          { opacity: 0, transform: 'translateY(120px)' },
          { opacity: 1, transform: 'translateY(0px)' }
        ], {
          duration: 500
        })
      }, 400)
    }
    const componentClicked = (item) => {
      const menuDiv = document.querySelector('div.footer')

      // if (typeof componentSelected.value !== 'undefined' && componentSelected.value !== null) {
      //   componentOnClose(componentSelected.value)
      // }

      menuDiv.animate([
        { opacity: 1, transform: 'translateY(0px)' },
        { opacity: 0, transform: 'translateY(120px)' }
      ], {
        duration: 500
      })
      setTimeout(() => {
        componentSelected.value = item
        if (typeof componentSelected.value.meta.page !== 'undefined') {
          activePage.value = componentSelected.value.meta.page
        } else {
          activePage.value = 'overview'
        }
        resetUi()
        if (typeof item.onClick !== 'undefined') {
          item.onClick(item)
        }
        menuDiv.animate([
          { opacity: 0, transform: 'translateY(120px)' },
          { opacity: 1, transform: 'translateY(0px)' }
        ], {
          duration: 500
        })
      }, 400)
    }
    const componentsHaveAlarm = computed(() => {
      const result = []
      components.forEach((item) => {
        if (item.checkAlarm(item)) {
          result.push(item)
        }
      })
      return result
    })

    // functions
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect()
      return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
      }
    }
    const adjustLine = (div1, div2, color, thickness) => {
      let off1, x1
      if (div1 instanceof Element) {
        off1 = getOffset(div1)
        x1 = off1.left + (off1.width / 2)
      } else {
        const overview = document.querySelector('img.overview')
        const overviewOriginal = 1920
        const overviewResult = overview.clientWidth
        const clientResultW = (overviewResult * div1.size.w) / overviewOriginal
        const clientResultH = (overviewResult * div1.size.h) / overviewOriginal
        const clientX = (overviewResult * div1.position.x) / overviewOriginal
        const clientY = (overviewResult * div1.position.y) / overviewOriginal
        off1 = {
          left: clientX,
          top: clientY,
          width: clientResultW,
          height: clientResultH
        }
        x1 = off1.left + (off1.width / 2)
      }
      const off2 = getOffset(div2)
      const y1 = off1.top + (off1.height / 2)
      // top right
      const x2 = window.innerWidth / 2
      const y2 = off2.top
      // distance
      const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
      // center
      const cx = ((x1 + x2) / 2) - (length / 2)
      const cy = ((y1 + y2) / 2) - (thickness / 2)
      // angle
      const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI)
      // make hr
      const htmlLine = "<div style='padding:0px; margin:0px; height:" +
        thickness + 'px; background-color:' + color +
        '; line-height:1px; position:fixed; left:' + cx +
        'px; top:' + cy + 'px; width:' + length +
        'px; -moz-transform:rotate(' + angle +
        'deg); -webkit-transform:rotate(' + angle + 'deg); -o-transform:rotate(' + angle +
        'deg); -ms-transform:rotate(' + angle + 'deg); transform:rotate(' + angle + "deg);' />"

      // awe
      document.querySelector('#line-spotlight').innerHTML = htmlLine
    }

    // others
    const renderComponent = ref(0)
    let timerRezise
    const forceRerender = () => {
      clearInterval(timerRezise)
      renderComponent.value = renderComponent.value + 1
      setTimeout(() => runTimerUiRender(), 500)
    }
    const saveOption = () => {
      localStorage.setItem('controls', JSON.stringify(controls))
    }
    const runTimerUiRender = () => {
      try {
        const overview = document.querySelector('img.overview')
        const overviewOriginal = 1920
        timerRezise = setInterval(() => {
          try {
            const overviewResult = overview.clientWidth

            // areas name
            areasName.forEach((e) => {
              const area = document.querySelector(`#area-${e.id}`)
              if (typeof area === 'undefined') {
                return
              }
              const clientOriginal = (typeof area.dataset.originalWidth === 'undefined') ? area.clientWidth : area.dataset.originalWidth
              const areaX = (overviewResult * e.meta.position.x) / overviewOriginal
              const areaY = (overviewResult * e.meta.position.y) / overviewOriginal
              area.dataset.originalWidth = clientOriginal
              if (area.classList.contains('bottom-left') && area.classList.contains('large')) {
                area.style.top = `${(areaY + (125))}px`
                area.style.left = `${((areaX) - (area.clientWidth + 90))}px`
              } else if (area.classList.contains('bottom-left')) {
                area.style.top = `${(areaY + (25))}px`
                area.style.left = `${((areaX) - (area.clientWidth + 90))}px`
              } else if (area.classList.contains('top-right') && area.classList.contains('large')) {
                area.style.top = `${(areaY - (165))}px`
                area.style.left = `${((areaX) + 90)}px`
              } else if (area.classList.contains('top-left') && area.classList.contains('extra-large')) {
                area.style.top = `${(areaY - (265))}px`
                area.style.left = `${((areaX) - 120)}px`
              } else if (area.classList.contains('top-right')) {
                area.style.top = `${(areaY - (25))}px`
                area.style.left = `${((areaX) + 90)}px`
              }
            })

            // components ui generate pos
            components.forEach((e) => {
              // component
              const a = document.querySelector(`#component-${e.id}`)
              const clientOriginal = (typeof a.dataset.originalWidth === 'undefined') ? a.clientWidth : a.dataset.originalWidth
              const clientResult = (overviewResult * clientOriginal) / overviewOriginal
              const clientX = (overviewResult * e.meta.position.x) / overviewOriginal
              const clientY = (overviewResult * e.meta.position.y) / overviewOriginal
              const clientH = (overviewResult * clientResult) / overviewOriginal
              a.dataset.originalWidth = clientOriginal
              a.style.width = `${clientResult}px`
              a.style.top = `${clientY}px`
              a.style.left = `${clientX}px`
              // spot
              if (typeof e.meta.componentSpot !== 'undefined') {
                const componentSpot = e.meta.componentSpot
                const componentDom = document.querySelector(`#component-${e.id}`)
                if (typeof componentDom !== 'undefined') {
                  if (componentDom.parentElement.lastElementChild.id !== 'spot') {
                    const b = document.createElement('div')
                    b.style.display = 'block'
                    b.style.position = 'absolute'
                    b.style.opacity = 0
                    b.style.background = 'red'
                    b.style.zIndex = '99'
                    b.style.width = `${componentSpot.size.w}px`
                    b.style.height = `${componentSpot.size.h}px`
                    b.style.top = 0
                    b.style.left = 0
                    b.id = 'spot'
                    b.addEventListener('click', () => componentClicked(e))
                    componentDom.parentElement.appendChild(b)
                  } else {
                    const spotDom = componentDom.parentElement.lastElementChild
                    const clientOriginal = (typeof spotDom.dataset.originalWidth === 'undefined') ? spotDom.clientWidth : spotDom.dataset.originalWidth
                    const panelX = (overviewResult * componentSpot.position.x) / overviewOriginal
                    const panelY = (overviewResult * componentSpot.position.y) / overviewOriginal
                    spotDom.style.top = `${panelY}px`
                    spotDom.style.left = `${panelX}px`
                    const sizeW = (overviewResult * componentSpot.size.w) / overviewOriginal
                    const sizeH = (overviewResult * componentSpot.size.h) / overviewOriginal
                    spotDom.style.width = `${sizeW}px`
                    spotDom.style.height = `${sizeH}px`
                    spotDom.dataset.originalWidth = clientOriginal
                  }
                }
              }

              // panel
              if (controls.showPanelComponent) {
                const panelGap = 35
                const panel = document.querySelector(`#panel-${e.id}`)
                let panelY = 0
                let panelX = 0
                if (typeof e.meta.componentSpot === 'undefined') {
                  if (panel.classList.contains('right')) {
                    panelY = (clientY - (9) + (clientH / 2))
                    panelX = (clientX + (panelGap + (clientResult / 2)))
                  } else if (panel.classList.contains('bottom-left')) {
                    panelY = (clientY - (9) + (clientH))
                    panelX = (clientX + (clientResult / 2) - ((panel.clientWidth) + (panelGap)))
                  } else {
                    panelY = (clientY - (9) + (clientH / 2))
                    panelX = (clientX + (clientResult / 2) - ((panel.clientWidth) + (panelGap)))
                  }
                }
                if (typeof e.meta.componentSpot !== 'undefined') {
                  const componentSpot = e.meta.componentSpot
                  const componentDom = document.querySelector(`#component-${e.id}`)
                  if (componentDom.parentElement.lastElementChild.id === 'spot') {
                    const spotX = (overviewResult * componentSpot.position.x) / overviewOriginal
                    const spotY = (overviewResult * componentSpot.position.y) / overviewOriginal
                    const spotW = (overviewResult * componentSpot.size.w) / overviewOriginal
                    const spotH = (overviewResult * componentSpot.size.h) / overviewOriginal
                    // const spotDom = componentDom.parentElement.lastElementChild
                    if (panel.classList.contains('right')) {
                      panelY = (spotY + (spotH / 2))
                      panelX = (spotX + ((spotW / 2) + panelGap))
                    } else if (panel.classList.contains('bottom-left')) {
                      panelY = (spotY + (spotH + panelGap))
                      panelX = (spotX + (clientResult / 2) - ((panel.clientWidth * 2) + (panelGap)))
                    } else {
                      panelY = (spotY + (spotH / 2))
                      panelX = (spotX + ((spotW / 2)) - (panel.clientWidth + panelGap + 10))
                    }
                  }
                }

                // awe
                panel.style.top = `${panelY}px`
                panel.style.left = `${panelX}px`

                // ada
                // const defaultScale = 1
                // let scale = ((defaultScale) - Math.abs(defaultScale - controls.objScale))
                // scale = (scale < 0.8) ? 0.8 : scale
                // panel.style.transform = `scale(${scale})`
              }
            })

            // panels ui generate pos
            if (controls.showPanelInfo) {
              panels.forEach((e) => {
                const panel = document.querySelector(`#panel-${e.id}`)
                if (typeof panel === 'undefined') {
                  return
                }
                const panelOriginalW = (typeof panel.dataset.originalWidth === 'undefined') ? panel.clientWidth : panel.dataset.originalWidth
                const panelX = (overviewResult * e.meta.position.x) / overviewOriginal
                const panelY = (overviewResult * e.meta.position.y) / overviewOriginal
                const panelW = (overviewResult * panelOriginalW) / overviewOriginal
                // const panelH = (overviewResult * panelW) / overviewOriginal
                panel.style.top = `${panelY}px`
                panel.style.left = `${panelX}px`
                panel.dataset.originalWidth = panelOriginalW
                if (panel.classList.contains('panel-level')) {
                  if (panel.classList.contains('top')) {
                    panel.style.top = `${(panelY - (panel.clientHeight))}px`
                    panel.style.left = `${(panelX - ((panelW / 2) + 3))}px`
                  } else {
                    panel.style.top = `${(panelY + 15)}px`
                    panel.style.left = `${(panelX - ((panelW / 2) + 3))}px`
                  }
                }

                if (panel.classList.contains('panel-default')) {
                  if (panel.classList.contains('top')) {
                    panel.style.top = `${(panelY - (getOffset(panel).height + 95))}px`
                    panel.style.left = `${(panelX - (panel.clientWidth / 2))}px`
                  } else if (panel.classList.contains('bottom')) {
                    panel.style.top = `${(panelY + (panel.clientHeight + 50))}px`
                    panel.style.left = `${(panelX - (panel.clientWidth / 2))}px`
                  }
                }
              })
            }

            if (componentSelected.value !== null) {
              if (typeof componentSelected.value.meta.componentSpot !== 'undefined') {
                const componentDom = document.querySelector(`#component-${componentSelected.value.id}`)
                adjustLine(
                  componentDom.parentElement.lastElementChild,
                  document.querySelector('div.footer'),
                  '#dddddd', 1
                )
              } else {
                adjustLine(
                  document.querySelector(`#component-${componentSelected.value.id}`),
                  document.querySelector('div.footer'),
                  '#dddddd', 1
                )
              }
            }
          } catch (errTwo) {
          }
        }, 50)
      } catch (errOne) {
        console.log('ane dah')
      }
    }

    // window listenner
    const onWindowScroll = function (e) {
      // shorcut
      if (keyPressed.value !== null) {
        if (keyPressed.value.keyCode === 17) {
          const add = (e.deltaY < 0) ? 0.05 : -0.05
          controls.objScale = parseFloat(controls.objScale) + add
        } else if (keyPressed.value.keyCode === 16) {
          const add = (e.deltaX < 0) ? -25 : 25
          controls.objX = parseFloat(controls.objX) + add
        }
      } else {
        const add = (e.deltaY < 0) ? -25 : 25
        controls.objY = parseFloat(controls.objY) + add
      }
      saveOption()
    }
    const keyPressed = ref(null)
    const onWindowKeyDown = function (e) {
      keyPressed.value = e
    }
    const onWindowKeyUp = function (e) {
      keyPressed.value = null
    }

    // life cylce
    onMounted(() => {
      // ctx = document.createElement('canvas').getContext('2d')
      if (localStorage.getItem('controls') !== null) {
        const a = JSON.parse(localStorage.getItem('controls'))
        Object.entries(a).forEach((item) => {
          const [key, value] = item
          controls[key] = value
        })
      }
      clearInterval(timerRezise)
      runTimerUiRender()
      // componentClicked(components[0])
      if (!controls.showControl) {
        togglePanelLeft(false)
      } else {
        saveOption()
      }

      if (!controls.showDataSwap) {
        toggleDataSwap()
      } else {
        saveOption()
      }

      if (typeof route.value.query.page !== 'undefined') {
        activePage.value = route.value.query.page
      }

      // get data
      store.dispatch('component/fetchComponentState', { ctx })
    })
    onUnmounted(() => {
      forceRerender()
      clearTimeout(timerRezise)
      document.removeEventListener('mousewheel', onWindowScroll)
      document.removeEventListener('keydown', onWindowKeyDown)
      document.removeEventListener('keyup', onWindowKeyUp)
    })
    onBeforeMount(() => {
      document.addEventListener('mousewheel', onWindowScroll)
      document.addEventListener('keydown', onWindowKeyDown)
      document.addEventListener('keyup', onWindowKeyUp)
    })

    // toggle
    const toggleAlarm = () => {
      components.forEach((component, i) => {
        Object.keys(component.state).forEach(function (key) {
          const item = component.state[key]
          if (key.includes('alarm')) {
            if (typeof item === 'boolean') {
              components[i].state[key] = !item
            }
          }
        })
      })
      // components[1].state.alarm_1 = !components[1].state.alarm_1
      // setTimeout(() => console.log(componentSelected), 1000)
    }
    const toggleChLvl = () => {
      panels.forEach((panel, i) => {
        if (panel.type === 'level') {
          panel.state.percent = (panel.state.percent === 30) ? 80 : 30
        }
      })
    }
    const imgClick = (event) => {
      const ctx = document.createElement('canvas').getContext('2d')
      const el = event.target
      // Get click coordinates
      const x = event.pageX - el.offsetLeft
      const y = event.pageY - el.offsetTop
      const w = ctx.canvas.width = el.width
      const h = ctx.canvas.height = el.height

      // Draw image to canvas
      // and read Alpha channel value
      ctx.drawImage(el, 0, 0, w, h)
      const alpha = ctx.getImageData(x, y, 1, 1).data[3]

      // If pixel is transparent,
      // retrieve the element underneath and trigger it's click event
      if (alpha === 0) {
        // el.style.pointerEvents = 'none'
        alert('ga ada cok ' + event.alt)
        const next = document.elementFromPoint(event.clientX, event.clientY).click()
        alert(next.alt)
        el.style.pointerEvents = 'auto'
      } else {
        alert('LOGO clicked!')
      }
    }
    const togglePanelLeft = (save = true) => {
      const panel = document.querySelector('.controls.left')
      const show = (typeof panel.dataset.show === 'undefined') ? true : (panel.dataset.show === 'true' || panel.dataset.show === true)
      panel.dataset.show = !show
      controls.showControl = !show

      if (show) {
        panel.style.transform = 'translateX(-205px)'
        panel.animate([
          { transform: 'translateX(0px)' },
          { transform: 'translateX(-200px)' }
        ], {
          duration: 500
        })
      } else {
        panel.style.transform = 'translateX(0px)'
        panel.animate([
          { transform: 'translateX(-200px)' },
          { transform: 'translateX(0px)' }
        ], {
          duration: 500
        })
      }

      if (save) {
        saveOption()
      }
    }
    const togglePanelInfo = () => {
      controls.showPanelInfo = !controls.showPanelInfo
    }
    const togglePanelComponent = () => {
      controls.showPanelComponent = !controls.showPanelComponent
    }
    const toggleDataSwap = () => {
      const e = document.querySelector('.data-swapantau')
      if (e.classList.contains('collapsed')) {
        e.classList.remove('collapsed')
        controls.showDataSwap = true
      } else {
        e.classList.add('collapsed')
        controls.showDataSwap = false
      }
      saveOption()
    }
    const changeDataSwap = (i) => {
      app.router.push('/input-data')
      // const item = dataSwapantau[i]
      // const newValue = prompt(`Masukan data ${item.text} (satuan ${item.unit})`, item.value)
      // if (newValue != null && newValue) {
      //   dataSwapantau[i].value = newValue
      // }
    }

    // component state
    const componentStates = computed(() => store.state.component.states)
    watch(componentStates, (newValue, oldValue) => {
      try {
        newValue.forEach((item, i) => {
          let value = item.value
          if (item.tipedata === 'Bool') {
            value = (item.value === 1)
          }
          if (componentStateMapping[item.name] != null) {
            const destination = `${componentStateMapping[item.name]}`.split('.')
            const componentIndex = components.findIndex(component => component.id === destination[0])
            components[componentIndex].state[destination[1]] = value
          }
          if (panelStateMapping[item.name] != null) {
            const destination = `${panelStateMapping[item.name]}`.split('.')
            const panelIndex = panels.findIndex(component => component.id === destination[0])
            panels[panelIndex].state[destination[1]] = value
            console.log(value)
          }
        })
      } catch (error) {
      }
    })
    const test = () => {
      // store.commit('component/setState', {
      //   name: 'INFLUENT_VALVE_VLV01_Status',
      //   value: 1
      // })
      // store.commit('component/setState', {
      //   name: 'INFLUENT_VALVE_VLV01_AlarmFbF',
      //   value: 1
      // })
      // store.commit('component/setState', {
      //   name: 'INFLUENT_VALVE_VLV01_ManAut',
      //   value: 1
      // })
    }

    return {
      notifyLoading,
      ctx,
      areasName,
      activePage,
      showAlarmPanel,
      footerMenu,
      components,
      componentsHaveAlarm,
      panels,
      renderComponent,
      forceRerender,
      controls,
      saveOption,
      componentSelected,
      componentOnClose,
      onWindowScroll,
      componentClicked,
      togglePanelLeft,
      toggleAlarm,
      toggleChLvl,
      togglePanelComponent,
      togglePanelInfo,
      toggleDataSwap,
      imgClick,
      dataSwapantau,
      changeDataSwap,
      test
    }
  }
}
</script>

<style>
#line-spotlight{
  position:absolute;
  width:1px;
  background-color:red;
}
</style>
