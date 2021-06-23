/* eslint-disable vue/no-v-html */
<template>
  <div class="page">
    <div class="navbar">
      <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-1">
      <div class="page-title">
        Page 01 - Overview Waste Water Treatment Plant
      </div>
      <div class="actions">
        <div class="item">
          <img src="img/menu/Item View.svg" class="tw-mt-2">
          <div>
            Item View
          </div>
        </div>
        <div class="item" :class="`${(componentsHaveAlarm.length > 0) ? 'red' : ''}`">
          <img src="img/menu/Alarm.svg">
          <div>
            Alarm
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-space-x-2 tw-text-gray-200 tw-h-full tw-self-center">
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
            <div class="item-content">
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
  reactive
} from '@vue/composition-api'
import { useStore } from '@nuxtjs/composition-api'

export default {
  setup () {
    // store
    const store = useStore()
    const componentSelected = computed(() => store.state.canvas.componentSelected)
    const componentsHaveAlarm = computed(() => store.state.canvas.componentsHaveAlarm)

    // menu footer
    const footerMenu = reactive([
      {
        id: 'footer-menu-1',
        text: 'Overview',
        icon: 'Overview'
      },
      {
        id: 'footer-menu-2',
        text: 'Submersible',
        icon: 'Submersible'
      },
      {
        id: 'footer-menu-3',
        text: 'Input Data',
        icon: 'Input Data'
      },
      {
        id: 'footer-menu-4',
        text: 'Report',
        icon: 'Report'
      },
      {
        id: 'footer-menu-5',
        text: 'Access Lvl',
        icon: 'Access Level'
      }
    ])

    // componentOnClose
    const componentOnClose = item => store.dispatch('canvas/componentOnClose', item)

    return {
      footerMenu,
      componentSelected,
      componentsHaveAlarm,
      componentOnClose
    }
  }
}
</script>
