<template>
  <div class="screen tw-relative tw-flex-1">
    <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-mx-40 tw-my-20 tw-flex tw-flex-col tw-overflow-hidden">
      <div style="display: flex; flex: 1 1 0%;overflow-y: auto;">
        test
      </div>
      <div class="tw-py-4 tw-px-6 tw-flex tw-justify-center tw-bg-gray-300">
        <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
          Ok
        </button>
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
  layout: 'page',
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
