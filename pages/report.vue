<template>
  <div class="page">
    <div class="navbar">
      <img src="img/logo.png" alt="Logo" class="header tw-inline-block tw-mt-1">
      <div class="page-title">
        Page 04 - Report
      </div>
      <div class="menu">
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
    <div class="screen tw-relative tw-flex-1">
      <div class="tw-h-full tw-mx-40 tw-my-10 tw-flex tw-flex-col tw-space-y-4 tw-overflow-hidden">
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
        <div class="tw-shadow-lg tw-bg-gray-200 tw-rounded" style="flex: 1 1 0%;overflow-y: auto;">
          <div class="tw-flex">
            <div class="tw-self-center tw-pl-4 tw-text-xl tw-text-blue-800 tw-font-semibold">
              <span v-if="tabSelected == 1">Data Outlet /Hari</span>
              <span v-if="tabSelected == 2">Data Inlet /Hari</span>
              <span v-if="tabSelected == 3">Data Kinerja Ipal /Hari</span>
            </div>
            <div class="tw-flex-1 tw-text-right tw-px-4 tw-py-4">
              <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-xs tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Export
                <font-awesome-icon :icon="['fas', 'file-excel']" class="tw-ml-1 tw-self-center" />
              </button>
              <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-xs tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                2012/04/24 - 2012/04/25
                <font-awesome-icon :icon="['fas', 'file-excel']" class="tw-ml-1 tw-self-center" />
              </button>
            </div>
          </div>
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
            <div class="tw-mx-4 tw-bg-white tw-rounded tw-mb-4">
              <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
                Kadar Unsur Pencemaran Sebenernya (g/m3)
              </div>
              <vue-good-table
                :columns="dataIpal.columns"
                :rows="dataIpal.rows"
              />
            </div>
            <div class="tw-mx-4 tw-bg-white tw-rounded tw-mb-4">
              <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
                beban Pencemaran Sebenarnya /Hari (kg/hari)
              </div>
              <vue-good-table
                :columns="dataIpal.columns"
                :rows="dataIpal.rows"
              />
            </div>
            <div class="tw-mx-4 tw-bg-white tw-rounded tw-mb-4">
              <div class="tw-px-4 tw-py-4 tw-text-xl tw-text-blue-800 tw-font-semibold tw-border-b-2 tw-border-gray-400">
                Reduksi Beban Pencemaran Sebenarnya /Hari
              </div>
              <vue-good-table
                :columns="dataIpal.columns"
                :rows="dataIpal.rows"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-container">
        <div class="nav-container">
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
  reactive,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { footerMenu as footerMenuList } from '@/api/footerMenu.js'

export default {
  setup () {
    const { app } = useContext()
    const goBack = () => {
      app.router.push({ path: '/', query: { page: 'overview' } })
    }
    const footerMenu = reactive(footerMenuList(app.router))
    const tabSelected = ref(1)
    const dataInlet = reactive({
      columns: [
        {
          label: 'Date Time',
          field: 'created_at'
        },
        {
          label: 'COD',
          field: 'cod'
        },
        {
          label: 'BOD',
          field: 'bod'
        },
        {
          label: 'TSS',
          field: 'tss'
        },
        {
          label: 'pH',
          field: 'ph'
        },
        {
          label: 'L&M',
          field: 'lam'
        },
        {
          label: 'NH3',
          field: 'nh3'
        },
        {
          label: 'FE',
          field: 'fe'
        },
        {
          label: 'CU',
          field: 'cu'
        },
        {
          label: 'Temperature',
          field: 'temp'
        },
        {
          label: 'Debit',
          field: 'debit'
        }
      ],
      rows: [
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        },
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        }
      ]
    })
    const dataOutlet = reactive({
      columns: [
        {
          label: 'Date Time',
          field: 'created_at'
        },
        {
          label: 'COD',
          field: 'cod'
        },
        {
          label: 'BOD',
          field: 'bod'
        },
        {
          label: 'TSS',
          field: 'tss'
        },
        {
          label: 'pH',
          field: 'ph'
        },
        {
          label: 'L&M',
          field: 'lam'
        },
        {
          label: 'NH3',
          field: 'nh3'
        },
        {
          label: 'FE',
          field: 'fe'
        },
        {
          label: 'CU',
          field: 'cu'
        },
        {
          label: 'Temperature',
          field: 'temp'
        },
        {
          label: 'Debit',
          field: 'debit'
        }
      ],
      rows: [
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        }
      ]
    })
    const dataIpal = reactive({
      columns: [
        {
          label: 'Date Time',
          field: 'created_at'
        },
        {
          label: 'COD',
          field: 'cod'
        },
        {
          label: 'BOD',
          field: 'bod'
        },
        {
          label: 'TSS',
          field: 'tss'
        },
        {
          label: 'pH',
          field: 'ph'
        },
        {
          label: 'L&M',
          field: 'lam'
        },
        {
          label: 'NH3',
          field: 'nh3'
        },
        {
          label: 'FE',
          field: 'fe'
        },
        {
          label: 'CU',
          field: 'cu'
        },
        {
          label: 'Temperature',
          field: 'temp'
        },
        {
          label: 'Debit',
          field: 'debit'
        }
      ],
      rows: [
        {
          created_at: '2020-04-24 24:10:10',
          cod: 100,
          bod: 44.53,
          tss: 80.84,
          ph: '6 - 9',
          lam: 2.82,
          nh3: 10,
          fe: 3,
          cu: 1,
          temp: 32,
          debit: 58.2
        }
      ]
    })

    return {
      footerMenu,
      tabSelected,
      goBack,
      dataInlet,
      dataOutlet,
      dataIpal
    }
  }
}
</script>

<style lang="scss">
.tab-btn {
  @apply tw-bg-blue-100 tw-transition tw-duration-300 tw-text-blue-800 tw-border-2 tw-border-blue-800 hover:tw-bg-blue-800 hover:tw-text-white tw-font-semibold tw-py-2 tw-px-12 tw-rounded;
  &.active {
    @apply tw-bg-blue-800 tw-transition tw-duration-300 tw-border-2 tw-border-blue-800 tw-text-white tw-font-bold tw-py-2 tw-px-12 tw-rounded;
  }
  &:focus {
    outline:0;
  }
}
</style>
