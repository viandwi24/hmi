<template>
  <div>
    <OverlayLoading v-if="loading" />
    <NotifyLoading v-if="notifyLoading.show" />
    <Nuxt />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
export default {
  setup () {
    const store = useStore()
    const loading = computed(() => store.state.loading)
    const notifyLoading = computed(() => store.state.notifyLoading)

    return {
      loading,
      notifyLoading
    }
  }
}
</script>
