<template>
  <div class="screen tw-relative tw-px-40 tw-py-10">
    <div>
      <button class="tab-btn" :class="{ 'active': (tabSelected == 1) }" @click="tabSelected = 1">
        Data Inlet
      </button>
      <button class="tab-btn" :class="{ 'active': (tabSelected == 2) }" @click="tabSelected = 2">
        Data Outlet
      </button>
      <button class="tab-btn" :class="{ 'active': (tabSelected == 3) }" @click="tabSelected = 3">
        Data Kinerja Ipal
      </button>
    </div>
    <div class="tw-bg-gray-200 tw-shadow-lg tw-rounded tw-flex tw-flex-col tw-h-full tw-max-h-full">
      <div class="tw-flex tw-justify-between">
        <div class="tw-self-center tw-pl-4 tw-text-xl tw-text-blue-800 tw-font-semibold">
          <span v-if="tabSelected == 1">Data Outlet /Hari</span>
          <span v-if="tabSelected == 2">Data Inlet /Hari</span>
          <span v-if="tabSelected == 3">Data Kinerja Ipal /Hari</span>
        </div>
        <div class="tw-flex tw-space-x-4 tw-text-right tw-px-4 tw-py-4">
          <a :href="`${apibaseurl}download?tipe=${(tabSelected == 1 ? 'inlet' : (tabSelected == 2 ? 'outlet' : (tabSelected == 3 ? 'bpa' : 'unknow') ) )}&month=${$moment(filterDate).format('MM')}&year=${$moment(filterDate).format('YYYY')}`" class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-xs tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Export
            <span v-if="tabSelected == 1">Data Outlet</span>
            <span v-if="tabSelected == 2">Data Inlet</span>
            <span v-if="tabSelected == 3">Data Kinerja Ipal</span>
            <font-awesome-icon :icon="['fas', 'file-excel']" class="tw-ml-1 tw-self-center" />
          </a>
          <div class="tw-relative tw-overflow-hidden tw-rounded tw-border tw-border-gray-400">
            <div class="tw-top-1/2 tw-p-4 tw-self-center tw-inline">
              <font-awesome-icon :icon="['fas', 'calendar']" />
            </div>
            <input v-model="filterDate" type="month" class="tw-text-xs tw-font-bold tw-py-2 tw-px-4 tw-outline-none">
          </div>
        </div>
      </div>
      <div class="tw-flex-1 tw-max-h-full tw-py-4 tw-px-4 tw-bg-gray-300 tw-overflow-y-scroll" style="max-height: 100%;">
        <div v-if="tabSelected == 1">
          <vue-good-table
            :columns="dataInlet.columns"
            :rows="dataInlet.rows"
          />
        </div>
        <div v-else-if="tabSelected == 2">
          <vue-good-table
            :columns="dataOutlet.columns"
            :rows="dataOutlet.rows"
          />
        </div>
        <div v-else-if="tabSelected == 3">
          <div class="tw-bg-white tw-rounded tw-mb-4">
            <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
              Kadar Unsur Pencemaran Sebenernya (g/m3)
            </div>
            <vue-good-table
              :columns="dataIpalKadar.columns"
              :rows="dataIpalKadar.rows"
            />
          </div>
          <div class="tw-bg-white tw-rounded tw-mb-4">
            <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
              beban Pencemaran Sebenarnya /Hari (kg/hari)
            </div>
            <vue-good-table
              :columns="dataIpalPencemaran.columns"
              :rows="dataIpalPencemaran.rows"
            />
          </div>
          <div class="tw-bg-white tw-rounded tw-mb-4">
            <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
              Reduksi Beban Pencemaran Sebenarnya /Hari
            </div>
            <vue-good-table
              :columns="dataIpalReduksi.columns"
              :rows="dataIpalReduksi.rows"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
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
    const { app, $axios, $overlayLoading, $moment } = useContext()
    const apibaseurl = $axios.defaults.baseURL
    const goBack = () => {
      app.router.push({ path: '/', query: { page: 'overview' } })
    }
    const footerMenu = reactive(footerMenuList(app.router))
    const tabSelected = ref(1)
    const dataInlet = ref({
      columns: [],
      rows: []
    })
    const dataOutlet = ref({
      columns: [],
      rows: []
    })
    const dataIpalKadar = ref({
      columns: [],
      rows: []
    })
    const dataIpalPencemaran = ref({
      columns: [],
      rows: []
    })
    const dataIpalReduksi = ref({
      columns: [],
      rows: []
    })

    // onMounted(() => console.log($axios.defaults.baseURL))
    // filters
    const labels = reactive([])
    const filterDate = ref($moment(Date.now()).format('YYYY-MM'))
    watch(filterDate, e => fetch())

    // fetch labels for reports
    const { fetch } = useFetch(async () => {
      try {
        $overlayLoading.show()
        const labelsResponse = await $axios({
          method: 'get',
          url: '/reports-label'
        })
        if (labelsResponse.status === 200 && labelsResponse.data.status === true) {
          // columns
          const data = [...labelsResponse.data.data]
          const columns = [{
            label: 'Date',
            field: 'reportDate'
          }]
          data.forEach((e) => {
            columns.push({
              label: e.name,
              field: e.name
            })
          })
          dataInlet.value.columns = [...columns]
          dataOutlet.value.columns = [...columns]

          // rows
          const rowsReport = await $axios({
            method: 'get',
            url: '/reports',
            params: {
              month: $moment(filterDate.value).format('MM'),
              year: $moment(filterDate.value).format('YYYY')
            }
          })
          if (rowsReport.status === 200 && rowsReport.data.status === true) {
            const data = [...rowsReport.data.data]
            const rows = []
            data.forEach((e) => {
              const dateFormated = a => $moment(a).format('DD/MM/YYYY')
              const searchRowWithSameDate = rows.findIndex(row => row.reportDate === dateFormated(e.reportDate) && row.tipe === e.tipe)
              if (searchRowWithSameDate === -1) {
                const row = { reportDate: dateFormated(e.reportDate), tipe: e.tipe }
                row[e.label_name] = e.value
                rows.push(row)
              } else {
                rows[searchRowWithSameDate][e.label_name] = e.value
              }
            })
            rows.forEach((e) => {
              const labels = [...labelsResponse.data.data]
              labels.forEach((label) => {
                if (!e[label.name]) {
                  e[label.name] = '-'
                }
              })
            })
            const sortedRows = rows.sort((a, b) => {
              if (a.reportDate < b.reportDate) {
                return -1
              }
              if (a.reportDate > b.reportDate) {
                return 1
              }
              return 0
            })
            dataInlet.value.rows = [...sortedRows.filter(row => row.tipe === 1)]
            dataOutlet.value.rows = [...sortedRows.filter(row => row.tipe === 0)]

            // report ipal
            const countAvg1Month = (a, b, c) => {
              let dataIpalKadarInletAvgIn1Month = b
              const dataIpalKadarInletAvgIn1MonthCount = {}
              a.forEach((e) => {
                // e is object, foreach key
                Object.keys(e).forEach((key) => {
                  // const onlyKey = ['BOD', 'COD', 'TSS', 'LEMAK & MINYAK', '', 'AMONIAK', 'FE', 'CU']
                  const exceptKey = ['tipe']
                  if (exceptKey.includes(key)) {
                    return
                  }
                  if (!dataIpalKadarInletAvgIn1Month[key]) {
                    dataIpalKadarInletAvgIn1Month[key] = 0
                  }
                  if (e[key] !== '-') {
                    dataIpalKadarInletAvgIn1Month[key] += e[key]
                  }
                  if (!dataIpalKadarInletAvgIn1MonthCount[key]) {
                    dataIpalKadarInletAvgIn1MonthCount[key] = 0
                  }
                  dataIpalKadarInletAvgIn1MonthCount[key] += 1
                })
              })
              dataIpalKadarInletAvgIn1Month = c(dataIpalKadarInletAvgIn1Month, dataIpalKadarInletAvgIn1MonthCount)
              return dataIpalKadarInletAvgIn1Month
            }

            // columns without index 0
            const ipalCols = columns.slice(1)
            const ipalColsIpal = ipalCols.filter((row) => {
              const onlyKey = ['BOD', 'COD', 'TSS', 'LEMAK & MINYAK', '', 'AMONIAK', 'FE', 'CU']
              return onlyKey.includes(row.field)
            })
            dataIpalKadar.value.columns = [{ label: 'Tipe', field: 'tipe' }, ...ipalColsIpal]
            dataIpalPencemaran.value.columns = [{ label: 'Tipe', field: 'tipe' }, ...ipalColsIpal]
            dataIpalReduksi.value.columns = [...ipalColsIpal]

            // data ipal kadar
            const functionsIpalKadar = (dataIpalKadarInletAvgIn1Month, dataIpalKadarInletAvgIn1MonthCount) => {
              Object.keys(dataIpalKadarInletAvgIn1Month).forEach((key) => {
                if (dataIpalKadarInletAvgIn1MonthCount[key] > 0) {
                  dataIpalKadarInletAvgIn1Month[key] = parseFloat(dataIpalKadarInletAvgIn1Month[key] / dataIpalKadarInletAvgIn1MonthCount[key]).toFixed(3)
                }
              })
              return dataIpalKadarInletAvgIn1Month
            }
            const dataIpalKadarInletAvgIn1Month = countAvg1Month(sortedRows.filter(row => row.tipe === 1), { tipe: 'Inlet' }, functionsIpalKadar)
            const dataIpalKadarOutletAvgIn1Month = countAvg1Month(sortedRows.filter(row => row.tipe === 0), { tipe: 'Outlet' }, functionsIpalKadar)
            dataIpalKadar.value.rows = [dataIpalKadarInletAvgIn1Month, dataIpalKadarOutletAvgIn1Month]

            // data ipal reduksi
            const dataIpalReduksiAvgIn1Month = {}
            Object.keys(dataIpalKadarInletAvgIn1Month).forEach((key) => {
              if (key !== 'tipe') {
                dataIpalReduksiAvgIn1Month[key] = parseFloat(
                  (dataIpalKadarInletAvgIn1Month[key] - dataIpalKadarOutletAvgIn1Month[key]) / (dataIpalKadarInletAvgIn1Month[key] * 100)
                ).toFixed(3)
              }
            })
            dataIpalReduksi.value.rows = [dataIpalReduksiAvgIn1Month]

            // beban
            const functionsIpalBeban = (dataIpalKadarInletAvgIn1Month, dataIpalKadarInletAvgIn1MonthCount) => {
              Object.keys(dataIpalKadarInletAvgIn1Month).forEach((key) => {
                if (dataIpalKadarInletAvgIn1MonthCount[key] > 0) {
                  dataIpalKadarInletAvgIn1Month[key] = parseFloat(
                    (dataIpalKadarInletAvgIn1Month[key] / dataIpalKadarInletAvgIn1MonthCount[key]) *
                    (dataIpalKadarInletAvgIn1Month['DEBIT AIR LIMBAH'] / dataIpalKadarInletAvgIn1Month['DEBIT AIR LIMBAH']) * 0.001
                  ).toFixed(3)
                }
              })
              return dataIpalKadarInletAvgIn1Month
            }
            const dataIpalBebanInletAvgIn1Month = countAvg1Month(sortedRows.filter(row => row.tipe === 1), { tipe: 'Inlet' }, functionsIpalBeban)
            const dataIpalBebanOutletAvgIn1Month = countAvg1Month(sortedRows.filter(row => row.tipe === 0), { tipe: 'Outlet' }, functionsIpalBeban)
            dataIpalPencemaran.value.rows = [dataIpalBebanInletAvgIn1Month, dataIpalBebanOutletAvgIn1Month]
          }
        }
      } catch (error) {
        console.log(error)
      }
      $overlayLoading.hide()
    })
    fetch()

    return {
      apibaseurl,

      footerMenu,
      tabSelected,
      goBack,
      dataInlet,
      dataOutlet,
      dataIpalKadar,
      dataIpalPencemaran,
      dataIpalReduksi,

      labels,
      filterDate
    }
  }
}
</script>

<style lang="scss">
.tab-btn {
  @apply tw-bg-blue-100 tw-transition tw-duration-300 tw-text-blue-800 tw-border-2 tw-border-blue-800 hover:tw-bg-blue-800 hover:tw-text-white tw-font-semibold tw-py-2 tw-px-12 tw-rounded tw-mb-2 tw-mt-2;
  &.active {
    @apply tw-bg-blue-800 tw-transition tw-duration-300 tw-border-2 tw-border-blue-800 tw-text-white tw-font-bold tw-py-2 tw-px-12 tw-rounded;
  }
  &:focus {
    outline:0;
  }
}
</style>
