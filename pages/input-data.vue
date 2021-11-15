<template>
  <div class="screen tw-relative tw-px-40 tw-py-10">
    <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-flex tw-flex-col tw-h-full tw-max-h-full">
      <div class="tw-flex">
        <div class="tw-flex-1 tw-flex tw-space-x-4 tw-px-4 tw-py-4">
          <div class="tw-relative tw-overflow-hidden tw-rounded tw-border tw-border-gray-400">
            <div class="tw-top-1/2 tw-p-4 tw-self-center tw-inline">
              <font-awesome-icon :icon="['fas', 'calendar']" />
            </div>
            <input v-model="filterDate" type="date" class="tw-text-xs tw-font-bold tw-py-2 tw-px-4 tw-outline-none">
          </div>
          <button class="tw-bg-gray-50 hover:tw-bg-gray-100 tw-text-xs tw-border tw-border-gray-400 tw-text-black tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            {{ day }}
          </button>
        </div>
        <div class="tw-text-right tw-self-center tw-pr-4 tw-text-xl tw-text-blue-800 tw-font-semibold">
          <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-xs tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded" @click="save">
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
                v-model="items[i].inlet"
                class="tw-text-xs tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                type="number"
                placeholder="Flow value..."
              >
            </td>
            <td class="tw-border tw-border-gray-300 tw-px-4 tw-py-2">
              <input
                v-model="items[i].outlet"
                class="tw-text-xs tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline"
                type="number"
                placeholder="Totalizer value..."
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  ref,
  useContext,
  useFetch,
  watch
} from '@nuxtjs/composition-api'
import { footerMenu as footerMenuList } from '@/api/footerMenu.js'

export default {
  layout: 'page',
  setup () {
    const { app, $moment, $overlayLoading, $axios } = useContext()
    const goBack = () => {
      app.router.push({ path: '/', query: { page: 'overview' } })
    }
    const footerMenu = reactive(footerMenuList(app.router))
    const toggle = reactive({
      debitInlet: true,
      debitOutlet: true
    })
    const items = ref([])

    const filterDate = ref($moment(Date.now()).format('YYYY-MM-DD'))
    const day = ref('')

    // fetch labels for reports
    const updateDay = () => {
      const dayInIndonesian = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
      ]
      day.value = dayInIndonesian[$moment(filterDate.value).day()]
    }
    watch(filterDate, () => {
      updateDay()
      fetch()
    })
    onMounted(() => updateDay())
    const { fetch } = useFetch(async () => {
      try {
        $overlayLoading.show()
        // delete items
        items.value = []

        // a
        const labelsResponse = await $axios({
          method: 'get',
          url: '/reports-label'
        })
        if (labelsResponse.status === 200 && labelsResponse.data.status === true) {
          const labels = [...labelsResponse.data.data]
          labels.forEach((label) => {
            const searchInItems = items.value.findIndex(item => item.name === label.name)
            if (searchInItems === -1) {
              items.value.push({
                label_id: label.id,
                name: label.name,
                inlet: null,
                outlet: null
              })
            }
          })

          // get data
          const response = await $axios({
            method: 'get',
            url: '/reports',
            params: {
              date: filterDate.value
            }
          })
          if (response.status === 200 && response.data.status === true) {
            // columns
            const data = [...response.data.data]
            data.forEach((item) => {
              const searchItemWithName = items.value.findIndex(i => i.name === item.label_name)
              if (searchItemWithName !== -1) {
                if (item.tipe === 1) {
                  items.value[searchItemWithName].inlet = item.value
                } else if (item.tipe === 0) {
                  items.value[searchItemWithName].outlet = item.value
                }
              }
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
      $overlayLoading.hide()
    })
    fetch()

    // save
    const save = async () => {
      $overlayLoading.show()
      try {
        const response = await $axios({
          method: 'post',
          url: '/reports',
          data: {
            date: filterDate.value,
            items: items.value
          }
        })
        if (response.status === 200 && response.data.status === true) {
          fetch()
        }
      } catch (error) {
        console.log(error)
      }
      $overlayLoading.hide()
    }

    return {
      filterDate,
      day,
      save,

      footerMenu,
      goBack,
      toggle,
      items
    }
  }
}
</script>
