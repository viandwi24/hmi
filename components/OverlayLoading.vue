<template>
  <div>
    <div class="tw-z-50 tw-fixed tw-top-0 tw-left-0 tw-min-h-full tw-min-w-full overlay-loading-bg" />
    <div class="overlay-loading tw-z-50 tw-bg-gray-100 tw-fixed tw-rounded-md tw-shadow-2xl tw-flex tw-flex-row tw-justify-center">
      <div class="tw-self-center tw-text-4xl tw-text-blue-500">
        <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  component: true
}
</script>

<style scoped>
.overlay-loading-bg {
  background: rgba(0, 0, 0, .5);
}
.overlay-loading {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}
</style>
