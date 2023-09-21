<style scoped>
/* .context-menu-item {
  @apply h-10 flex items-center cursor-pointer text-xs hover:bg-slate-100 rounded;
} */
#teethContainer::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scroll-bar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
canvas {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  aspect-ratio: attr(width) / attr(height);
}
.closeB {
  border: 1px solid blue;
}
</style>

<template>
  <div>
    <div
      v-if="isPerioiChartVisible"
      class="w-full relative h-full flex flex-col items-stretch justify-center box"
    >
      <PerioChart />
    </div>
    <!-- PPS Probing Component -->
    <ppsProbing></ppsProbing>

    <div class="flex overflow-auto w-full h-full" id="context-close">
      <div
        class="w-full relative h-full flex flex-col items-stretch justify-center box"
        v-show="isFullChartVisible"
      >
        <ul
          class="flex flex-row justify-center w-full"
          v-show="isUpperJawVisible"
        >
          <li
            v-for="tooth in upperJaw"
            :key="tooth.toothNumber"
            :id="tooth.toothNumber"
            :class="{ 'bg-theme-36': missingTeeth.includes(tooth.toothNumber) }"
            class="text-black hover:bg-theme-36 flex flex-col items-center text-xs justify-center group cursor-pointer"
          >
            <div
              class="tooth_visuals relative custom-context-menu"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals relative custom-context-menu"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              :id="`canvasContainerVektis-${tooth.toothNumber}`"
              data-part="vektis"
              data-image-extension="vektis"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="teethTop"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals custom-context-menu"
              :id="`canvasContainerTop-${tooth.toothNumber}`"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              data-part="top"
              data-image-extension="t"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="!teethTop"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals custom-context-menu"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="isUpperJawVisible && singleJawShowing"
            >
              <canvas></canvas>
            </div>
            <p v-if="!isInfant" class="group-hover:text-white">
              {{ tooth.toothNumber }}
            </p>
            <p v-if="isInfant" class="group-hover:text-white">
              {{ tooth.infantToothNumber }}
            </p>
            <input
              type="checkbox"
              v-model="missingTeeth"
              :value="tooth.toothNumber"
            />
          </li>
        </ul>
        <ul
          class="flex flex-row justify-center w-full mt-3"
          v-show="isLowerJawVisible"
        >
          <li
            v-for="tooth in lowerJaw"
            :key="tooth.toothNumber"
            :id="tooth.toothNumber"
            :class="{ 'bg-theme-36': missingTeeth.includes(tooth.toothNumber) }"
            class="text-black hover:bg-theme-36 flex flex-col items-center text-xs justify-center group cursor-pointer"
          >
            <input
              type="checkbox"
              v-model="missingTeeth"
              :value="tooth.toothNumber"
            />
            <p v-if="!isInfant" class="group-hover:text-white">
              {{ tooth.toothNumber }}
            </p>
            <p v-if="isInfant" class="group-hover:text-white">
              {{ tooth.infantToothNumber }}
            </p>
            <div
              class="tooth_visuals relative custom-context-menu"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="isLowerJawVisible && singleJawShowing"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals relative custom-context-menu"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              :id="`canvasContainerVektis-${tooth.toothNumber}`"
              data-part="vektis"
              data-image-extension="vektis"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="teethTop"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals custom-context-menu"
              :id="`canvasContainerTop-${tooth.toothNumber}`"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              data-part="top"
              data-image-extension="t"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="!teethTop"
            >
              <canvas></canvas>
            </div>
            <div
              class="tooth_visuals custom-context-menu"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-tooth-number="tooth.toothNumber"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              @click="selectedTooth(tooth.toothNumber)"
              :data-tooth-image="tooth.toothImage"
              v-show="1 === 1"
            >
              <canvas></canvas>
            </div>
          </li>
        </ul>
        <!-- History Charting -->
        <div
          v-if="isHistoryChart"
          class="bottom-0 absolute left-0 right-0 p-2 border-t bg-gray-200 border-gray-400"
        >
          <div class="grid grid-cols-3">
            <span></span>
            <div
              class="flex flex-row justify-center justify-self-center items-center"
            >
              <ChevronLeftIcon
                class="mt-6 rounded-b-md h-8 w-8 hover:text-theme-36 text-gray-500 cursor-pointer"
                @click="prevButton"
                :disabled="selectedHistoryChartdate === 0"
              />
              <Listbox as="div" v-model="selected">
                <ListboxLabel
                  class="block text-sm font-medium text-gray-500 w-full place-sel"
                  >{{ $t('translation.select_date_text') }}</ListboxLabel
                >
                <div class="mt-1 w-40 relative">
                  <ListboxButton
                    class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-650 focus:border-yellow-650 sm:text-sm"
                  >
                    <span class="flex items-center">
                      <span class="ml-3 block truncate">{{
                        selected.charting_date
                      }}</span>
                    </span>
                    <span
                      class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                      <SelectorIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-10 -mt-40 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        as="template"
                        v-for="selectedChartDate in historyChartingDates"
                        :key="selectedChartDate.id"
                        :value="selectedChartDate"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'text-white bg-theme-36' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          ]"
                        >
                          <div class="flex items-center">
                            <span
                              :class="[
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate',
                              ]"
                              >{{ selectedChartDate.charting_date }}</span
                            >
                          </div>

                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-theme-36',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ]"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <ChevronRightIcon
                class="mt-6 rounded-b-md h-8 w-8 text-gray-500 hover:text-theme-36 cursor-pointer"
                @click="nextButton"
                :disabled="
                  selectedHistoryChartdate.value !==
                  viewHistoryChartDateLength - 1
                "
              />
            </div>
            <XCircleIcon
              @click="closeHistoryCharting"
              class="justify-self-end cursor-pointer rounded-b-md h-6 w-6 text-gray-500 hover:text-theme-36"
            />
          </div>
        </div>
        <!-- History Charting End -->
      </div>
      <div
        class="w-12 h-full bg-white border-theme-36 text-white flex flex-col justify-between p-2"
      >
        <!-- <div class="flex items-center">
            <UserIcon  class="my-3 rounded-b-md h-6 w-6 text-theme-36"/>
        </div>-->

        <div class="flex flex-col items-center text-xs text-black space-y-5">
          <div class="my-3 rounded-b-md flex flex-col items-center">
            <!-- <EyeIcon class="text-theme-36 h-6 w-6" />Perio -->
            <!-- <EyeIcon class="text-theme-36 h-6 w-6" @click="showPerioChart()"/>Perio -->
          </div>
          <div class="my-3 rounded-b-md flex flex-col items-center">
            <EyeIcon class="text-theme-36 h-6 w-6" />Endo
          </div>
          <div class="my-3 rounded-b-md flex flex-col items-center">
            <EyeIcon class="text-theme-36 h-6 w-6" />{{$t('translation.dental_text')}}
          </div>
        </div>

        <div class="flex flex-col items-center text-xs text-black">
          <LowerJawButton
            @click="showUpperJawOnly"
            class="border-yellow-650 border-1 mx-1 h-12 w-12 text-white"
          />
          <FullChartButton
            @click="showBothJaws"
            class="border-yellow-650 border-1 mx-1 h-12 w-12 text-theme-36"
          />
          <UpperJawButton
            @click="showLowerJawOnly"
            class="border-yellow-650 border-1 mx-1 h-12 w-12 text-white"
          />
        </div>

        <div class="flex flex-col items-center">
          <!-- <div @click="openPPSModal()" class="my-3 rounded-b-md flex flex-col items-center justify-center cursor-pointer">
                <DocumentAddIcon class="text-theme-36 h-6 w-6"/>
                <span class="text-black text-xs">PPS</span>
          </div>-->
          <ClockIcon
            @click="viewHistoryCharting"
            class="my-3 flex items-center justify-center cursor-pointer rounded-b-md h-6 w-6 text-theme-36"
          />
        </div>
      </div>
    </div>

    <div
      v-if="missingTeeth.length > 0"
      id="contextMenu"
      class="context-menu absolute"
      style="display: none"
    >
      <ul class="flex flex-col divide-y rounded w-48 bg-white shadow-sm p-0.5">
        <li class="group relative inline-block">
          <div
            @click="selectContextMenuItem('diagnosis')"
            class="context-menu-item"
          >
            <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
            <span>Diagnosis</span>
          </div>
          <div
            class="absolute left-[180px] shadow-yellow-650 shadow rounded top-0 w-48 hidden group-hover:block"
          >
            <ul class="flex flex-col rounded bg-white shadow-sm p-0.5 divide-y">
              <li class="context-menu-item">
                <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                <span>Endodontics</span>
              </li>
              <li class="context-menu-item">
                <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                <span>Periodontal</span>
              </li>
              <li class="context-menu-item">
                <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                <span>Pathology</span>
              </li>
            </ul>
          </div>
        </li>
        <li
          @click="selectContextMenuItem('treatment')"
          class="context-menu-item group relative inline-block"
        >
          <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
          <span>Treatment Plans</span>
          <div
            class="absolute left-[180px] shadow-yellow-650 shadow rounded top-0 w-64 hidden group-hover:block"
          >
            <ul class="flex flex-col rounded bg-white shadow-sm p-0.5 divide-y">
              <li class="context-menu-item justify-between">
                <div class="flex items-center">
                  <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                  <span>Restoration</span>
                </div>
                <div
                  class="rounded border-2 bg-white border-red-600 flex h-6 text-red-600 w-auto p-1 items-center space-x-1 text-xs"
                >
                  <p>configure</p>
                  <CogIcon class="h-4" />
                </div>
              </li>
              <li class="context-menu-item justify-between">
                <div class="flex items-center">
                  <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                  <span>Orthodonitcs</span>
                </div>
                <div
                  class="rounded border-2 border-red-600 flex h-6 text-red-600 w-auto p-1 items-center space-x-1 text-xs"
                >
                  <p>configure</p>
                  <CogIcon class="h-4" />
                </div>
              </li>
              <li class="context-menu-item justify-between">
                <div class="flex items-center">
                  <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
                  <span>General</span>
                </div>
                <div
                  class="rounded border-2 border-red-600 flex h-6 text-red-600 w-auto p-1 items-center space-x-1 text-xs"
                >
                  <p>configure</p>
                  <CogIcon class="h-4" />
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li @click="resetTeeth()" class="context-menu-item">
          <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
          <span>Reset Tooth</span>
        </li>
        <li @click="removeTeeth()" class="context-menu-item">
          <PlusCircleIcon class="w-6 h-6 mr-3 ml-1" />
          <span>Missing</span>
        </li>
        <li @click="close()" class="context-menu-item">
          <XCircleIcon class="w-6 h-6 mr-3 ml-1 text-red-600" />
          <span>Close</span>
        </li>
      </ul>
    </div>
  </div>
  <!-- <Dashboard v-if="isInfant"/> -->
</template>

<script setup>
import { onMounted, ref, watch, provide, computed } from 'vue'
import { useStore } from 'vuex'
import teeth from '@/assets/data/teeth.json';
import paths from '@/assets/data/paths.json';
import implantImages from '@/assets/data/implants.json';
import {
  EyeIcon,
  ClockIcon,
  PlusCircleIcon,
  CogIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/outline'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { SelectorIcon } from '@heroicons/vue/solid'
import useVektisMap from '@/composables/charting/vektis-map'
// import useMarkers from '@/composables/charting/markers';
import Images from '@/assets/data/images.json'
import MissingTeeth from '@/assets/data/missing.json'
import UpperJawButton from '@/components/charting/UpperJawButton.vue'
import LowerJawButton from '@/components/charting/LowerJawButton.vue'
import FullChartButton from '@/components/charting/FullChartButton.vue'
// import PerioChart from '../treatments/Perio.vue'
import PerioChart  from '../chart-diagrams/PerioContainer.vue'

import router from '../../router'
import axios from 'axios'





const isUpperJawVisible = ref(true)

const isLowerJawVisible = ref(true)

const isFullChartVisible = ref(true)

const isPerioiChartVisible = ref(false)

const { initializeVektisMap } = useVektisMap()

const missingTeeth = ref([])

const teethTop = ref(true)

const isInfant = ref(false)

const upperCanineVektis = ['13', '23']

const lowerCanineVektis = ['43', '33']

const leftUpperJaw = ['11', '12', '13', '14', '15', '16', '17', '18']

const rightUpperJaw = ['21', '22', '23', '24', '25', '26', '27', '28']

const leftLowerJaw = ['41', '42', '43', '44', '45', '46', '47', '48']

const rightLowerJaw = ['31', '32', '33', '34', '35', '36', '37', '38']

const incissorTeeth = ['11', '12', '13', '21', '22', '23', '31', '32', '33', '41', '42', '43'];

const allTeeth = leftUpperJaw.concat(rightUpperJaw, leftLowerJaw, rightLowerJaw);

const upperJaw = [
  {
    toothNumber: 18,
    infantToothNumber: 58,
    id: 'tooth-18',
    toothImage: '18',
    jaw: 'upper'
  },
  {
    toothNumber: 17,
    infantToothNumber: 57,
    id: 'tooth-17',
    toothImage: '17',
    jaw: 'upper'
  },
  {
    toothNumber: 16,
    infantToothNumber: 56,
    id: 'tooth-16',
    toothImage: '16',
    jaw: 'upper'
  },
  {
    toothNumber: 15,
    infantToothNumber: 55,
    id: 'tooth-15',
    toothImage: '15',
    jaw: 'upper'
  },
  {
    toothNumber: 14,
    infantToothNumber: 54,
    id: 'tooth-14',
    toothImage: '14',
    jaw: 'upper'
  },
  {
    toothNumber: 13,
    infantToothNumber: 53,
    id: 'tooth-13',
    toothImage: '13',
    jaw: 'upper'
  },
  {
    toothNumber: 12,
    infantToothNumber: 52,
    id: 'tooth-12',
    toothImage: '12',
    jaw: 'upper'
  },
  {
    toothNumber: 11,
    infantToothNumber: 51,
    id: 'tooth-11',
    toothImage: '11',
    jaw: 'upper'
  },
  {
    toothNumber: 21,
    infantToothNumber: 61,
    id: 'tooth-11',
    toothImage: '11',
    jaw: 'upper'
  },
  {
    toothNumber: 22,
    infantToothNumber: 62,
    id: 'tooth-12',
    toothImage: '12',
    jaw: 'upper'
  },
  {
    toothNumber: 23,
    infantToothNumber: 63,
    id: 'tooth-13',
    toothImage: '13',
    jaw: 'upper'
  },
  {
    toothNumber: 24,
    infantToothNumber: 64,
    id: 'tooth-14',
    toothImage: '14',
    jaw: 'upper'
  },
  {
    toothNumber: 25,
    infantToothNumber: 65,
    id: 'tooth-15',
    toothImage: '15',
    jaw: 'upper'
  },
  {
    toothNumber: 26,
    infantToothNumber: 66,
    id: 'tooth-16',
    toothImage: '16',
    jaw: 'upper'
  },
  {
    toothNumber: 27,
    infantToothNumber: 67,
    id: 'tooth-17',
    toothImage: '17',
    jaw: 'upper'
  },
  {
    toothNumber: 28,
    infantToothNumber: 68,
    id: 'tooth-18',
    toothImage: '18',
    jaw: 'upper'
  }
]

const lowerJaw = [
  {
    toothNumber: 48,
    infantToothNumber: 88,
    id: 'tooth-48',
    toothImage: '48',
    jaw: 'lower'
  },
  {
    toothNumber: 47,
    infantToothNumber: 87,
    id: 'tooth-47',
    toothImage: '47',
    jaw: 'lower'
  },
  {
    toothNumber: 46,
    infantToothNumber: 86,
    id: 'tooth-46',
    toothImage: '46',
    jaw: 'lower'
  },
  {
    toothNumber: 45,
    infantToothNumber: 85,
    id: 'tooth-45',
    toothImage: '45',
    jaw: 'lower'
  },
  {
    toothNumber: 44,
    infantToothNumber: 84,
    id: 'tooth-44',
    toothImage: '44',
    jaw: 'lower'
  },
  {
    toothNumber: 43,
    infantToothNumber: 83,
    id: 'tooth-43',
    toothImage: '43',
    jaw: 'lower'
  },
  {
    toothNumber: 42,
    infantToothNumber: 82,
    id: 'tooth-42',
    toothImage: '42',
    jaw: 'lower'
  },
  {
    toothNumber: 41,
    infantToothNumber: 81,
    id: 'tooth-41',
    toothImage: '41',
    jaw: 'lower'
  },
  {
    toothNumber: 31,
    infantToothNumber: 71,
    id: 'tooth-31',
    toothImage: '41',
    jaw: 'lower'
  },
  {
    toothNumber: 32,
    infantToothNumber: 72,
    id: 'tooth-32',
    toothImage: '42',
    jaw: 'lower'
  },
  {
    toothNumber: 33,
    infantToothNumber: 73,
    id: 'tooth-33',
    toothImage: '43',
    jaw: 'lower'
  },
  {
    toothNumber: 34,
    infantToothNumber: 74,
    id: 'tooth-34',
    toothImage: '44',
    jaw: 'lower'
  },
  {
    toothNumber: 35,
    infantToothNumber: 75,
    id: 'tooth-35',
    toothImage: '45',
    jaw: 'lower'
  },
  {
    toothNumber: 36,
    infantToothNumber: 76,
    id: 'tooth-36',
    toothImage: '46',
    jaw: 'lower'
  },
  {
    toothNumber: 37,
    infantToothNumber: 77,
    id: 'tooth-37',
    toothImage: '47',
    jaw: 'lower'
  },
  {
    toothNumber: 38,
    infantToothNumber: 78,
    id: 'tooth-38',
    toothImage: '48',
    jaw: 'lower'
  }
]


// PPSProbing Modal
const isPPSOpen = ref(false)

function openPPSModal() {
  isPPSOpen.value = true
}

function closePPSModal() {
  isPPSOpen.value = false
}

provide('isPPSOpen', isPPSOpen)
provide('openPPSModal', openPPSModal)
provide('closePPSModal', closePPSModal)

// History Panel
const isHistoryChart = ref(false)

const viewHistoryCharting = () => {
  isHistoryChart.value = true
}

const closeHistoryCharting = () => {
  isHistoryChart.value = false
}

const historyChartingDates = [
  {
    id: 1,
    charting_date: '22-06-2023'
  },
  {
    id: 2,
    charting_date: '18-04-2023'
  },
  {
    id: 3,
    charting_date: '03-03-2023'
  }
]
const treatmentBlob = ref({
  missing: [],
  11: {},
  12: {},
  13: {},
  14: {},
  15: {},
  16: {},
  17: {},
  18: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  31: {},
  32: {},
  33: {},
  34: {},
  35: {},
  36: {},
  37: {},
  38: {},
  41: {},
  42: {},
  43: {},
  44: {},
  45: {},
  46: {},
  47: {},
  48: {}
})
let selectedHistoryChartdate = ref(0)
  const restorationColors = {
    normal: 'rgba(176, 190, 212, 0.1)',
    gold: 'rgba(255, 215, 0, 0.7)',
    silver: 'rgba(192,192,192, 0.7)',
    toothColorA1: 'rgba(217, 205, 169, 0.7)',
    toothColorA2: 'rgba(218, 199, 150, 0.7)',
    toothColorA3: 'rgba(216, 191, 138, 0.7)',
    toothColorA35: 'rgba(215, 183, 118, 0.7)',
    toothColorA4: 'rgba(203, 169, 106, 0.7)',
    toothColorB1: 'rgba(213,207,189, 0.7)',
    toothColorB2: 'rgba(213,199,155, 0.7)',
    toothColorB3: 'rgba(215,191,126, 0.7)',
    toothColorB4: 'rgba(215,184,114, 0.7)',
    toothColorC1: 'rgba(206,191,154, 0.7)',
    toothColorC2: 'rgba(204,181,128, 0.7)',
    toothColorC3: 'rgba(198,179,129, 0.7)',
    toothColorC4: 'rgba(202,180,125, 0.7)',
    toothColorD2: 'rgba(206,176,124, 0.7)',
    toothColorD3: 'rgba(209,187,138, 0.7)',
    toothColorD4: 'rgba(204,183,123, 0.7)',
  };
const selected = ref(historyChartingDates[selectedHistoryChartdate.value])

// Histort PSS navicagtion
const viewHistoryChartDateLength = historyChartingDates.length

const nextButton = () => {
  if (selectedHistoryChartdate.value !== viewHistoryChartDateLength - 1) {
    selectedHistoryChartdate.value += 1
    selected.value = historyChartingDates[selectedHistoryChartdate.value]
  }
}

const prevButton = () => {
  if (selectedHistoryChartdate.value > 0) {
    selectedHistoryChartdate.value -= 1
    selected.value = historyChartingDates[selectedHistoryChartdate.value]
  }
}
// Getting All treatments
function getTreatment() {
  // this.loading = true
  const token = localStorage.getItem('token')

  const userId = localStorage.getItem('userID')
  const missing = 'missing'

  const data = {
    patientId: userId
  }
  axios
    .post('v1/donetreatments/get_done_treatments_by_patient', data, {
      headers: {
        Authorization: 'Bearer ' + token,

        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(res => {
      const client_treatments_all = res.data.payload[0]

      const client_treatments = client_treatments_all?.tooth_sections

      const sections = JSON.parse(client_treatments)
      // const client_treatment_secs = sections[`${toothID}`]
      console.log('client_treatments_all here kkk', sections)
      Object.assign(treatmentBlob.value, sections)

      if (res.data.success === false) {
        console.log('expired session')
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      }
    })
    // .catch(err => console.log(err))
    .catch(function(err) {
      console.log('error', err)
      if (err.response?.status === 401) {
        console.log('expired session')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.go('/login')
      } else {
        // Handle else
      }
    })
}
function loadFullChart() {
  // let loadingArray = [];
  let elements = document.querySelectorAll('.tooth_visuals')

  elements.forEach(element => {
    let toothNumber = element.getAttribute('data-tooth-number')
    let toothImage = element.getAttribute('data-tooth-image')
    let imageExtension = element.getAttribute('data-image-extension')
    let part = element.getAttribute('data-part')
    let canvas = element.childNodes[0]
    let ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.height, canvas.width)

    // let imageSrc = '../../src/assets/images/teeth/';
    let image = new Image()
    image.onload = () => ctx.drawImage(image, 60, -30)

    canvas.width = 322
    canvas.height = part === 'top' || part === 'vektis' ? 250 : 576
    ctx.scale(1, 1)

    if (leftUpperJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scale(1, 1)'
    if (leftUpperJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scale(1, 1)'
    if (leftUpperJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scaleY(-1)'

    if (rightUpperJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scaleX(-1)'
    if (rightUpperJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scaleX(-1)'
    if (rightUpperJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scale(-1, -1)'

    if (leftLowerJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scale(1, 1)'
    if (leftLowerJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scale(1, 1)'
    if (leftLowerJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scaleY(-1)'

    if (rightLowerJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scaleX(-1)'
    if (rightLowerJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scaleX(-1)'
    if (rightLowerJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scale(-1, -1)'

    // ctx.globalCompositeOperation = 'destination-over';

    if (part !== 'vektis') {
      if (!treatmentBlob?.value?.missing.includes(toothNumber)) {
        if (!treatmentBlob?.value?.missing.includes(toothNumber)) {
          image.src = Images[toothImage][imageExtension];
          console.log(
            'treatmentBlob ckeck',
            treatmentBlob.value[`${toothNumber}`]?.periodontal?.implant
          )
          if (treatmentBlob.value[`${toothNumber}`]?.periodontal?.implant ) {
            console.log('has plant')
            image.src = implantImages[toothImage][part]
           
          } else {
            image.src = Images[toothImage][imageExtension]
          }
        } else {
          image.src = Images[toothImage][imageExtension]
        }
      }
      if (treatmentBlob?.value?.missing.includes(toothNumber)) {
        image.src = MissingTeeth[toothImage][part]
        // image.src = getToothIcon(`${toothImage}${imageExtension}m.png`);
      }
    } else {
      if (leftUpperJaw.includes(toothNumber))
        canvas.style.transform = 'scale(1, 1)'
      if (rightUpperJaw.includes(toothNumber))
        canvas.style.transform = 'scaleX(-1)'
      if (leftLowerJaw.includes(toothNumber))
        canvas.style.transform = 'scale(1, 1)'
      if (rightLowerJaw.includes(toothNumber))
        canvas.style.transform = 'scale(-1, 1)'

      if (upperCanineVektis.includes(toothNumber))
        canvas.style.transform = 'scale(1, -1)'
      if (lowerCanineVektis.includes(toothNumber))
        canvas.style.transform = 'scale(-1, -1)'

      // eslint-disable-next-line no-multi-assign
      if (treatmentBlob?.value?.missing.includes(toothNumber))
        image.src = image.src = MissingTeeth[toothImage]['top']
      if (!treatmentBlob?.value?.missing.includes(toothNumber))
        initializeVektisMap(ctx, toothNumber)
    }
  })

  allTeeth.forEach((toothNumber) => markFullChart(toothNumber));
  return {
    paths,
    teeth,
    leftLowerJaw,
    leftUpperJaw,
    rightLowerJaw,
    rightUpperJaw,
    incissorTeeth,
    markFullChart,
    markDecay,
    drawToothTopMarker,
    drawToothFrontMarker,
    UpperJawButton,
    LowerJawButton,
    FullChartButton,
  }
}

function selectedTooth(toothNumber) {
  // console.log('tooth number is', toothNumber)
  // router.push({
  //   name: 'side-menu-treatment-details',
  //   params: {
  //     toothId: toothNumber
  //   }
  // })
}

const close = () =>
  (document.getElementById('contextMenu').style.display = 'none')

const singleJawShowing = ref(false)

function showUpperJawOnly() {
  isUpperJawVisible.value = true
  isLowerJawVisible.value = false
  singleJawShowing.value = true
  isPerioiChartVisible.value = false
}

function showLowerJawOnly() {
  isUpperJawVisible.value = false
  isLowerJawVisible.value = true
  singleJawShowing.value = true
  isPerioiChartVisible.value = false
}

function showBothJaws() {
  isUpperJawVisible.value = true
  isLowerJawVisible.value = true
  singleJawShowing.value = false
  isPerioiChartVisible.value = false
}
// show perio chart
const showPerioChart=()=>{

  isPerioiChartVisible.value = true
  isUpperJawVisible.value = false
  isLowerJawVisible.value = false
  singleJawShowing.value = false
 
   getTreatment()


}

  const drawToothFrontMarker = (path, ctx, toothNumber, color) => {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.save();
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 60, 0);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 60, 0);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 60, 530);
      ctx.scale(1, -1);
    }
    if (leftLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 60, 530);
      ctx.scale(1, -1);
    }
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.restore();
  };
const paint = (frontContext, vektisMapContext, backContext, selectedAreas, color, toothNumber) => {
    let frontCanvasPaths = [];
    // let topCanvasPaths = [];
    let backCanvasPaths = [];
    let newSelectedAreas = selectedAreas.concat();

    if (newSelectedAreas) {
      if ((selectedAreas.includes('mesio_buccal_cusp') || selectedAreas.includes('disto_buccal_cusp'))) {
        let indexOfBuccal = newSelectedAreas.indexOf('buccal');
        if (indexOfBuccal !== -1) newSelectedAreas.splice(indexOfBuccal, 1);
        selectedAreas = newSelectedAreas;
      }
      if ((selectedAreas.includes('mesio_palatal_cusp') || selectedAreas.includes('disto_palatal_cusp'))) {
        let indexOfPalatal = newSelectedAreas.indexOf('palatal');
        if (indexOfPalatal !== -1) newSelectedAreas.splice(indexOfPalatal, 1);
        selectedAreas = newSelectedAreas;
      }
    }
    for (let q = 0; q < selectedAreas.length; q += 1) {
      let frontArea = (teeth[toothNumber][selectedAreas[q]]) ? teeth[toothNumber][selectedAreas[q]]['front'] : [];
      // let topArea = teeth[toothNumber][selectedAreas[q]]['top'];
      let backArea = (teeth[toothNumber][selectedAreas[q]]) ? teeth[toothNumber][selectedAreas[q]]['back'] : [];
      let vektisArea = []; // teeth[16][selectedAreas[q]]['vektis'];

      if([16, 17, 18, 26, 27, 28].map(String).includes(toothNumber)) vektisArea = teeth[16][selectedAreas[q]]['vektis'];
      if([46, 47, 48, 36, 37, 38].map(String).includes(toothNumber)) vektisArea = teeth[46][selectedAreas[q]]['vektis'];
      if([13, 23].map(String).includes(toothNumber)) vektisArea = teeth[13][selectedAreas[q]]['vektis'];
      if ([15, 14, 12, 11, 25, 24, 22, 21, 35, 34, 32, 31, 45, 44, 42, 41].map(String).includes(toothNumber)) vektisArea = teeth[14][selectedAreas[q]]['vektis'];

      frontArea = (typeof frontArea === 'undefined') ? [] : frontArea;
      // topArea = (typeof topArea === 'undefined') ? [] : topArea;
      backArea = (typeof backArea === 'undefined') ? [] : backArea;
      vektisArea = (typeof vektisArea === 'undefined') ? [] : vektisArea;

      for (let b = 0; b < frontArea.length; b += 1) {
        if (!frontCanvasPaths.includes(frontArea[b])) {
          drawToothFrontMarker(new Path2D(paths[frontArea[b]]), frontContext, toothNumber, color);
          // frontContext.globalCompositeOperation = 'destination-over';
          // frontContext.fillStyle = color;
          // frontContext.fill(new Path2D(paths[frontArea[b]]));
        }
        frontCanvasPaths.push(frontArea[b]);
      }
      for (let b = 0; b < backArea.length; b += 1) {
        if (!backCanvasPaths.includes(backArea[b])) {
          drawToothFrontMarker(new Path2D(paths[backArea[b]]), backContext, toothNumber, color);
          // backContext.globalCompositeOperation = 'destination-over';
          // backContext.fillStyle = color;
          // backContext.fill(new Path2D(paths[backArea[b]]));
        }
        backCanvasPaths.push(backArea[b]);
      }
      // for (let z = 0; z < backArea.length; z += 1) {
      //   if (!backCanvasPaths.includes(backArea[z])) {
      //     drawToothFrontMarker(new Path2D(paths[backArea[z]]), backContext, toothNumber, color);
      //   }
      //   backCanvasPaths.push(backArea[z]);
      // }

      if (vektisArea.length > 0) {
        vektisMapContext.beginPath();
        vektisMapContext.moveTo(vektisArea[0][0], vektisArea[0][1]);
        for (let z = 1; z < vektisArea.length; z += 1) {
          vektisMapContext.lineTo(vektisArea[z][0], vektisArea[z][1]);
        }
        vektisMapContext.fillStyle = color;
        vektisMapContext.fill();
      }
    }
  };
  const markFullChart = (toothNumber) => {
    const frontCanvasContainer = document.getElementById(`canvasContainerFront-${toothNumber}`);
    const vektisCanvasContainer = document.getElementById(`canvasContainerVektis-${toothNumber}`);
    const backCanvasContainer = document.getElementById(`canvasContainerBack-${toothNumber}`);

    const backCanvas = backCanvasContainer?.childNodes[0];
    // const topCanvas = canvasContainer.childNodes[1];
    const frontCanvas = frontCanvasContainer?.childNodes[0];
    const vektisMapCanvas = vektisCanvasContainer?.childNodes[0];

    // if (leftUpperJaw.includes(toothNumber)) vektisMapCanvas.style.transform = 'scale(1, 1)';
    // if (rightUpperJaw.includes(toothNumber)) vektisMapCanvas.style.transform = 'scaleX(-1)';
    // if (leftLowerJaw.includes(toothNumber)) vektisMapCanvas.style.transform = 'scaleY(-1)';
    // if (rightLowerJaw.includes(toothNumber)) vektisMapCanvas.style.transform = 'scale(-1, -1)';

    const backContext = backCanvas?.getContext('2d');
    // const topContext = topCanvas.getContext('2d');
    const frontContext = frontCanvas?.getContext('2d');
    const vektisMapContext = vektisMapCanvas?.getContext('2d');

    frontContext?.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    // topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
    backContext?.clearRect(0, 0, backCanvas.width, backCanvas.height);
    vektisMapContext?.clearRect(0, 0, vektisMapCanvas.width, vektisMapCanvas.height);

    const pathologyDiagnosis = treatmentBlob?.value[toothNumber]['pathology'];
    const restorationTreatment = treatmentBlob?.value[toothNumber]['restoration'];

    let tempPathologyAreas = [];
    let tempRestorationAreas = [];

    if (typeof restorationTreatment !== 'undefined' && !treatmentBlob?.value?.missing.includes(toothNumber)) {
      let restorationArray = restorationTreatment['filling'];
      let type = restorationTreatment['type'];
      if (typeof restorationArray !== 'undefined') {
        tempRestorationAreas = restorationArray;
        paint(frontContext, vektisMapContext, backContext, tempRestorationAreas, restorationColors[type], toothNumber);
      }
    }
    // if (typeof pathologyDiagnosis !== 'undefined') {
    //   let decayArray = pathologyDiagnosis['decay'];
    //   if (typeof decayArray !== 'undefined') {
    //     tempPathologyAreas = decayArray;
    //     paint(frontContext, vektisMapContext, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)', toothNumber);
    //   }
    // }

    if (typeof pathologyDiagnosis !== 'undefined' && !treatmentBlob?.value?.missing.includes(toothNumber)) {
      let decayArray = pathologyDiagnosis['decay'];
      if (typeof decayArray !== 'undefined') {
        tempPathologyAreas = decayArray;
        tempPathologyAreas.forEach((area) => {
          if (tempRestorationAreas?.includes(area)) {
            let indexOfArea = tempPathologyAreas.indexOf(area);
            tempPathologyAreas?.splice(indexOfArea, 1);
          }
        });
        paint(frontContext, vektisMapContext, backContext, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)', toothNumber);
      }
    }
    if (!treatmentBlob?.value?.missing?.includes(toothNumber)) initializeVektisMap(vektisMapContext, toothNumber);
  };
   const markDecay = () => {
    // Pathology Layer
    const canvasContainer = document.getElementById('pathologyScreen');

    const backCanvas = canvasContainer?.childNodes[3];
    const topCanvas = canvasContainer?.childNodes[1];
    const frontCanvas = canvasContainer?.childNodes[0];
    const vektisMapCanvas = canvasContainer?.childNodes[2];

    if (leftUpperJaw?.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(1, 1)';
    if (rightUpperJaw?.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scaleX(-1)';
    if (leftLowerJaw?.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scaleY(-1)';
    if (rightLowerJaw.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(-1, -1)';

    if (upperCanineVektis?.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(1, -1)';
    if (lowerCanineVektis?.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(-1, -1)';

    const backCtx = backCanvas.getContext('2d');
    const topCtx = topCanvas.getContext('2d');
    const frontCtx = frontCanvas.getContext('2d');
    const vektisCtx = vektisMapCanvas.getContext('2d');

    frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
    backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
    vektisCtx.clearRect(0, 0, vektisMapCanvas.width, vektisMapCanvas.height);

    const pathologyDiagnosis = treatmentBlob.value[activeTooth.value]['pathology'];
    const restorationTreatment = treatmentBlob.value[activeTooth.value]['restoration'];

    let tempPathologyAreas = [];
    let tempRestorationAreas = [];

    if (typeof restorationTreatment !== 'undefined') {
      let restorationArray = restorationTreatment['filling'];
      let type = restorationTreatment['type'];
      if (typeof restorationArray !== 'undefined') {
        tempRestorationAreas = restorationArray;
        paint(backCtx, topCtx, frontCtx, vektisCtx, tempRestorationAreas, restorationColors[type]);
      }
    }
    // if (typeof pathologyDiagnosis !== 'undefined') {
    //   let decayArray = pathologyDiagnosis['decay'];
    //   if (typeof decayArray !== 'undefined') {
    //     tempPathologyAreas = decayArray;
    //     paint(backCtx, topCtx, frontCtx, vektisCtx, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)');
    //   }
    // }
    if (typeof pathologyDiagnosis !== 'undefined') {
      let decayArray = pathologyDiagnosis['decay'];
      if (typeof decayArray !== 'undefined') {
        tempPathologyAreas = decayArray;
        tempPathologyAreas.forEach((area) => {
          if (tempRestorationAreas.includes(area)) {
            let indexOfArea = tempPathologyAreas.indexOf(area);
            tempPathologyAreas.splice(indexOfArea, 1);
          }
        });
        paint(backCtx, topCtx, frontCtx, vektisCtx, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)');
      }
    }
  };
    const drawToothTopMarker = (path, ctx, toothNumber, color) => {
    ctx.save();
    ctx.fillStyle = color;
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(-1, 0, 0, 1, 250, 0);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 250, 0);
      ctx.scale(-1, 1);
    }
    if (leftLowerJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    ctx.fill(path);
    ctx.restore();
  };
  const store = useStore()
const patientId = computed(() => store.state.auth.user);

store.dispatch('treatment/patientsFetch', patientId.value.id);
 
 console.log('patientId 123',patientId.value.id)

 const newtreatmentBlob = computed(() => store?.state?.treatment?.patientTreatments);
 const client_treatments_all = newtreatmentBlob?.value

// const client_treatments = client_treatments_all.tooth_sections

// const sections = JSON.parse(client_treatments)
console.log('new client_treatments_all here kkk ', client_treatments_all)
// Object.assign(treatmentBlob.value, sections)



watch(treatmentBlob?.value, () => {
  loadFullChart()
  allTeeth.forEach((toothNumber) => markFullChart(toothNumber));
  isFullChartVisible.value = true
  treatmentBlob.value, () => markDecay()
})

onMounted(() => {
  loadFullChart()
  store.dispatch('treatment/patientsFetch', patientId.value.id);
  getTreatment()
  console.log('its happening', treatmentBlob.value)
})


</script>
