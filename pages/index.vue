/* eslint-disable vue/no-v-html */
<template>
  <div class="page">
    <div class="navbar">
      <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-2">
      <div class="page-title">
        Page 01 - Overview Waste Water Treatment Plant
      </div>
      <div class="actions tw-flex tw-flex-row tw-space-x-2 tw-text-gray-200">
        <div>
          <font-awesome-icon :icon="['fas', 'user']" class="tw-text-4xl" />
        </div>
        <div class="tw-text-left">
          <div class="tw-text-sm">
            Username
          </div>
          <div class="tw-text-xs">
            Engineer
          </div>
        </div>
      </div>
    </div>
    <div :key="renderComponent" class="screen tw-relative tw-flex-1" @scroll="onWindowScroll">
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
            </div>
          </div>
        </div>
      </div>
      <div v-if="componentsHaveAlarm.length > 0" class="controls right danger">
        <div class="controls-container">
          <div class="group">
            <div class="header">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="tw-mx-1 tw-text-red-400" />
              <span class="tw-text-red-400">ALARM!!!</span>
            </div>
            <div class="content">
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
      <div class="controls lg bottom left">
        <div class="controls-container">
          <div class="group">
            <div class="header tw-text-center">
              Data Swapantau Outlet Ipal
            </div>
            <div class="content">
              <table class="tw-w-full tw-table-auto">
                <tr v-for="(item, i) in dataSwapantau" :key="i" class="tw-cursor-pointer hover:tw-text-gray-800 hover:tw-bg-gray-200" @click="changeDataSwap(i)">
                  <td width="60%">
                    {{ item.text }}
                  </td>
                  <td width="20%">
                    {{ item.value }}
                  </td>
                  <td width="20%">
                    {{ item.unit }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="obj-container" :style="{ transform: `scale(${controls.objScale}) translate(${controls.objX}px, ${controls.objY}px)` }">
        <img src="img/machine/all.png" class="overview">
        <div class="layer-components">
          <div class="components">
            <img
              v-for="(item, i) in components"
              :id="`component-${item.id}`"
              :key="i"
              :src="`img/machine/${(item.onImgShow(item) == null) ? (item.meta.defaultImg) : item.onImgShow(item)}.png`"
              :style="{ 'opacity': (item.onImgShow(item) == null ? 0 : 1) }"
              class="component"
              :class="{ 'active': (componentSelected != null && componentSelected.id === item.id) }"
              :title="item.name"
              :alt="item.name"
              @click="componentClicked(item)"
            >
          </div>
          <div v-if="controls.showPanelComponent" class="panels">
            <div
              v-for="(item, i) in components"
              :id="`panel-${item.id}`"
              :key="i"
              class="panel"
              :class="{ 'right': (typeof item.meta.panel != 'undefined' && item.meta.panel.position == 'right') }"
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
              :class="`panel-${item.type}`"
            >
              <div v-if="item.type == 'default'" class="panel-container" v-html="item.panel(item, components, this)" />
              <div v-else-if="item.type == 'level'" class="tw-relative">
                <div class="panel-container">
                  <div class="percentage">
                    {{ item.state.percent }}%
                  </div>
                  <div class="progress">
                    <div class="progress-bar" :style="{ height: `${item.state.percent}%` }" />
                  </div>
                  <div>lvl</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div v-if="componentSelected != null" class="menu-container">
          <div class="content">
            <div class="tw-w-full">
              <div v-for="(group, i) in componentSelected.menu(componentSelected)" :key="i" class="group">
                <div class="group-title">
                  {{ group.name }}
                </div>
                <div class="group-content">
                  <div v-for="(item, j) in group.child" :key="j" :class="(typeof group.class == 'undefined' ? '' : group.class)">
                    <button v-if="item.type == 'button'" :class="item.class" :disabled="item.disable" @click="item.onClick(componentSelected, item)">
                      <font-awesome-icon v-if="item.icon" :icon="item.icon" class="tw-mx-1" />
                      <span>{{ item.text }}</span>
                    </button>
                    <div v-else-if="item.type == 'display'">
                      <div v-html="item.render(componentSelected)" />
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
                  <button class="red" @click="componentOnClose(componentSelected)">
                    <font-awesome-icon :icon="['fas', 'times']" class="tw-mx-1" />
                    <span>Close</span>
                  </button>
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
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from '@nuxtjs/composition-api'

import componentMT021 from '@/api/components/mto21.js'
import componentMT022 from '@/api/components/mto22.js'
import componentMT023 from '@/api/components/mto23.js'
import componentMT024 from '@/api/components/mto24.js'
import componentMDC01 from '@/api/components/mdc01.js'
import componentMCT01 from '@/api/components/mct01.js'
import componentVLV01 from '@/api/components/vlv01.js'
import componentVLV02 from '@/api/components/vlv02.js'

export default {
  setup () {
    // data
    const dataSwapantau = reactive([
      {
        id: 'cod',
        text: 'COD',
        value: 100,
        unit: 'mg/l'
      },
      {
        id: 'bod',
        text: 'BOD',
        value: 44.54,
        unit: 'mg/l'
      },
      {
        id: 'tss',
        text: 'TSS',
        value: 80.84,
        unit: 'mg/l'
      },
      {
        id: 'ph',
        text: 'pH',
        value: '6 - 9',
        unit: '-'
      },
      {
        id: 'oil',
        text: 'Lemak Minyak',
        value: 2.82,
        unit: 'mg/l'
      },
      {
        id: 'amonia',
        text: 'Amonia',
        value: 10,
        unit: 'mg/l'
      },
      {
        id: 'fe',
        text: 'Fe',
        value: 3,
        unit: 'mg/l'
      },
      {
        id: 'cu',
        text: 'Cu',
        value: 1,
        unit: 'mg/l'
      },
      {
        id: 'coliform',
        text: 'Total Coliform',
        value: 3000,
        unit: '/100mm'
      }
    ])

    // panels
    const panels = reactive([
      {
        type: 'level',
        id: 'bak',
        state: {
          percent: 30
        },
        meta: {
          position: {
            x: 400,
            y: 150
          }
        },
        panel: (item) => {
          return `
            <div class="content">
              Test aja
            </div>
          `
        }
      }
    ])

    // components
    const controls = reactive({
      showControl: true,
      showPanelInfo: true,
      showPanelComponent: true,
      objScale: 1,
      objX: 0,
      objY: 0
    })
    const componentSelected = ref(null)
    const components = reactive([
      componentVLV01,
      componentVLV02,

      componentMT021,
      componentMT022,
      componentMT023,
      componentMT024,

      componentMDC01,
      componentMCT01
    ])
    const componentOnClose = (item) => {
      document.querySelector('#line-spotlight').innerHTML = ''
      componentSelected.value = null
    }
    const componentClicked = (item) => {
      const menuDiv = document.querySelector('div.menu')

      if (typeof componentSelected.value !== 'undefined' && componentSelected.value !== null) {
        componentOnClose(componentSelected.value)
      }

      componentSelected.value = item
      if (typeof item.onClick !== 'undefined') {
        item.onClick(item)
      }

      menuDiv.animate([
        { opacity: 0, transform: 'translateY(120px)' },
        { opacity: 1, transform: 'translateY(0px)' }
      ], {
        duration: 500
      })

      setTimeout(() => {
        adjustLine(
          document.querySelector(`#component-${item.id}`),
          document.querySelector('div.menu .content'),
          '#dddddd', 2
        )
      }, 500)
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
          const overviewResult = overview.clientWidth
          // components ui generate pos
          components.forEach((e) => {
            // component
            const a = document.querySelector(`#component-${e.id}`)
            const clientOriginal = (typeof a.dataset.originalWidth === 'undefined') ? a.clientWidth : a.dataset.originalWidth
            const clientResult = (overviewResult * clientOriginal) / overviewOriginal
            const clientX = (overviewResult * e.meta.position.x) / overviewOriginal
            const clientY = (overviewResult * e.meta.position.y) / overviewOriginal
            a.dataset.originalWidth = clientOriginal
            a.style.width = `${clientResult}px`
            a.style.top = `${clientY}px`
            a.style.left = `${clientX}px`

            // wae
            // a.addEventListener('mousedown', imgClick)

            // panel
            if (controls.showPanelComponent) {
              const panelGap = 35
              const panel = document.querySelector(`#panel-${e.id}`)
              // const lineWidth = 30
              // const panelLineToComponent = document.querySelector(`#panel-${e.name} .panel-container::`)
              // console.log(panelLineToComponent.clientWidth)
              let panelY = 0
              let panelX = 0
              if (panel.classList.contains('right')) {
                panelY = (clientY)
                panelX = (clientX + (panelGap))
              } else {
                panelY = (clientY)
                panelX = (clientX - (panel.clientWidth + panelGap))
              }

              // awe
              panel.style.top = `${panelY}px`
              panel.style.left = `${panelX}px`
            }
          })

          // panels ui generate pos
          if (controls.showPanelInfo) {
            panels.forEach((e) => {
              const panel = document.querySelector(`#panel-${e.id}`)
              const clientOriginal = (typeof panel.dataset.originalWidth === 'undefined') ? panel.clientWidth : panel.dataset.originalWidth
              const panelX = (overviewResult * e.meta.position.x) / overviewOriginal
              const panelY = (overviewResult * e.meta.position.y) / overviewOriginal
              panel.style.top = `${panelY}px`
              panel.style.left = `${panelX}px`
              panel.dataset.originalWidth = clientOriginal
            })
          }

          if (componentSelected.value !== null) {
            if (typeof componentSelected.value.meta.componentSpot !== 'undefined') {
              const componentSpot = componentSelected.value.meta.componentSpot
              adjustLine(
                componentSpot,
                document.querySelector('div.menu .content'),
                '#dddddd', 1
              )
            } else {
              adjustLine(
                document.querySelector(`#component-${componentSelected.value.id}`),
                document.querySelector('div.menu .content'),
                '#dddddd', 1
              )
            }
          }
        }, 50)
      } catch (error) {
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
    })
    onUnmounted(() => {
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
    const changeDataSwap = (i) => {
      const item = dataSwapantau[i]
      const newValue = prompt(`Masukan data ${item.text} (satuan ${item.unit})`, item.value)
      if (newValue != null && newValue) {
        dataSwapantau[i].value = newValue
      }
    }

    return {
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
      imgClick,
      dataSwapantau,
      changeDataSwap
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
