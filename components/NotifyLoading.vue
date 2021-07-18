<template>
  <div>
    <div v-if="notifyLoading.show" class="notify-loading tw-z-50 tw-bg-gray-100 tw-fixed tw-rounded-md tw-flex tw-flex-col tw-justify-center">
      <div class="tw-w-full tw-flex tw-space-x-2 tw-px-2">
        <div class="tw-self-center">
          <font-awesome-icon :icon="['fas', 'circle-notch']" class="tw-mx-1 tw-text-3xl tw-text-blue-500" spin />
        </div>
        <div class="tw-flex tw-flex-col tw-text-gray-700 tw-w-full tw-max-w-full">
          <div class="tw-font-semibold">
            {{ notifyLoading.title }}
          </div>
          <div class="tw-text-xs tw-flex-1 tw-text-gray-500 tw-max-w-full tw-overflow-ellipsis tw-truncate">
            {{ notifyLoading.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
export default {
  component: true,
  setup () {
    const store = useStore()
    const notifyLoading = computed(() => store.state.notifyLoading)

    return {
      notifyLoading
    }
  }
}
</script>

<style scoped>
.notify-loading {
  animation: .5s ease-out 0s 1 slideInFromRight;
  overflow: hidden;
  top: 90px;
  right: 20px;
  width: 265px;
  height: 60px;
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
