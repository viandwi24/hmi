/* eslint-disable vue/no-v-html */
<template>
  <div class="page">
    <div class="navbar">
      <div class="header">
        INDOFOOD CBP - PENGOLAHAN LIMBAH AIR
      </div>
    </div>
    <div :key="renderComponent" class="screen tw-relative tw-flex-1" @scroll="onWindowScroll">
      <div id="line" class="tw-z-20" />
      <div class="controls">
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
                    v-model="controls.showPanel"
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
      </div>
      <div class="obj-container" :style="{ transform: `scale(${controls.objScale}) translate(${controls.objX}px, ${controls.objY}px)` }">
        <img src="img/machine/all.png" class="overview">
        <div class="layer-components">
          <div class="components">
            <img
              v-for="(item, i) in components"
              :id="`component-${item.name}`"
              :key="i"
              :src="`img/machine/${item.onImgShow(item)}.png`"
              class="component"
              :title="item.name"
              :alt="item.name"
              @click="componentClicked(item)"
            >
          </div>
        </div>
        <div class="layer-panels">
          <div v-if="controls.showPanel" class="panels">
            <div
              v-for="(item, i) in components"
              :id="`panel-${item.name}`"
              :key="i"
              class="panel"
            >
              <div class="panel-container" v-html="item.panel(item)" />
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div v-if="componentSelected != null" class="menu-container">
          <div class="header">
            {{ componentSelected.name }}
          </div>
          <div class="content">
            <div v-for="(item, i) in componentSelected.menu(componentSelected)" :key="i">
              <button v-if="item.type == 'button'" @click="item.onClick(componentSelected, item)">
                {{ item.text }}
              </button>
            </div>
            <button @click="componentOnClose(componentSelected)">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from '@nuxtjs/composition-api'

export default {
  setup () {
    const controls = reactive({
      showPanel: true,
      objScale: 1,
      objX: 0,
      objY: 0
    })
    const renderComponent = ref(0)
    let timerRezise
    const forceRerender = () => {
      clearInterval(timerRezise)
      renderComponent.value = renderComponent.value + 1
      setTimeout(() => runTimerUiRender(), 500)
    }
    const componentSelected = ref(null)
    const components = reactive([
      {
        type: 'motor',
        name: 'mto1',
        state: {
          active: false
        },
        meta: {
          img: 'MTO1',
          position: {
            x: 615, y: 312
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'motor',
        name: 'mto2',
        state: {
          active: false
        },
        meta: {
          img: 'MTO2',
          position: {
            x: 821, y: 388
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'motor',
        name: 'mto3',
        state: {
          active: false
        },
        meta: {
          img: 'MTO3',
          position: {
            x: 928, y: 433
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'motor',
        name: 'mto4',
        state: {
          active: false
        },
        meta: {
          img: 'MTO4',
          position: {
            x: 1052, y: 479
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'motor',
        name: 'bw02',
        state: {
          active: false
        },
        meta: {
          img: 'BW02',
          position: {
            x: 1210, y: 800
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'motor',
        name: 'bw01',
        state: {
          active: false
        },
        meta: {
          img: 'BW01',
          position: {
            x: 1256, y: 753
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_Run` : `${item.meta.img}_Alarm`
      },
      {
        type: 'container',
        name: 'tangki_penampung',
        state: {
          level: 80
        },
        meta: {
          img: 'tangki',
          position: {
            x: 461, y: 124
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>Level : ${(item.state.level)}%</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            // { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => `${item.meta.img}`
      }
    ])

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
      const off1 = getOffset(div1)
      const off2 = getOffset(div2)
      // bottom right
      const x1 = off1.left + (off1.width / 2)
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
      document.querySelector('#line').innerHTML = htmlLine
    }

    const componentOnClose = (item) => {
      document.querySelector('#line').innerHTML = ''
      componentSelected.value = null
    }

    const saveOption = () => {
      localStorage.setItem('controls', JSON.stringify(controls))
    }

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

    onBeforeMount(() => {
      document.addEventListener('mousewheel', onWindowScroll)
      document.addEventListener('keydown', onWindowKeyDown)
      document.addEventListener('keyup', onWindowKeyUp)
    })

    const runTimerUiRender = () => {
      try {
        const overview = document.querySelector('img.overview')
        const overviewOriginal = 1920
        timerRezise = setInterval(() => {
          // components ui generate pos
          components.forEach((e) => {
            // component
            const overviewResult = overview.clientWidth
            const a = document.querySelector(`#component-${e.name}`)
            const clientOriginal = (typeof a.dataset.originalWidth === 'undefined') ? a.clientWidth : a.dataset.originalWidth
            const clientResult = (overviewResult * clientOriginal) / overviewOriginal
            const clientX = (overviewResult * e.meta.position.x) / overviewOriginal
            const clientY = (overviewResult * e.meta.position.y) / overviewOriginal
            a.dataset.originalWidth = clientOriginal
            a.style.width = `${clientResult}px`
            a.style.top = `${clientY}px`
            a.style.left = `${clientX}px`

            // panel
            if (controls.showPanel) {
              const panelGap = 35
              const panel = document.querySelector(`#panel-${e.name}`)
              const panelY = (clientY)
              const panelX = (clientX - (panel.clientWidth + panelGap))
              panel.style.top = `${panelY}px`
              panel.style.left = `${panelX}px`
            }
          })

          if (componentSelected.value !== null) {
            adjustLine(
              document.querySelector(`#component-${componentSelected.value.name}`),
              document.querySelector('div.menu .content'),
              '#dddddd', 1
            )
          }
        }, 50)
      } catch (error) {
        console.log('ane dah')
      }
    }

    onMounted(() => {
      if (localStorage.getItem('controls') !== null) {
        const a = JSON.parse(localStorage.getItem('controls'))
        Object.entries(a).forEach((item) => {
          const [key, value] = item
          controls[key] = value
        })
      }
      clearInterval(timerRezise)
      runTimerUiRender()
    })

    onUnmounted(() => {
      document.removeEventListener('mousewheel', onWindowScroll)
      document.removeEventListener('keydown', onWindowKeyDown)
      document.removeEventListener('keyup', onWindowKeyUp)
    })

    return {
      components,
      renderComponent,
      forceRerender,
      controls,
      saveOption,
      componentSelected,
      componentOnClose,
      onWindowScroll,
      componentClicked: (item) => {
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
            document.querySelector(`#component-${item.name}`),
            document.querySelector('div.menu .content'),
            '#dddddd', 2
          )
        }, 500)
      },
      togglePanel: () => {
        controls.showPanel = !controls.showPanel
        console.log(adjustLine)
      }
    }
  }
}
</script>

<style>
#line{
  position:absolute;
  width:1px;
  background-color:red;
}
</style>
