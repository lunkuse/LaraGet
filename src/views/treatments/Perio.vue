<!-- eslint-disable no-unused-vars -->
<template>
 
  <div class="grid-cols-12 gap-6 mt-8" :key="componentKey">
    <!-- {{activeTreatment}} -->
    <!-- <div class="left-24 right-0 px-2 bottom-2 overflow-auto space-y-1 flex flex-col"
    id="perio-chart">-->
    <div
      class="left-24 right-0 px-2 bottom-2 overflow-auto space-y-1 flex flex-col w-full h-full"
      id="perio-chart"
    >
      <!-- Body -->
      <!-- <div id="PrintPerio" class="w-full"> -->
      <div class="ml-24 h-auto p-0.5 flex flex-none space-x-2 relative">
        <div
          class="absolute w-26 pl-1 px-0.5 py-1.5 space-y-0.5 flex flex-col text-black dark:text-white -left-28 text-xs bottom-0 -top-1"
        >
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          ></div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
        
            <p > {{ $t('translation.implant_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
          <p >{{ $t('translation.furcation_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
          <p > {{ $t('translation.implant_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
           
            <p > {{ $t('translation.bleeding_on_probing_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
          <p > {{ $t('translation.plaque_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
          <p >{{ $t('translation.gingival_margin_text') }}</p>
          </div>
          <div
            class="w-full h-6 border border-gray-300 whitespace-nowrap flex items-center px-0.5 text-xs"
          >
          <p > {{ $t('translation.probing_depth_text') }}</p>
          </div>
          <div
            class="w-full h-20 whitespace-nowrap flex items-center pl-1 px-0.5 text-base font-semibold"
          >
          <p > {{ $t('translation.buccal_text') }}</p>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5"
            :id="`tooth-selectable-f-${tooth.toothNumber}`"
            v-for="tooth in leftUpperJaw.filter((tooth) => displayedLeftUpperJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-6 w-full px-0.5">
                <input
                  disabled
                  type="number"
                  max="3"
                  min="0"
                  :id="`mobility-f-${tooth.toothNumber}`"
                  class="w-full h-full bg-gray-200"
                />
              </div>
              <div
                v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
                class="w-full h-6 p-0.5"
              >
                <div
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-f-${tooth.toothNumber}-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
                class="h-6 w-full border-b"
              ></div>
              <div class="w-full h-6 flex items-center justify-center">
                <input
                  disabled
                  type="checkbox"
                  :id="`implant-f-${tooth.toothNumber}`"
                  class="w-3 h-3 border bg-gray-200"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5"
            :id="`tooth-selectable-f-${tooth.toothNumber}`"
            v-for="tooth in rightUpperJaw.filter((tooth) => displayedrRightUpperJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-6 w-full px-0.5">
                <input
                  disabled
                  type="number"
                  max="3"
                  min="0"
                  :id="`mobility-f-${tooth.toothNumber}`"
                  class="w-full h-full bg-gray-200"
                />
              </div>
              <div
                v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
                class="w-full h-6 p-0.5"
              >
                <div
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-f-${tooth.toothNumber}-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
                class="h-6 w-full border-b"
              ></div>
              <div class="w-full h-6 flex items-center justify-center">
                <input
                  disabled
                  type="checkbox"
                  :id="`implant-f-${tooth.toothNumber}`"
                  class="w-3 h-3 border bg-gray-200"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-24 h-auto p-0.5 flex flex-grow-0 space-x-2 relative">
        <div
          class="absolute w-26 pl-1 px-0.5 py-1.5 space-y-0.5 flex flex-col-reverse text-black -left-28 text-xs bottom-0 -top-1"
        >
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs"></div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p >{{ $t('translation.furcation_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.bleeding_on_probing_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
          
            <p > {{ $t('translation.plaque_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p >{{ $t('translation.gingival_margin_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.probing_depth_text') }}</p>
          </div>
          <div
            class="w-full h-20 whitespace-nowrap flex items-center pl-1 px-0.5 text-base font-semibold"
          >
          <p > {{ $t('translation.lingual_text') }}</p>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5 flex flex-col-reverse flex-grow-0"
            :id="`tooth-selectable-b-${tooth.toothNumber}`"
            v-for="tooth in leftUpperJaw.filter((tooth) => displayedLeftUpperJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div
              class="w-full h-auto p-0 space-y-0.5 flex flex-col-reverse"
              :id="`missing-b-${tooth.toothNumber}`"
            >
              <div
                class="flex space-x-0.5 p-0.5"
                :id="`furcation-b-${tooth.toothNumber}`"
                v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
              >
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                "
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-left-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-right-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                class="h-6 w-full border-t border-b m-0.5"
                v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
              ></div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5 flex flex-col-reverse flex-grow-0"
            :id="`tooth-selectable-b-${tooth.toothNumber}`"
            v-for="tooth in rightUpperJaw.filter((tooth) => displayedrRightUpperJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div
              class="w-full h-auto p-0 space-y-0.5 flex flex-col-reverse"
              :id="`missing-b-${tooth.toothNumber}`"
            >
              <div
                class="flex space-x-0.5 p-0.5"
                :id="`furcation-b-${tooth.toothNumber}`"
                v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
              >
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                "
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-left-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-right-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                class="h-6 w-full border-t border-b m-0.5"
                v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)"
              ></div>
              <!-- <div class="w-full h-6 flex items-center justify-center">
                          <input disabled
                            type="checkbox"
                            :id="`implant-b-${tooth.toothNumber}`"
                            @change="indicateImplant($event, 'back', tooth.toothNumber)"
                            class="w-3 h-3 border bg-gray-200"
                          />
              </div>-->
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-24 h-auto p-0.5 flex flex-none space-x-2 relative">
        <div
          class="absolute w-26 pl-1 px-0.5 py-1.5 space-y-0.5 flex flex-col text-black -left-28 text-xs bottom-0 -top-1"
        >
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs"></div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
        
            <p > {{ $t('translation.mobility_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p >{{ $t('translation.furcation_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.implant_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.bleeding_on_probing_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.plaque_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
        
            <p >{{ $t('translation.gingival_margin_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
        
            <p > {{ $t('translation.probing_depth_text') }}</p>
          </div>
          <div
            class="w-full h-20 whitespace-nowrap flex items-center pl-1 px-0.5 text-base font-semibold"
          >
          
            <p > {{ $t('translation.buccal_text') }}</p>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5"
            :id="`tooth-selectable-f-${tooth.toothNumber}`"
            v-for="tooth in leftLowerJaw.filter((tooth) => displayedLeftLowerJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-6 w-full px-0.5">
                <input
                  disabled
                  type="number"
                  max="3"
                  min="0"
                  :id="`mobility-f-${tooth.toothNumber}`"
                  class="w-full h-full bg-gray-200"
                />
              </div>
              <div
                v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
                class="w-full h-6 p-0.5"
              >
                <div
                  @click.prevent="
                  indicateFurcation(
                    `furcation-f-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'front'
                  )
                "
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-f-${tooth.toothNumber}-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
                class="h-6 w-full border-b"
              ></div>
              <div class="w-full h-6 flex items-center justify-center">
                <input
                  disabled
                  type="checkbox"
                  :id="`implant-f-${tooth.toothNumber}`"
                  class="w-3 h-3 border bg-gray-200"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5"
            :id="`tooth-selectable-f-${tooth.toothNumber}`"
            v-for="tooth in rightLowerJaw.filter((tooth) => displayedRightLowerJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-6 w-full px-0.5">
                <input
                  disabled
                  type="number"
                  max="3"
                  min="0"
                  :id="`mobility-f-${tooth.toothNumber}`"
                  class="w-full h-full bg-gray-200"
                />
              </div>
              <div
                v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
                class="w-full h-6 p-0.5"
              >
                <div
                  @click.prevent="
                  indicateFurcation(
                    `furcation-f-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'front'
                  )
                "
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-f-${tooth.toothNumber}-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
                class="h-6 w-full border-b"
              ></div>
              <div class="w-full h-6 flex items-center justify-center">
                <input
                  disabled
                  type="checkbox"
                  :id="`implant-f-${tooth.toothNumber}`"
                  class="w-3 h-3 border bg-gray-200"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-f-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="front"
              data-image-extension="f"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-24 h-auto p-0.5 flex flex-grow-0 space-x-2 relative">
        <div
          class="absolute w-26 pl-1 px-0.5 py-1.5 space-y-0.5 flex flex-col-reverse text-black -left-28 text-xs bottom-0 -top-1"
        >
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs"></div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
         
            <p >{{ $t('translation.furcation_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.bleeding_on_probing_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.plaque_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p >{{ $t('translation.gingival_margin_text') }}</p>
          </div>
          <div class="w-full h-6 border whitespace-nowrap flex items-center px-0.5 text-xs">
            <p > {{ $t('translation.probing_depth_text') }}</p>
          </div>
          <div
            class="w-full h-20 whitespace-nowrap flex items-center pl-1 px-0.5 text-base font-semibold"
          >
          
            <p > {{ $t('translation.lingual_text') }}</p>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5 flex flex-col-reverse flex-grow-0"
            :id="`tooth-selectable-b-${tooth.toothNumber}`"
            v-for="tooth in leftLowerJaw.filter((tooth) => displayedLeftLowerJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>

            <div
              class="w-full h-auto p-0 flex flex-col-reverse flex-grow-0 space-y-0.5"
              :id="`missing-b-${tooth.toothNumber}`"
            >
              <div
                class="flex space-x-0.5 p-0.5"
                v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
              >
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-left-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-right-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                class="h-6 w-full border-t border-b m-0.5"
                v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
              ></div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-t border-b border-l border-gray-300">
          <div
            :class="[ (displayedLeftUpperJaw.length === 5) ? 'w-1/5' : 'w-1/8']"
            class="border-r border-gray-300 h-full space-y-0.5 flex flex-col-reverse flex-grow-0"
            :id="`tooth-selectable-b-${tooth.toothNumber}`"
            v-for="tooth in rightLowerJaw.filter((tooth) => displayedRightLowerJaw.includes(tooth.toothNumber.toString()))"
            :key="tooth"
          >
            <div class="w-full h-6 text-xs flex justify-center items-center cursor-pointer">
              <span
                v-if="treatmentBlob[tooth.toothNumber].hasOwnProperty('isPrimary')"
              >{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber}}</span>
            </div>
            <div
              class="w-full h-auto p-0 flex flex-col-reverse flex-grow-0 space-y-0.5"
              :id="`missing-b-${tooth.toothNumber}`"
            >
              <div
                class="flex space-x-0.5 p-0.5"
                v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
              >
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-left-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div
                  @click.prevent="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                "
                  :id="`furcation-b-${tooth.toothNumber}`"
                  class="w-1/2 h-6 border bg-gray-200 flex items-center justify-center"
                >
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"
                  ></div>
                  <div
                    :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"
                  ></div>
                  <svg
                    :id="`furcation-b-${tooth.toothNumber}-right-2`"
                    class="hidden"
                    height="18"
                    width="18"
                  >
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div
                class="h-6 w-full border-t border-b m-0.5"
                v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)"
              ></div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
                <div
                  class="w-1/3 h-full border bg-gray-200 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`"
                  @click.prevent="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "
                ></div>
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`gingival-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
              <div class="w-full h-6 px-0.5 space-x-0.5 flex">
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-left-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-center-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
                <input
                  disabled
                  type="number"
                  value="0"
                  :id="`probing-input-b-right-${tooth.toothNumber}`"
                  @keyup.prevent="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                "
                  class="w-1/3 h-full border"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative"
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`"
              :data-jaw="tooth.jaw"
              data-part="back"
              data-image-extension="b"
              :data-tooth-image="tooth.toothImage"
            >
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- End Body -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, inject, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import useCustomStore from '@/composables/charting/store'
import useConstants from '@/composables/charting/constants'
import images from '@/assets/data/images.json'
import implantImages from '@/assets/data/implants.json'
import missingTeeth from '@/assets/data/missing.json'
// import axios from 'axios'
import axios from '../../axios'
import router from '../../router'
const {
  leftLowerJaw,
  leftUpperJaw,
  rightLowerJaw,
  rightUpperJaw,
  _leftLowerJaw,
  _leftUpperJaw,
  _rightLowerJaw,
  _rightUpperJaw,

  // eslint-disable-next-line no-unused-vars
  dimensions,
  toothNumbers,
  // eslint-disable-next-line no-unused-vars
  upperJaw,
  // eslint-disable-next-line no-unused-vars
  lowerJaw,
  // eslint-disable-next-line no-unused-vars
  _upperJaw,
  // eslint-disable-next-line no-unused-vars
  _lowerJaw,
  // eslint-disable-next-line no-unused-vars
  infantLeftLowerJaw,
  // eslint-disable-next-line no-unused-vars
  infantLeftUpperJaw,
  // eslint-disable-next-line no-unused-vars
  infantRightLowerJaw,
  // eslint-disable-next-line no-unused-vars
  infantRightUpperJaw,
  // eslint-disable-next-line no-unused-vars
  allTeeth,
  // eslint-disable-next-line no-unused-vars
  excludeFromFurcation,
  age
} = useConstants()

// const { treatmentBlob } = useCustomStore();
const plaque = ref({})
const bleeding = ref({})
const mobility = ref({})
const implant = ref({})
const missing = ref([])
// const missing = (age.value < 18) ? ref(['18', '17', '16', '28', '27', '26', '38', '37', '36', '48', '47', '46']) : ref([]);
const swal = inject('$swal')

const store = useStore()
const tooth_treatments = ref({})//localStorage.getItem('tooth_sections')
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
// const activeTreatment = computed(() => store.state.patientsTreatments.activeTreatment);
const activeTreatment = ref({
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

// const activePatient = ref(JSON.parse(sessionStorage.getItem('SinglePatient')));
// const activePatient = computed(() => store.state.treatments.activePatient);
// const treatmentBlob = (Object.keys(activeTreatment.value).length !== 0) ? ref(JSON.parse(activeTreatment.value.tooth_sections)) : inject('treatmentBlob');
const furcationCounts = ref({})
const gingivalMarginLevels = ref({})
const probingDepthLevels = ref({})
const displayedLeftUpperJaw = ref([])
const displayedrRightUpperJaw = ref([])
const displayedLeftLowerJaw = ref([])
const displayedRightLowerJaw = ref([])
const isInfant = ref(false)
const componentKey = ref(1)

const indicateProbingDepth = () => console.log('Action denied')
const indicateGingivalMargin = () => console.log('Action denied')
const indicatePlaque = () => console.log('Action denied')
const indicateBleeding = () => console.log('Action denied')

// eslint-disable-next-line no-unused-vars
const activeCommand = inject('activeCommand')

// eslint-disable-next-line no-unused-vars
const activeVoiceSelectedTooth = ref('')

// eslint-disable-next-line no-unused-vars
const activeVoiceSelectedFace = ref('front')

// eslint-disable-next-line no-unused-vars
const activeVoiceSelectedSide = ref('left')

// eslint-disable-next-line no-unused-vars
// const confirmationToast = swal.mixin({
//   title: 'Are you sure?',
// });

const reRenderChart = (_toothNumber, canvasId, face) => {
  const canvasContainer = document.getElementById(canvasId)
  // console.log(toothNumber, canvasId, canvasContainer);
  // if (canvasContainer) {
  // <================================ temporary error handler
  let toothImage = canvasContainer.getAttribute('data-tooth-image')
  let imageExtension = canvasContainer.getAttribute('data-image-extension')
  let canvas = canvasContainer.childNodes[0]
  let ctx = canvas.getContext('2d')
  const toothNumber = _toothNumber.toString()
  const controlContainer = document.getElementById(
    `missing-${imageExtension}-${toothNumber}`
  )
  const furcationControlContainer = document.getElementById(
    `furcation-${imageExtension}-${toothNumber}`
  )

  // Getting All treatments
  const token = localStorage.getItem('token')

  const userId = localStorage.getItem('userID')

  const data = {
    patientId: userId
  }

  // axios
  //   .post('v1/donetreatments/get_done_treatments_by_patient_side', data, {
  //     headers: {
  //       Authorization: 'Bearer ' + token,

  //       'Content-Type': 'application/json',
  //       'X-Requested-With': 'XMLHttpRequest'
  //     }
  //   })
  //   .then(res => {
  //     console.log('start getting')
  //     const client_treatments_all = res.data.payload[0]

  //     const client_treatments = client_treatments_all.tooth_sections

  //     const sections = JSON.parse(client_treatments)
  //     // const client_treatment_secs = sections[`${toothID}`]

  //     Object.assign(treatmentBlob.value, sections)
  //     Object.assign(activeTreatment.value, sections)

  console.log('new treatments up again last', tooth_treatments.value)
  

  const hasImplant = implant.value?.[toothNumber]

  const treatmentone = activeTreatment.value
  
  const isMissing = ref(treatmentone.missing.includes(toothNumber))

  const furcationPostions = {
    18: {
      front: { x: 130, y: 250 },
      back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } }
    },
    17: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } }
    },
    16: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } }
    },
    15: {
      front: { x: 130, y: 250 },
      back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } }
    },
    28: {
      front: { x: 130, y: 250 },
      back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } }
    },
    27: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } }
    },
    26: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } }
    },
    25: {
      front: { x: 130, y: 250 },
      back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } }
    },
    38: {
      front: { x: 130, y: 250 },
      back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } }
    },
    37: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } }
    },
    36: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } }
    },
    35: {
      front: { x: 130, y: 250 },
      back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } }
    },
    48: {
      front: { x: 130, y: 250 },
      back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } }
    },
    47: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } }
    },
    46: {
      front: { x: 130, y: 250 },
      back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } }
    },
    45: {
      front: { x: 130, y: 250 },
      back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  let image = new Image()
  image.onload = () => ctx.drawImage(image, 60, -40)
  // console.log('typeof hasImplant bbbb',  treatmentone[`${toothNumber}`]?.periodontal?.implant )
  console.log(
    'typeof hasImplant bbbb',
    typeof treatmentone[`${toothNumber}`]?.periodontal?.implant
  )
  if (
    typeof treatmentone[`${toothNumber}`]?.periodontal?.implant !==
      'undefined' &&
    !isMissing.value
  ) {
    // if (typeof hasImplant !== 'undefined' && !isMissing) {
    // eslint-disable-next-line no-unused-expressions
    furcationControlContainer?.classList?.toggle('invisible')
    image.src = implantImages[toothImage][face]
  } else if (isMissing.value) {
    image.src = missingTeeth[toothImage][face]
    if (!controlContainer.classList.contains('invisible'))
      controlContainer.classList.add('invisible')
    // console.log(toothNumber, controlContainer);
  } else {
    if (controlContainer.classList.contains('invisible'))
      controlContainer.classList.remove('invisible')
    image.src = images[toothImage][imageExtension]
  }

  ctx.beginPath()
  for (let fY = 0; fY <= canvas.height - 250; fY += 30) {
    ctx.moveTo(0, fY + 50)
    ctx.lineTo(canvas.height, fY + 50)
    ctx.lineWidth = 4
    ctx.strokeStyle = '#c0c0c0'
  }
  ctx.stroke()

  // const hasGingivalMarginChangeOnFace = gingivalMarginLevels.value?.[face];
  let leftGingivalValue =
    typeof gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[
      face
    ]?.['left'] !== 'undefined'
      ? gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[face]?.[
          'left'
        ]
      : 0
  let centerGingivalValue =
    typeof gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[
      face
    ]?.['center'] !== 'undefined'
      ? gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[face]?.[
          'center'
        ]
      : 0
  let rightGingivalValue =
    typeof gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[
      face
    ]?.['right'] !== 'undefined'
      ? gingivalMarginLevels.value?.[toothNumber]?.['gingivalMargin']?.[face]?.[
          'right'
        ]
      : 0

  // const hasProbingDepthChangeOnFace = probingDepthLevels.value?.[face];
  let leftProbingValue =
    typeof probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
      'left'
    ] !== 'undefined'
      ? probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
          'left'
        ]
      : 0
  let centerProbingValue =
    typeof probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
      'center'
    ] !== 'undefined'
      ? probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
          'center'
        ]
      : 0
  let rightProbingValue =
    typeof probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
      'right'
    ] !== 'undefined'
      ? probingDepthLevels.value?.[toothNumber]?.['probingDepth']?.[face]?.[
          'right'
        ]
      : 0

  ctx.beginPath()
  if (isMissing.value) {
    // eslint-disable-next-line no-multi-assign
    leftGingivalValue = centerGingivalValue = rightGingivalValue = 0
    // eslint-disable-next-line no-multi-assign
    leftProbingValue = centerProbingValue = rightProbingValue = 0
  }
  // eslint-disable-next-line radix
  ctx.moveTo(0, canvas.height - 200 + parseInt(leftGingivalValue) * 10)
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width * 0.5,
    canvas.height - 200 + parseInt(centerGingivalValue) * 10
  )
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width,
    canvas.height - 200 + parseInt(rightGingivalValue) * 10
  )
  // ctx.lineTo(canvas.width, canvas.height - 200);
  ctx.lineWidth = 7
  ctx.strokeStyle = 'red'
  ctx.stroke()

  ctx.beginPath()
  // eslint-disable-next-line radix
  ctx.moveTo(
    0,
    canvas.height -
      200 +
      (parseInt(leftProbingValue) - parseInt(leftGingivalValue)) * -10
  )
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width * 0.5,
    canvas.height -
      200 +
      (parseInt(centerProbingValue) - parseInt(centerGingivalValue)) * -10
  )
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width,
    canvas.height -
      200 +
      (parseInt(rightProbingValue) - parseInt(rightGingivalValue)) * -10
  )
  // ctx.lineTo(canvas.width, canvas.height - 200);
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width,
    canvas.height - 200 + parseInt(rightGingivalValue) * 10
  )
  // eslint-disable-next-line radix
  ctx.lineTo(
    canvas.width * 0.5,
    canvas.height - 200 + parseInt(centerGingivalValue) * 10
  )
  // eslint-disable-next-line radix
  ctx.lineTo(0, canvas.height - 200 + parseInt(leftGingivalValue) * 10)
  ctx.lineWidth = 7
  ctx.strokeStyle = '#0073ff'
  ctx.fillStyle = 'rgba(0,115,255, 0.3)'
  ctx.fill()
  ctx.stroke()

  const hasFurcationOnFrontFace =
    furcationCounts.value?.[toothNumber]?.['front']?.['count']
  const hasFurcationOnBackFaceLeft =
    furcationCounts.value?.[toothNumber]?.['back']?.['left']?.['count']
  const hasFurcationOnBackFaceRight =
    furcationCounts.value?.[toothNumber]?.['back']?.['right']?.['count']

  if (hasFurcationOnFrontFace === 1 && face === 'front') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(130, 250, 30, 0, Math.PI * 2)
    ctx.lineWidth = 8
    ctx.stroke()
  }
  if (hasFurcationOnFrontFace === 2 && face === 'front') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(130, 250, 30, (Math.PI * 3) / 2, Math.PI / 2)
    ctx.lineWidth = 8
    ctx.fill()
  }
  if (hasFurcationOnFrontFace === 3 && face === 'front') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(130, 250, 30, 0, Math.PI * 2)
    ctx.lineWidth = 8
    ctx.fill()
  }
  if (hasFurcationOnBackFaceLeft === 1 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['left']['x'],
      furcationPostions[toothNumber]['back']['left']['y'],
      25,
      0,
      Math.PI * 2
    )
    ctx.lineWidth = 8
    ctx.stroke()
  }
  if (hasFurcationOnBackFaceLeft === 2 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['left']['x'],
      furcationPostions[toothNumber]['back']['left']['y'],
      25,
      (Math.PI * 3) / 2,
      Math.PI / 2
    )
    ctx.lineWidth = 8
    ctx.fill()
  }
  if (hasFurcationOnBackFaceLeft === 3 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['left']['x'],
      furcationPostions[toothNumber]['back']['left']['y'],
      25,
      0,
      Math.PI * 2
    )
    ctx.lineWidth = 8
    ctx.fill()
  }
  if (hasFurcationOnBackFaceRight === 1 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['right']['x'],
      furcationPostions[toothNumber]['back']['right']['y'],
      25,
      0,
      Math.PI * 2
    )
    ctx.lineWidth = 8
    ctx.stroke()
  }
  if (hasFurcationOnBackFaceRight === 2 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['right']['x'],
      furcationPostions[toothNumber]['back']['right']['y'],
      25,
      (Math.PI * 3) / 2,
      Math.PI / 2
    )
    ctx.lineWidth = 8
    ctx.fill()
  }
  if (hasFurcationOnBackFaceRight === 3 && face === 'back') {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.arc(
      furcationPostions[toothNumber]['back']['right']['x'],
      furcationPostions[toothNumber]['back']['right']['y'],
      25,
      0,
      Math.PI * 2
    )
    ctx.lineWidth = 8
    ctx.fill()
  }

  // })

  // console.log(hasFurcationOnBackFaceLeft, hasFurcationOnBackFaceRight, hasFurcationOnFrontFace);
}

// stop here

const initializeStateRefs = () => {
  const derivedTreatmentBlobLength = Object.keys(activeTreatment.value).length
  if (derivedTreatmentBlobLength !== 0) {
    // Getting All treatments
    const token = localStorage.getItem('token')

    const userId = localStorage.getItem('userID')

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

        const client_treatments = client_treatments_all.tooth_sections

        const sections = JSON.parse(client_treatments)
        // const client_treatment_secs = sections[`${toothID}`]

        Object.assign(treatmentBlob.value, sections)
        Object.assign(activeTreatment.value, sections)
        console.log('new treatments up', activeTreatment.value)

        // const treatment = JSON.parse(activeTreatment.value.tooth_sections); // console.log(treatment);
        const tooth_treatments1 = localStorage.getItem('tooth_sections')
        //  console.log('new treatments up again last', JSON.parse(tooth_treatments).tooth_sections)
        const treatment_sections = JSON.parse(tooth_treatments1).tooth_sections
        const treatment = JSON.parse(treatment_sections)
        console.log('get treatments first ', JSON.parse(treatment_sections))
        toothNumbers.forEach(tooth => {
          console.log('get treatments ', treatment.missing)
          const hasFurcation =
            treatment?.[tooth]?.['periodontal']?.['furcation']
          const hasGingivalMargin =
            treatment[tooth]?.['periodontal']?.['gingivalMargin']
          const hasProbingDepth =
            treatment[tooth]?.['periodontal']?.['probingDepth']
          const hasPlaque = treatment[tooth]?.['periodontal']?.['plaque']
          const hasBleeding = treatment[tooth]?.['periodontal']?.['bleeding']
          const hasMobility = treatment?.[tooth]?.['periodontal']?.['mobility']
          const hasImplant = treatment?.[tooth]?.['periodontal']?.['implant']
          const hasMissing = treatment.missing
          console.log('new missing check ', tooth, hasMissing)
          console.log('new implant check ', tooth, hasImplant)
          if (typeof hasMissing !== 'undefined') missing.value = hasMissing
          if (typeof hasImplant !== 'undefined')
            Object.assign(implant.value, { [tooth]: hasImplant })

          if (typeof hasFurcation !== 'undefined')
            Object.assign(furcationCounts.value, { [tooth]: hasFurcation })
          if (typeof hasGingivalMargin !== 'undefined')
            Object.assign(gingivalMarginLevels.value, {
              [tooth]: { gingivalMargin: hasGingivalMargin }
            })
          if (typeof hasProbingDepth !== 'undefined')
            Object.assign(probingDepthLevels.value, {
              [tooth]: { probingDepth: hasProbingDepth }
            })
          if (typeof hasPlaque !== 'undefined')
            Object.assign(plaque.value, { [tooth]: { plaque: hasPlaque } })
          if (typeof hasBleeding !== 'undefined')
            Object.assign(bleeding.value, {
              [tooth]: { bleeding: hasBleeding }
            })
          if (typeof hasMobility !== 'undefined')
            Object.assign(mobility.value, { [tooth]: hasMobility })

          // console.log(probingDepthLevels.value, gingivalMarginLevels.value, implant.value, mobility.value, plaque.value, bleeding.value);
        })

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
          router.go('/login')
        } else {
          // Handle else
        }
      })
  }
}

const initializeCanvases = () => {
  const elements = document.querySelectorAll('.tooth_visuals')

  elements.forEach(element => {
    let toothNumber = element.getAttribute('data-tooth-number')
    let part = element.getAttribute('data-part')
    let canvas = element.childNodes[0]
    let ctx = canvas.getContext('2d')

    canvas.height = 576
    canvas.width = 322 // dimensions[toothNumber]['width'];

    if (_leftUpperJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scale(1, 1)'
    if (_leftUpperJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scale(1, 1)'
    if (_leftUpperJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scaleY(-1)'

    if (_rightUpperJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scaleX(-1)'
    if (_rightUpperJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scaleX(-1)'
    if (_rightUpperJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scale(-1, -1)'

    if (_leftLowerJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scale(1, 1)'
    if (_leftLowerJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scale(1, 1)'
    if (_leftLowerJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scaleY(-1)'

    if (_rightLowerJaw.includes(toothNumber) && part === 'front')
      canvas.style.transform = 'scaleX(-1)'
    if (_rightLowerJaw.includes(toothNumber) && part === 'top')
      canvas.style.transform = 'scaleX(-1)'
    if (_rightLowerJaw.includes(toothNumber) && part === 'back')
      canvas.style.transform = 'scale(-1, -1)'

    ctx.globalCompositeOperation = 'destination-over'

    reRenderChart(toothNumber, `canvasContainerFront-${toothNumber}`, 'front')
    reRenderChart(toothNumber, `canvasContainerBack-${toothNumber}`, 'back')
  })
}

const initializeFurcation = () => {
  toothNumbers.forEach(tooth => {
    const hasFurcationOnFrontFace =
      furcationCounts.value?.[tooth]?.['front']?.['count']
    const hasFurcationOnBackFaceLeft =
      furcationCounts.value?.[tooth]?.['back']?.['left']?.['count']
    const hasFurcationOnBackFaceRight =
      furcationCounts.value?.[tooth]?.['back']?.['right']?.['count']

    if (typeof hasFurcationOnFrontFace !== 'undefined') {
      let inputField = document.getElementById(
        `furcation-f-${tooth}-${hasFurcationOnFrontFace}`
      )
      inputField.classList.replace('hidden', 'block')
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, 'front')
      // console.log(`furcation-f-${tooth}-${hasFurcationOnFrontFace['count']}`);
    }
    if (typeof hasFurcationOnBackFaceLeft !== 'undefined') {
      let inputField = document.getElementById(
        `furcation-b-${tooth}-left-${hasFurcationOnBackFaceLeft}`
      )
      inputField.classList.replace('hidden', 'block')
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')
    }
    if (typeof hasFurcationOnBackFaceRight !== 'undefined') {
      let inputField = document.getElementById(
        `furcation-b-${tooth}-right-${hasFurcationOnBackFaceRight}`
      )
      inputField.classList.replace('hidden', 'block')
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')
    }
  })
}

const initializeGingivalMargin = () => {
  toothNumbers.forEach(tooth => {
    let hasFrontFace =
      gingivalMarginLevels.value?.[tooth]?.['gingivalMargin']?.['front']
    let hasBackFace =
      gingivalMarginLevels.value?.[tooth]?.['gingivalMargin']?.['back']
    if (typeof hasFrontFace !== 'undefined') {
      const sides = Object.keys(hasFrontFace)
      sides.forEach(side => {
        let inputField = document.getElementById(
          `gingival-input-f-${side}-${tooth}`
        )
        inputField.value = hasFrontFace[side]
      })
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, 'front')
    }

    if (typeof hasBackFace !== 'undefined') {
      const sides = Object.keys(hasBackFace)
      sides.forEach(side => {
        let inputField = document.getElementById(
          `gingival-input-b-${side}-${tooth}`
        )
        inputField.value = hasBackFace[side]
      })
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')
    }
  })
}

const initializeMissing = () => {
  toothNumbers.forEach(tooth => {
    reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')
    reRenderChart(tooth, `canvasContainerFront-${tooth}`, 'front')
  })
}

const initializeProbingDepth = () => {
  toothNumbers.forEach(tooth => {
    let hasFrontFace =
      probingDepthLevels.value?.[tooth]?.['probingDepth']?.['front']
    let hasBackFace =
      probingDepthLevels.value?.[tooth]?.['probingDepth']?.['back']
    if (typeof hasFrontFace !== 'undefined') {
      const sides = Object.keys(hasFrontFace)
      sides.forEach(side => {
        // console.log(`probing-input-f-${side}-${tooth}`);
        let inputField = document.getElementById(
          `probing-input-f-${side}-${tooth}`
        )
        inputField.value = hasFrontFace[side]
      })
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, 'front')
    }
    if (typeof hasBackFace !== 'undefined') {
      const sides = Object.keys(hasBackFace)
      sides.forEach(side => {
        // console.log(`probing-input-b-${side}-${tooth}`);
        let inputField = document.getElementById(
          `probing-input-b-${side}-${tooth}`
        )
        inputField.value = hasBackFace[side]
      })
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')
    }
  })
}

const initializePlaque = () => {
  toothNumbers.forEach(tooth => {
    let hasPlaqueOnFront = plaque.value?.[tooth]?.['plaque']?.['front']
    let hasPlaqueOnBack = plaque.value?.[tooth]?.['plaque']?.['back']

    if (typeof hasPlaqueOnFront !== 'undefined') {
      const sides = Object.keys(hasPlaqueOnFront)
      sides.forEach(side => {
        let inputField = document.getElementById(`plaque-f-${side}-${tooth}`)
        inputField.classList.toggle('bg-gray-200')
        inputField.classList.toggle('bg-blue-600')
      })
    }
    if (typeof hasPlaqueOnBack !== 'undefined') {
      const sides = Object.keys(hasPlaqueOnBack)
      sides.forEach(side => {
        let inputField = document.getElementById(`plaque-b-${side}-${tooth}`)
        inputField.classList.toggle('bg-gray-200')
        inputField.classList.toggle('bg-blue-600')
      })
    }
  })
}

const initializeBleeding = () => {
  toothNumbers.forEach(tooth => {
    let hasBleedingOnFront = bleeding.value?.[tooth]?.['bleeding']?.['front']
    let hasBleedingOnBack = bleeding.value?.[tooth]?.['bleeding']?.['back']

    if (typeof hasBleedingOnFront !== 'undefined') {
      const sides = Object.keys(hasBleedingOnFront)
      sides.forEach(side => {
        let inputField = document.getElementById(`bleeding-f-${side}-${tooth}`)
        inputField.classList.toggle('bg-gray-200')
        inputField.classList.toggle('bg-rose-600')
      })
    }
    if (typeof hasBleedingOnBack !== 'undefined') {
      const sides = Object.keys(hasBleedingOnBack)
      sides.forEach(side => {
        let inputField = document.getElementById(`bleeding-b-${side}-${tooth}`)
        inputField.classList.toggle('bg-gray-200')
        inputField.classList.toggle('bg-rose-600')
      })
    }
  })
}

const initializeMobility = () => {
  toothNumbers.forEach(tooth => {
    let inputFrontField = document.getElementById(`mobility-f-${tooth}`)
    const hasMobilityOnFrontFace = mobility.value?.[tooth]?.['front']
    // eslint-disable-next-line radix
    if (typeof hasMobilityOnFrontFace !== 'undefined')
      inputFrontField.value = parseInt(hasMobilityOnFrontFace)
  })
}

const initializeImplant = () => {
  toothNumbers.forEach(tooth => {
    let inputFrontField = document.getElementById(`implant-f-${tooth}`)
    const hasImplantOnFrontFace = implant.value?.[tooth]?.['implant']?.['front']
    console.log('implant detected', hasImplantOnFrontFace)
    reRenderChart(tooth, `canvasContainerFront-${tooth}`, 'front')
    reRenderChart(tooth, `canvasContainerBack-${tooth}`, 'back')

    if (typeof hasImplantOnFrontFace !== 'undefined')
      inputFrontField.checked = hasImplantOnFrontFace
  })
}
// Getting All treatments
function getTreatment() {
  // this.loading = true
  const token = localStorage.getItem('token')

  const userId = localStorage.getItem('userID')

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

      const client_treatments = client_treatments_all.tooth_sections

      const sections = JSON.parse(client_treatments)
      // const client_treatment_secs = sections[`${toothID}`]

      Object.assign(treatmentBlob.value, sections)
      Object.assign(activeTreatment.value, res.data.payload)
      localStorage.setItem(
        'tooth_sections',
        JSON.stringify(res.data.payload[0])
      )
      console.log('new treatments1 check', activeTreatment.value)
      if (res.data.success === false) {
        console.log('expired session')
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      }
    })
    // .catch(err => console.log(err))
    .catch(function(err) {
      console.log('error', err)
      if (err.response.status === 401) {
        console.log('expired session')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.go('/login')
      } else {
        // Handle else
      }
    })
}

onBeforeMount(() => {
  
  console.log(_leftUpperJaw, _rightLowerJaw, _leftLowerJaw, _rightUpperJaw)
  console.log(leftUpperJaw, rightLowerJaw, leftLowerJaw, rightUpperJaw)
  console.log('new treatments up', activeTreatment.value)
  // if (age.value < 13) {
  //   isInfant.value = true;
  //   displayedLeftUpperJaw.value = infantLeftUpperJaw;
  //   displayedrRightUpperJaw.value = infantRightUpperJaw;
  //   displayedLeftLowerJaw.value = infantLeftLowerJaw;
  //   displayedRightLowerJaw.value = infantRightLowerJaw;
  // } else {
  isInfant.value = false
  displayedLeftUpperJaw.value = _leftUpperJaw
  displayedrRightUpperJaw.value = _rightUpperJaw
  displayedLeftLowerJaw.value = _leftLowerJaw
  displayedRightLowerJaw.value = _rightLowerJaw
  // }
})

onMounted(() => {
  getTreatment()
  initializeStateRefs()
  initializeMissing()
  initializeCanvases()
  initializeFurcation()
  initializeGingivalMargin()
  initializeProbingDepth()
  initializePlaque()
  initializeBleeding()
  initializeMobility()
  initializeImplant()
})

watch(activeTreatment.value, async (newActiveTreatment, oldActiveTreatment) => {
  console.log('NewActiveTreatment', newActiveTreatment);
  tooth_treatments.value = newActiveTreatment
  componentKey.value++
  nextTick(()=>{
    initializeCanvases()
  })
  // initializeCanvases()
})
</script>

<style scoped>
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

canvas {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  aspect-ratio: attr(width) / attr(height);
}

.partial-circle {
  position: relative;
  height: 8px;
  width: 16px;
  overflow: hidden;
}

.partial-circle:before {
  content: '';
  top: 5px;
  bottom: 8px;
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  bottom: 0;
  background: #d08707;
}
</style>
