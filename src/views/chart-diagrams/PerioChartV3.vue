<template>
    <!-- Body -->
    <div id="PrintPerio" class="w-full flex flex-col h-full" :class="[ router.currentRoute.value.name === 'Treatments' ? '': '!pointer-events-none']">
      <div class="ml-2 h-1/2 flex flex-none relative">
        <div
          class="w-[110px] px-0.5 py-1.5 space-y-0.5 flex flex-col text-black -left-[100px] text-[10px] bottom-0 -top-1">
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5"></div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.mobility_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.furcation_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.implant_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.bleeding_on_probing_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.plaque_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.gingival_margin_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.probing_depth_text') }}
          </div>
          <div class="w-full h-20 whitespace-nowrap flex items-center px-0.5 text-base font-semibold">
              {{ $t('translation.buccal_text') }}
          </div>
        </div>
        <div class="w-full  h-full flex border-l border-slate-300">
          <div
            class="border-r border-slate-300 h-full space-y-0.5 w-1/8" 
            :id="`tooth-selectable-f-${tooth.toothNumber}`" 
            v-for="tooth in quadrantOne"
            :key="tooth"
          >
            <div 
              @click="indicateMissing(tooth.toothNumber)"
              class="w-full h-4 text-xs flex justify-center items-center cursor-pointer">
              <span v-if="isAdult()">{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber }}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-4 w-full px-0.5">
                <input type="number" max="3" min="0" :id="`mobility-f-${tooth.toothNumber}`"
                  @keyup="indicateMobility($event, 'front', tooth.toothNumber)" class="w-full h-full bg-slate-200" />
              </div>
              <div v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)" class="w-full h-4 p-0.5">
                <div
                  @click="indicateFurcation(`furcation-f-${tooth.toothNumber}`, tooth.toothNumber, 'front')"
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-4 border bg-slate-200 flex items-center justify-center">

                  <div :id="`furcation-f-${tooth.toothNumber}-3`" class="bg-black h-[18px] w-[18px] rounded-full hidden">
                  </div>
                  <div :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-f-${tooth.toothNumber}-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>

                </div>
              </div>
              <div v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)" class="h-4 w-full border-b">
              </div>
              <div class="w-full h-4 flex items-center justify-center">
                <input type="checkbox" :id="`implant-f-${tooth.toothNumber}`"
                  @change="indicateImplant($event, 'front', tooth.toothNumber)" class="border bg-slate-200" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 tooth_visuals relative" 
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`" 
              :data-jaw="tooth.jaw" data-part="front"
              data-image-extension="f" 
              :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 flex flex-col-reverse" :id="`missing-b-${tooth.toothNumber}`">
              <div class="flex space-x-0.5 p-0.5" :id="`furcation-b-${tooth.toothNumber}`" v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)">
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                " class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-left-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-right-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div class="h-4 w-full border-y m-0.5" v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)">
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative hidden" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="back"
              data-image-extension="b" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-l border-slate-300">
          <div
          class="border-r border-slate-300 h-full space-y-0.5 w-1/8" 
          :id="`tooth-selectable-f-${tooth.toothNumber}`" v-for="tooth in quadrantTwo" :key="tooth">
            <div 
              @click="indicateMissing(tooth.toothNumber)"
              class="w-full h-4 text-xs flex justify-center items-center cursor-pointer">
              <span v-if="isAdult()">{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber }}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-4 w-full px-0.5">
                <input type="number" max="3" min="0" :id="`mobility-f-${tooth.toothNumber}`"
                  @keyup="indicateMobility($event, 'front', tooth.toothNumber)" class="w-full h-full bg-slate-200" />
              </div>
              <div v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)" class="w-full h-4 p-0.5">
                <div
                  @click="indicateFurcation(`furcation-f-${tooth.toothNumber}`, tooth.toothNumber, 'front')"
                  :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-4 border bg-slate-200 flex items-center justify-center">

                  <div :id="`furcation-f-${tooth.toothNumber}-3`" class="bg-black h-[18px] w-[18px] rounded-full hidden">
                  </div>
                  <div :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-f-${tooth.toothNumber}-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>

                </div>
              </div>
              <div v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)" class="h-4 w-full border-b">
              </div>
              <div class="w-full h-4 flex items-center justify-center">
                <input type="checkbox" :id="`implant-f-${tooth.toothNumber}`"
                  @change="indicateImplant($event, 'front', tooth.toothNumber)" class="w-3 h-3 border bg-slate-200" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 tooth_visuals relative" 
              :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`" 
              :data-jaw="tooth.jaw" data-part="front"
              data-image-extension="f" 
              :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 flex flex-col-reverse" :id="`missing-b-${tooth.toothNumber}`">
              <div class="flex space-x-0.5 p-0.5" :id="`furcation-b-${tooth.toothNumber}`" v-if="[18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)">
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                " class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-left-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-right-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div class="h-4 w-full border-y m-0.5" v-if="![18, 17, 16, 28, 27, 26].includes(tooth.toothNumber)">
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative hidden" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="back"
              data-image-extension="b" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-2 h-1/2 flex flex-none relative">
        <div
          class="w-[110px] px-0.5 py-1.5 space-y-0.5 flex flex-col text-black -left-[100px] text-[10px] bottom-0 -top-1">
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5"></div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.mobility_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.furcation_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.implant_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.bleeding_on_probing_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.plaque_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.gingival_margin_text') }}
          </div>
          <div class="w-full h-4 whitespace-nowrap flex items-center px-0.5">
              {{ $t('translation.probing_depth_text') }}
          </div>
          <div class="w-full h-20 whitespace-nowrap flex items-center px-0.5 text-base font-semibold">
              {{ $t('translation.buccal_text') }}
          </div>
        </div>
        <div class=" w-full h-full flex border-y border-l border-slate-300">
          <div 
          class="border-r border-slate-300 h-full space-y-0.5 w-1/8" :id="`tooth-selectable-f-${tooth.toothNumber}`" v-for="tooth in quadrantFour" :key="tooth">
            <div 
              @click="indicateMissing(tooth.toothNumber)"
              class="w-full h-4 text-xs flex justify-center items-center cursor-pointer">
              <span v-if="isAdult()">{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber }}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-4 w-full px-0.5">
                <input type="number" max="3" min="0" :id="`mobility-f-${tooth.toothNumber}`"
                  @keyup="indicateMobility($event, 'front', tooth.toothNumber)" class="w-full h-full bg-slate-200" />
              </div>
              <div v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)" class="w-full h-4 p-0.5">
                <div @click="
                  indicateFurcation(
                    `furcation-f-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'front'
                  )
                " :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-f-${tooth.toothNumber}-3`" class="bg-black h-[18px] w-[18px] rounded-full hidden">
                  </div>
                  <div :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-f-${tooth.toothNumber}-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)" class="h-4 w-full border-b">
              </div>
              <div class="w-full h-4 flex items-center justify-center">
                <input type="checkbox" :id="`implant-f-${tooth.toothNumber}`"
                  @change="indicateImplant($event, 'front', tooth.toothNumber)" class="w-3 h-3 border bg-slate-200" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 tooth_visuals relative" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="front"
              data-image-extension="f" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
            <div class="w-full h-auto p-0 flex flex-col-reverse flex-grow-0 space-y-0.5" :id="`missing-b-${tooth.toothNumber}`">
              <div class="flex space-x-0.5 p-0.5" v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)">
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-left-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-right-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div class="h-4 w-full border-y m-0.5" v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)">
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative hidden" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="back"
              data-image-extension="b" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex border-y border-l border-slate-300">
          <div 
          class="border-r border-slate-300 h-full space-y-0.5 w-1/8" :id="`tooth-selectable-f-${tooth.toothNumber}`" v-for="tooth in quadrantThree" :key="tooth">
            <div 
              @click="indicateMissing(tooth.toothNumber)"
              class="w-full h-4 text-xs flex justify-center items-center cursor-pointer">
              <span v-if="isAdult()">{{ tooth.toothNumber }}</span>
              <span v-else>{{ tooth.infantToothNumber }}</span>
            </div>
            <div class="w-full h-auto p-0 space-y-0.5 block" :id="`missing-f-${tooth.toothNumber}`">
              <div class="h-4 w-full px-0.5">
                <input type="number" max="3" min="0" :id="`mobility-f-${tooth.toothNumber}`"
                  @keyup="indicateMobility($event, 'front', tooth.toothNumber)" class="w-full h-full bg-slate-200" />
              </div>
              <div v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)" class="w-full h-4 p-0.5">
                <div @click="
                  indicateFurcation(
                    `furcation-f-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'front'
                  )
                " :id="`furcation-f-${tooth.toothNumber}`"
                  class="w-full h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-f-${tooth.toothNumber}-3`" class="bg-black h-[18px] w-[18px] rounded-full hidden">
                  </div>
                  <div :id="`furcation-f-${tooth.toothNumber}-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-f-${tooth.toothNumber}-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)" class="h-4 w-full border-b">
              </div>
              <div class="w-full h-4 flex items-center justify-center">
                <input type="checkbox" :id="`implant-f-${tooth.toothNumber}`"
                  @change="indicateImplant($event, 'front', tooth.toothNumber)" class="w-3 h-3 border bg-slate-200" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'left',
                      `bleeding-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'center',
                      `bleeding-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-f-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'front',
                      'right',
                      `bleeding-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'left',
                      `plaque-f-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'center',
                      `plaque-f-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-f-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'front',
                      'right',
                      `plaque-f-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-f-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-f-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'front',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerFront-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 tooth_visuals relative" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerFront-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="front"
              data-image-extension="f" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
            <div class="w-full h-auto p-0 flex flex-col-reverse flex-grow-0 space-y-0.5" :id="`missing-b-${tooth.toothNumber}`">
              <div class="flex space-x-0.5 p-0.5" v-if="[48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)">
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'left'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-left-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-left-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-left-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
                <div @click="
                  indicateBackFurcation(
                    `furcation-b-${tooth.toothNumber}`,
                    tooth.toothNumber,
                    'back',
                    'right'
                  )
                " :id="`furcation-b-${tooth.toothNumber}`" class="w-1/2 h-4 border bg-slate-200 flex items-center justify-center">
                  <div :id="`furcation-b-${tooth.toothNumber}-right-3`"
                    class="bg-black h-[18px] w-[18px] rounded-full hidden"></div>
                  <div :id="`furcation-b-${tooth.toothNumber}-right-1`"
                    class="bg-transparent h-[18px] w-[18px] rounded-full border-2 border-black hidden"></div>
                  <svg :id="`furcation-b-${tooth.toothNumber}-right-2`" class="hidden" height="18" width="18">
                    <circle cx="2" cy="9" r="9" stroke="green" stroke-width="2%" />
                  </svg>
                </div>
              </div>
              <div class="h-4 w-full border-y m-0.5" v-if="![48, 47, 46, 38, 37, 36].includes(tooth.toothNumber)">
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-left-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'left',
                      `bleeding-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-center-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'center',
                      `bleeding-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-rose-600 cursor-pointer"
                  :id="`bleeding-b-right-${tooth.toothNumber}`" @click="
                    indicateBleeding(
                      'back',
                      'right',
                      `bleeding-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-left-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'left',
                      `plaque-b-left-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-center-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'center',
                      `plaque-b-center-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
                <div class="w-1/3 h-full border bg-slate-200 hover:bg-blue-600 cursor-pointer"
                  :id="`plaque-b-right-${tooth.toothNumber}`" @click="
                    indicatePlaque(
                      'back',
                      'right',
                      `plaque-b-right-${tooth.toothNumber}`,
                      tooth.toothNumber
                    )
                  "></div>
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`gingival-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`gingival-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateGingivalMargin(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
              <div class="w-full h-4 px-0.5 space-x-0.5 flex">
                <input type="number" placeholder="0" :id="`probing-input-b-left-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'left',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-center-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'center',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
                <input type="number" placeholder="0" :id="`probing-input-b-right-${tooth.toothNumber}`" @keyup="
                  indicateProbingDepth(
                    $event,
                    'back',
                    'right',
                    tooth.toothNumber,
                    `canvasContainerBack-${tooth.toothNumber}`
                  )
                " class="w-1/3 h-full border" />
              </div>
            </div>
            <div class="w-full h-auto flex flex-shrink-0 -p-0.5 tooth_visuals relative hidden" :data-tooth-number="tooth.toothNumber"
              :id="`canvasContainerBack-${tooth.toothNumber}`" :data-jaw="tooth.jaw" data-part="back"
              data-image-extension="b" :data-tooth-image="tooth.toothImage">
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Body -->
</template>

<script setup>
import { ref, onMounted, watch, inject, computed } from "vue";

import { useStore } from "vuex";
import customAxios from "../../axios";
import { PrinterIcon, CogIcon } from "@heroicons/vue/outline";
import useConstants from "./composables/charting/constants";
import images from "./assets/data/images.json";
import implantImages from "./assets/data/implants.json";
import missingTeeth from "./assets/data/missing.json";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

import useVektisMap from "./composables/charting/vektis-map";
import {useTeeth} from "./composables/useTeeth.js";
import {quadrantOne, quadrantTwo, quadrantThree, quadrantFour } from "./composables/dictionaries/teeth.js";
import { useRouter } from 'vue-router';
import moment from "moment";

const router = useRouter();



const { initializeVektisMap } = useVektisMap();

const {
  leftLowerJaw,
  leftUpperJaw,
  rightLowerJaw,
  rightUpperJaw,
  _leftLowerJaw,
  _leftUpperJaw,
  _rightLowerJaw,
  _rightUpperJaw,
  dimensions,
  toothNumbers,
  upperJaw,
  lowerJaw,
  _upperJaw,
  _lowerJaw,
  infantLeftLowerJaw,
	infantLeftUpperJaw,
	infantRightLowerJaw,
	infantRightUpperJaw,
  allTeeth,
  excludeFromFurcation,
  age,
} = useConstants();

const quadrants = ref([
  { id: 'quadrant-1', name: 'Quadrant 1', array: ['11', '12', '13', '14', '15', '16', '17', '18']},
  { id: 'quadrant-2', name: 'Quadrant 2', array: ['21', '22', '23', '24', '25', '26', '27', '28']},
  { id: 'quadrant-3', name: 'Quadrant 3', array: ['31', '32', '33', '34', '35', '36', '37', '38']},
  { id: 'quadrant-4', name: 'Quadrant 4', array: ['41', '42', '43', '44', '45', '46', '47', '48']},
])

const {isAdult} = useTeeth()

const plaque = ref({});
const bleeding = ref({});
const mobility = ref({});
const implant = ref({});
const missing = (age.value < 18) ? ref(['18', '17', '16', '28', '27', '26', '38', '37', '36', '48', '47', '46']) : ref([]);
const swal = inject("$swal");
const store = useStore();
const activeTreatment = computed(() => store.state.treatments.activeTreatment);
const activePatient = computed(() => store.state.treatments.activePatient);

const treatmentBlob = inject('blobFromMainContainer');
const saveDoneTreatment = inject('saveDoneTreatment');
const activeSequence = inject('activeSequence');

const furcationCounts = ref({});
const gingivalMarginLevels = ref({});
const probingDepthLevels = ref({});

// const setConfiguration = () => {
//   let teeth = [];
//   activeQuadrantArrangements
//     .value?.arrangement?.forEach((q) => quadrants.value.find((el) => el.id === q).array.forEach((tooth) => teeth.push(tooth)))
//   return teeth;
// }

const activeCommand = inject("activeCommand");

const activeVoiceSelectedTooth = ref('');

const activeVoiceSelectedFace = ref("front");

const activeVoiceSelectedSide = ref("left");

const confirmationToast = swal?.mixin({
  title: "Are you sure?",
});

const Toast = swal?.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});

watch(activeCommand, (command) => {
  if (toothNumbers.map(String).includes(command.toLowerCase())) {
    let selectedTooth = document.getElementById(`tooth-selectable-${(activeVoiceSelectedFace.value === "front" ? 'f' : 'b')}-${command}`);
    selectedTooth.classList.toggle("border-orange-500");
    selectedTooth.classList.toggle("border-slate-300");
    selectedTooth.classList.toggle("border");
    activeVoiceSelectedTooth.value = command;
    console.log(selectedTooth);
  };
  if (["front", "back"].includes(command.toLowerCase())) activeVoiceSelectedFace.value = command;   
  if (["buck", "book"].includes(command.toLowerCase())) activeVoiceSelectedFace.value = 'back';   
  if (["left", "right", "center"].includes(command.toLowerCase())) activeVoiceSelectedSide.value = command;   
  if (["pluck", "plaque", "plack", "plunk", "blank", "suck", "look", "Glock", "black"]
    .includes(command.toLowerCase()))
  {
    indicatePlaque(
      activeVoiceSelectedFace.value,
      activeVoiceSelectedSide.value,
      `plaque-${(activeVoiceSelectedFace.value === "front" ? 'f' : 'b')}-${activeVoiceSelectedSide.value.toLowerCase()}-${activeVoiceSelectedTooth.value}`,
      activeVoiceSelectedTooth.value
    )
    // console.log(`plaque-${(activeVoiceSelectedFace.value === "front" ? 'f' : 'b')}-${activeVoiceSelectedSide.value.toLowerCase()}-${activeVoiceSelectedTooth.value}`)
  }
  if (["missing"]
    .includes(command.toLowerCase()))
  {
    indicateMissing(activeVoiceSelectedTooth.value)
  }
  if (["replace", "restore", "restoration"]
    .includes(command.toLowerCase()))
  {
    indicateMissing(activeVoiceSelectedTooth.value)
  }
  if (["implant", "plant", "blend", "implants", "plunk"]
    .includes(command.toLowerCase()))
  {
    indicateImplant(
      { event: { target: { checked: true} }},
      activeVoiceSelectedFace.value,
      activeVoiceSelectedTooth.value
    )
  }
})

watch(activeVoiceSelectedTooth, (newTooth, oldTooth) => {
  let selectedTooth = document.getElementById(`tooth-selectable-${oldTooth}`);
    selectedTooth?.classList.toggle("border-orange-500");
    selectedTooth?.classList.toggle("border-slate-300");
    selectedTooth?.classList.toggle("border");
})

const indicatePlaque = (face, side, id, toothNumber) => {
  const plaquedArea = document.getElementById(id);
  plaquedArea.classList.toggle("bg-blue-600");
  plaquedArea.classList.toggle("bg-slate-200");
  const obj = { [toothNumber]: { plaque: { [face]: { [side]: true } } } };

  if (typeof plaque.value[toothNumber] !== "undefined") {
    if (typeof plaque.value[toothNumber]["plaque"][face] !== "undefined") {
      if (
        typeof plaque.value[toothNumber]["plaque"][face][side] !== "undefined"
      ) {
        delete plaque.value[toothNumber]["plaque"][face][side];
        if (
          Object.keys(plaque.value[toothNumber]["plaque"][face]).length === 0
        ) {
          delete plaque.value[toothNumber];
        }
      } else {
        Object.assign(plaque.value[toothNumber]["plaque"][face], {
          [side]: true,
        });
      }
    } else {
      Object.assign(plaque.value[toothNumber]["plaque"], {
        [face]: { [side]: true },
      });
    }
  } else {
    Object.assign(plaque.value, obj);
  }
  console.log(plaque.value);
};

const indicateBleeding = (face, side, id, toothNumber) => {
  const bleedingArea = document.getElementById(id);
  bleedingArea.classList.toggle("bg-rose-600");
  bleedingArea.classList.toggle("bg-slate-200");
  const obj = { [toothNumber]: { bleeding: { [face]: { [side]: true } } } };
  const hasBleeding = bleeding.value?.[toothNumber]?.["bleeding"];
  const hasBleedingOnFace = bleeding.value?.[toothNumber]?.["bleeding"]?.[face];
  const hasBleedingOnFaceSide = bleeding.value?.[toothNumber]?.["bleeding"]?.[face]?.[side];

  if (typeof hasBleeding === "undefined") Object.assign(bleeding.value, obj);

  if (typeof hasBleedingOnFace === "undefined")
    Object.assign(bleeding.value[toothNumber]["bleeding"], {
      [face]: { [side]: true },
    });

  if (typeof hasBleedingOnFaceSide === "undefined")
    Object.assign(bleeding.value[toothNumber]["bleeding"][face], {
      [side]: true,
    });
  else delete bleeding.value[toothNumber]["bleeding"][face][side];

  console.log(bleeding.value);
};

const indicateGingivalMargin = (event, face, side, toothNumber, canvasId) => {
  // console.log(face, side, toothNumber, canvasId);
  const obj = {
    [toothNumber]: {
      gingivalMargin: { [face]: { [side]: event.target.value } },
    },
  };
  const hasTooth = gingivalMarginLevels.value[toothNumber];

  if (typeof hasTooth !== "undefined") {
    const hasGingivalMargin = hasTooth["gingivalMargin"];

    if (typeof hasGingivalMargin !== "undefined") {
      const hasFace = hasGingivalMargin[face];

      if (typeof hasFace !== "undefined") {
        Object.assign(hasFace, { [side]: event.target.value });
      } else {
        Object.assign(hasGingivalMargin, {
          [face]: { [side]: event.target.value },
        });
      }
    } else {
      Object.assign(hasTooth, {
        gingivalMargin: { [face]: { [side]: event.target.value } },
      });
    }
  } else {
    Object.assign(gingivalMarginLevels.value, obj);
  }

  reRenderChart(toothNumber, canvasId, face);

  if (face === 'front') {
    if (side === 'left') {
      document.getElementById(`gingival-input-f-center-${toothNumber}`).focus();
    }
    if (side === 'center') {
      document.getElementById(`gingival-input-f-right-${toothNumber}`).focus();
    }
    if (side === 'right') {
      document.getElementById(`gingival-input-b-left-${toothNumber}`).focus();
    }
  }
  if (face === 'back') {
    if (side === 'left') {
      document.getElementById(`gingival-input-b-center-${toothNumber}`).focus();
    }
    if (side === 'center') {
      document.getElementById(`gingival-input-b-right-${toothNumber}`).focus();
    }
    if (side === 'right') {
      let nextTooth = '11'; 
      // console.log(activeSequence.value, toothNumber.toString(), activeSequence.value.includes(toothNumber.toString()))
      if (activeSequence.value.includes(toothNumber.toString())) {
        const lengthOfConfiguration = activeSequence.value.length;
        treatmentBlob.value.missing.forEach((missingTooth) => {
          let indexOfMissingTooth = activeSequence.value.indexOf(missingTooth);
          if(indexOfMissingTooth !== -1) activeSequence.value.splice(indexOfMissingTooth, 1);
        })
        let indexOfCurrentTooth = activeSequence.value.indexOf(toothNumber.toString()); console.log(indexOfCurrentTooth)
        if (
          indexOfCurrentTooth !== -1
          && indexOfCurrentTooth !== (lengthOfConfiguration - 1))
        {
          nextTooth = activeSequence.value[indexOfCurrentTooth + 1];
          console.log(nextTooth, activeSequence.value)
          document.getElementById(`gingival-input-f-left-${nextTooth}`).focus();
        }
      }
    }
  }
};

const indicateProbingDepth = (event, face, side, toothNumber, canvasId) => {
  // console.log(face, side, toothNumber, canvasId);
  const obj = {
    [toothNumber]: {
      probingDepth: { [face]: { [side]: event.target.value } },
    },
  };
  const hasTooth = probingDepthLevels.value[toothNumber];

  if (typeof hasTooth !== "undefined") {
    const hasProbingDepth = hasTooth["probingDepth"];

    if (typeof hasProbingDepth !== "undefined") {
      const hasFace = hasProbingDepth[face];

      if (typeof hasFace !== "undefined") {
        Object.assign(hasFace, { [side]: event.target.value });
      } else {
        Object.assign(hasProbingDepth, {
          [face]: { [side]: event.target.value },
        });
      }
    } else {
      Object.assign(hasTooth, {
        probingDepth: { [face]: { [side]: event.target.value } },
      });
    }
  } else {
    Object.assign(probingDepthLevels.value, obj);
  }

  reRenderChart(toothNumber, canvasId, face);

  if (face === 'front') {
    if (side === 'left') {
      document.getElementById(`probing-input-f-center-${toothNumber}`).focus();
    }
    if (side === 'center') {
      document.getElementById(`probing-input-f-right-${toothNumber}`).focus();
    }
    if (side === 'right') {
      document.getElementById(`probing-input-b-left-${toothNumber}`).focus();
    }
  }
  if (face === 'back') {
    if (side === 'left') {
      document.getElementById(`probing-input-b-center-${toothNumber}`).focus();
    }
    if (side === 'center') {
      document.getElementById(`probing-input-b-right-${toothNumber}`).focus();
    }
    if (side === 'right') {
      let nextTooth = '11'; 
      // console.log(activeSequence.value, toothNumber.toString(), activeSequence.value.includes(toothNumber.toString()))
      if (activeSequence.value.includes(toothNumber.toString())) {
        const lengthOfConfiguration = activeSequence.value.length;
        treatmentBlob.value.missing.forEach((missingTooth) => {
          let indexOfMissingTooth = activeSequence.value.indexOf(missingTooth);
          if(indexOfMissingTooth !== -1) activeSequence.value.splice(indexOfMissingTooth, 1);
        })
        let indexOfCurrentTooth = activeSequence.value.indexOf(toothNumber.toString()); console.log(indexOfCurrentTooth)
        if (
          indexOfCurrentTooth !== -1
          && indexOfCurrentTooth !== (lengthOfConfiguration - 1))
        {
          nextTooth = activeSequence.value[indexOfCurrentTooth + 1];
          console.log(nextTooth)
          document.getElementById(`probing-input-f-left-${nextTooth}`).focus();
        }
      }
    }
  }
};

const indicateFurcation = (slug, toothNumber, face) => {
  let obj = { [toothNumber]: { [face]: { count: 1 } } };
  let hasFurcation = furcationCounts.value?.[toothNumber];
  let hasFurcationOnFace = furcationCounts.value?.[toothNumber]?.[face];
  let currentFurcationValue =
    furcationCounts.value?.[toothNumber]?.[face]?.["count"];

  const furctionAreaOne = document.getElementById(`${slug}-1`);
  const furctionAreaTwo = document.getElementById(`${slug}-2`);
  const furctionAreaThree = document.getElementById(`${slug}-3`);

  if (furctionAreaOne.classList.contains("block"))
    furctionAreaOne.classList.replace("block", "hidden");

  if (furctionAreaTwo.classList.contains("block"))
    furctionAreaTwo.classList.replace("block", "hidden");

  if (furctionAreaThree.classList.contains("block"))
    furctionAreaThree.classList.replace("block", "hidden");

  if (typeof hasFurcation === "undefined") {
    Object.assign(furcationCounts.value, {
      [toothNumber]: { [face]: { count: 1 } },
    });
    furctionAreaOne.classList.replace("hidden", "block");
  }

  if (typeof hasFurcationOnFace !== "undefined") {
    if (currentFurcationValue <= 2) {
      currentFurcationValue = currentFurcationValue + 1;
      const furcationArea = document.getElementById(
        `${slug}-${currentFurcationValue}`
      );
      // console.log(currentFurcationValue);
      furcationArea.classList.replace("hidden", "block");
      Object.assign(furcationCounts.value[toothNumber], {
        [face]: { count: currentFurcationValue },
      });
    } else if (currentFurcationValue === 3) {
      furctionAreaThree.classList.replace("block", "hidden");
      delete furcationCounts.value[toothNumber][face];
    }
  } else {
    Object.assign(furcationCounts.value[toothNumber], {
      [face]: { count: 1 },
    });
  }
  const canvasId = (face === "front") ? `canvasContainerFront-${toothNumber}` : `canvasContainerBack-${toothNumber}`;
  reRenderChart(toothNumber, canvasId, face);
  // console.log(furcationCounts.value);
};

const indicateBackFurcation = (slug, toothNumber, face, side) => {
  let obj = { [toothNumber]: { [face]: { [side]: { count: 1 } } } };
  let hasFurcation = furcationCounts.value?.[toothNumber];
  let hasFurcationOnFace = furcationCounts.value?.[toothNumber]?.[face];
  let hasFurcationOnFaceSide = furcationCounts.value?.[toothNumber]?.[face]?.[side];
  let currentFurcationValue = furcationCounts.value?.[toothNumber]?.[face]?.[side]?.["count"];

  const furctionAreaOne = document.getElementById(`${slug}-${side}-1`);
  const furctionAreaTwo = document.getElementById(`${slug}-${side}-2`);
  const furctionAreaThree = document.getElementById(`${slug}-${side}-3`);

  if (furctionAreaOne.classList.contains("block"))
    furctionAreaOne.classList.replace("block", "hidden");

  if (furctionAreaTwo.classList.contains("block"))
    furctionAreaTwo.classList.replace("block", "hidden");

  if (furctionAreaThree.classList.contains("block"))
    furctionAreaThree.classList.replace("block", "hidden");

  // if (typeof hasFurcationOnFace !== "undefined") {
  // 	Object.assign(furcationCounts.value[toothNumber][face], { [side]: { count: 1 }});
  // 	furctionAreaOne.classList.replace("hidden", "block");
  // 	console.log(currentFurcationValue, "mouse");
  // }

  if (typeof hasFurcationOnFaceSide !== "undefined") {
    if (currentFurcationValue <= 2) {
      currentFurcationValue = currentFurcationValue + 1;
      const furcationArea = document.getElementById(`${slug}-${side}-${currentFurcationValue}`);
      // console.log(currentFurcationValue, "dog");
      furcationArea.classList.replace("hidden", "block");
      Object.assign(furcationCounts.value[toothNumber][face][side], { count: currentFurcationValue });

    } else if (currentFurcationValue === 3) {
      furctionAreaThree.classList.replace("block", "hidden");
      delete furcationCounts.value[toothNumber][face][side];
    }
  } else if (typeof hasFurcationOnFace !== "undefined") {
    Object.assign(furcationCounts.value[toothNumber][face], { [side]: { count: 1 } });
    furctionAreaOne.classList.replace("hidden", "block");
    // console.log(currentFurcationValue, "cat");

  } else {
    Object.assign(furcationCounts.value, obj);
    furctionAreaOne.classList.replace("hidden", "block");
    // console.log(currentFurcationValue, "cow");
  }
  // console.log(furcationCounts.value);
  reRenderChart(toothNumber, `canvasContainerBack-${toothNumber}`, "back");
}

const indicateMobility = (event, face, toothNumber) => {
  const mobilityValue = event.target.value;
  const mobilityInput = document.getElementById(event.target.id);
  Object.assign(mobility.value, { [toothNumber]: { [face]: mobilityValue } });
  console.log(typeof mobilityValue, event)
  if (mobilityValue === "") delete mobility.value[toothNumber];
  if (mobilityValue > 3 || mobilityValue < 0) {
    // alert("Mobility value out of range");
    Toast.fire({
      icon: "error",
      title: "Mobility value out of range.",
    });
    mobilityInput.value = 0;
  }
};

const indicateImplant = (event, face, toothNumber) => {
  const implantValue = (typeof event?.target?.checked !== "undefined") ? event.target.checked : true;
  Object.assign(implant.value, { [toothNumber]: { front: implantValue, back: implantValue }, });
  const frontFurcationControlContainer = document.getElementById(`furcation-f-${toothNumber}`);
  const backFurcationControlContainer = document.getElementById(`furcation-b-${toothNumber}`);
  if (!implantValue) {
    if(!excludeFromFurcation.includes(toothNumber.toString())) frontFurcationControlContainer.classList.toggle("invisible");
    if(!excludeFromFurcation.includes(toothNumber.toString())) backFurcationControlContainer.classList.toggle("invisible");
    // console.log(excludeFromFurcation.includes(toothNumber), typeof toothNumber) 
    delete implant.value[toothNumber];
  }
  // console.log(face, implant.value);
  reRenderChart(toothNumber, `canvasContainerFront-${toothNumber}`, "front");
  reRenderChart(toothNumber, `canvasContainerBack-${toothNumber}`, "back");
};

const indicateMissing = (toothNumber) => {
  if(missing.value.includes(toothNumber.toString())) {
    const indexOfTooth = missing.value.indexOf(toothNumber.toString());
    missing.value.splice(indexOfTooth, 1);
  } else {
    missing.value.push(toothNumber.toString());
  }
  console.log(missing.value, toothNumber);
  reRenderChart(toothNumber, `canvasContainerFront-${toothNumber}`, "front");
  reRenderChart(toothNumber, `canvasContainerBack-${toothNumber}`, "back");
}

const reRenderChart = (_toothNumber, canvasId, face) => {
  const canvasContainer = document.getElementById(canvasId);
  let toothImage = canvasContainer.getAttribute("data-tooth-image");
  let imageExtension = canvasContainer.getAttribute("data-image-extension");
  let canvas = canvasContainer.childNodes[0];
  let ctx = canvas.getContext("2d");
  const toothNumber = _toothNumber.toString();
  const controlContainer = document.getElementById(`missing-${imageExtension}-${toothNumber}`);
  const furcationControlContainer = document.getElementById(`furcation-${imageExtension}-${toothNumber}`);

  const hasImplant = implant.value?.[toothNumber];
  const isMissing = missing.value.includes(toothNumber);

  const furcationPostions = {
    18: { front: { x: 130, y: 250 }, back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } } },
    17: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } } },
    16: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } } },
    15: { front: { x: 130, y: 250 }, back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } } },
    28: { front: { x: 130, y: 250 }, back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } } },
    27: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } } },
    26: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } } },
    25: { front: { x: 130, y: 250 }, back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } } },
    38: { front: { x: 130, y: 250 }, back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } } },
    37: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } } },
    36: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } } },
    35: { front: { x: 130, y: 250 }, back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } } },
    48: { front: { x: 130, y: 250 }, back: { left: { x: 70, y: 250 }, right: { x: 200, y: 250 } } },
    47: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 220, y: 250 } } },
    46: { front: { x: 130, y: 250 }, back: { left: { x: 80, y: 250 }, right: { x: 240, y: 250 } } },
    45: { front: { x: 130, y: 250 }, back: { left: { x: 75, y: 250 }, right: { x: 190, y: 250 } } },
  };

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let image = new Image();
  image.onload = () => ctx.drawImage(image, 60, 30);

  // if (typeof hasImplant !== "undefined" && !isMissing) {
  //   furcationControlContainer?.classList?.toggle("invisible");
  //   image.src = implantImages[toothImage][face];
  // }
  if (isMissing) {
    image.src = missingTeeth[toothImage]['top'];
    if (!controlContainer.classList.contains("invisible")) controlContainer.classList.add("invisible"); 
  }
  else {
    if (controlContainer.classList.contains("invisible")) controlContainer.classList.remove("invisible"); 
    image.src = initializeVektisMap(ctx, toothNumber);
  }
};

const initializeStateRefs = () => {
  const derivedTreatmentBlobLength = Object.keys(treatmentBlob.value).length;
  if (derivedTreatmentBlobLength !== 0) {
    const treatment = treatmentBlob.value; // JSON.parse(activeTreatment.value.tooth_sections); // console.log(treatment);

    toothNumbers.forEach((tooth) => {

      const hasFurcation = treatment?.[tooth]?.["periodontal"]?.["furcation"];
      const hasGingivalMargin = treatment[tooth]?.["periodontal"]?.["gingivalMargin"];
      const hasProbingDepth = treatment[tooth]?.["periodontal"]?.["probingDepth"];
      const hasPlaque = treatment[tooth]?.["periodontal"]?.["plaque"];
      const hasBleeding = treatment[tooth]?.["periodontal"]?.["bleeding"];
      const hasMobility = treatment?.[tooth]?.["periodontal"]?.["mobility"];
      const hasImplant = treatment?.[tooth]?.["periodontal"]?.["implant"];
      const hasMissing = treatment.missing;

      if (typeof hasMissing !== "undefined") missing.value = hasMissing;
      if (typeof hasImplant !== "undefined") Object.assign(implant.value, { [tooth]: hasImplant });
      if (typeof hasFurcation !== "undefined") Object.assign(furcationCounts.value, { [tooth]: hasFurcation });
      if (typeof hasGingivalMargin !== "undefined") Object.assign(gingivalMarginLevels.value, { [tooth]: { gingivalMargin: hasGingivalMargin } });
      if (typeof hasProbingDepth !== "undefined") Object.assign(probingDepthLevels.value, { [tooth]: { probingDepth: hasProbingDepth } })
      if (typeof hasPlaque !== "undefined") Object.assign(plaque.value, { [tooth]: { plaque: hasPlaque } });
      if (typeof hasBleeding !== "undefined") Object.assign(bleeding.value, { [tooth]: { bleeding: hasBleeding } });
      if (typeof hasMobility !== "undefined") Object.assign(mobility.value, { [tooth]: hasMobility });

      // console.log(probingDepthLevels.value, gingivalMarginLevels.value, implant.value, mobility.value, plaque.value, bleeding.value);

    });
  }
}

const initializeCanvases = () => {
  const elements = document.querySelectorAll(".tooth_visuals");

  elements.forEach((element) => {

    let toothNumber = element.getAttribute("data-tooth-number");
    let part = element.getAttribute("data-part");
    let canvas = element.childNodes[0];
    let ctx = canvas.getContext("2d");

    canvas.height = 280;
    canvas.width = 280; // dimensions[toothNumber]['width'];

    if (_leftUpperJaw.includes(toothNumber) && part === "front") canvas.style.transform = "scale(1, 1)";
    if (_leftUpperJaw.includes(toothNumber) && part === "top") canvas.style.transform = "scale(1, 1)";
    if (_leftUpperJaw.includes(toothNumber) && part === "back") canvas.style.transform = "scaleY(-1)";

    if (_rightUpperJaw.includes(toothNumber) && part === "front") canvas.style.transform = "scaleX(-1)";
    if (_rightUpperJaw.includes(toothNumber) && part === "top") canvas.style.transform = "scaleX(-1)";
    if (_rightUpperJaw.includes(toothNumber) && part === "back") canvas.style.transform = "scale(-1, -1)";

    if (_leftLowerJaw.includes(toothNumber) && part === "front") canvas.style.transform = "scale(1, 1)";
    if (_leftLowerJaw.includes(toothNumber) && part === "top") canvas.style.transform = "scale(1, 1)";
    if (_leftLowerJaw.includes(toothNumber) && part === "back") canvas.style.transform = "scaleY(-1)";

    if (_rightLowerJaw.includes(toothNumber) && part === "front") canvas.style.transform = "scaleX(-1)";
    if (_rightLowerJaw.includes(toothNumber) && part === "top") canvas.style.transform = "scaleX(-1)";
    if (_rightLowerJaw.includes(toothNumber) && part === "back") canvas.style.transform = "scale(-1, -1)";

    ctx.globalCompositeOperation = "destination-over";

    reRenderChart(toothNumber, `canvasContainerFront-${toothNumber}`, "front")
    reRenderChart(toothNumber, `canvasContainerBack-${toothNumber}`, "back")
  });
}

const initializeFurcation = () => {
  toothNumbers.forEach((tooth) => {
    const hasFurcationOnFrontFace = furcationCounts.value?.[tooth]?.["front"]?.["count"];
    const hasFurcationOnBackFaceLeft = furcationCounts.value?.[tooth]?.["back"]?.["left"]?.["count"];
    const hasFurcationOnBackFaceRight = furcationCounts.value?.[tooth]?.["back"]?.["right"]?.["count"];

    if (typeof hasFurcationOnFrontFace !== "undefined") {
      let inputField = document.getElementById(`furcation-f-${tooth}-${hasFurcationOnFrontFace}`);
      inputField.classList.replace("hidden", "block");
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, "front");
      // console.log(`furcation-f-${tooth}-${hasFurcationOnFrontFace['count']}`);
    }
    if (typeof hasFurcationOnBackFaceLeft !== "undefined") {
      let inputField = document.getElementById(`furcation-b-${tooth}-left-${hasFurcationOnBackFaceLeft}`);
      inputField.classList.replace("hidden", "block");
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");
    }
    if (typeof hasFurcationOnBackFaceRight !== "undefined") {
      let inputField = document.getElementById(`furcation-b-${tooth}-right-${hasFurcationOnBackFaceRight}`);
      inputField.classList.replace("hidden", "block");
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");
    }
  })
}

const initializeGingivalMargin = () => {
  toothNumbers.forEach((tooth) => {
    let hasFrontFace = gingivalMarginLevels.value?.[tooth]?.["gingivalMargin"]?.["front"];
    let hasBackFace = gingivalMarginLevels.value?.[tooth]?.["gingivalMargin"]?.["back"];
    if (typeof hasFrontFace !== "undefined") {
      const sides = Object.keys(hasFrontFace);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `gingival-input-f-${side}-${tooth}`
        );
        inputField.value = hasFrontFace[side];
      });
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, "front");
    }

    if (typeof hasBackFace !== "undefined") {
      const sides = Object.keys(hasBackFace);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `gingival-input-b-${side}-${tooth}`
        );
        inputField.value = hasBackFace[side];
      });
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");
    }
  });
}

const initializeMissing = () => {
  toothNumbers.forEach((tooth) => {
    reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");
    reRenderChart(tooth, `canvasContainerFront-${tooth}`, "front");
  });
}

const initializeProbingDepth = () => {
  toothNumbers.forEach((tooth) => {
    let hasFrontFace = probingDepthLevels.value?.[tooth]?.["probingDepth"]?.["front"];
    let hasBackFace = probingDepthLevels.value?.[tooth]?.["probingDepth"]?.["back"];
    if (typeof hasFrontFace !== "undefined") {
      const sides = Object.keys(hasFrontFace);
      sides.forEach((side) => {
        // console.log(`probing-input-f-${side}-${tooth}`);
        let inputField = document.getElementById(
          `probing-input-f-${side}-${tooth}`
        );
        inputField.value = hasFrontFace[side];
      });
      reRenderChart(tooth, `canvasContainerFront-${tooth}`, "front");
    }
    if (typeof hasBackFace !== "undefined") {
      const sides = Object.keys(hasBackFace);
      sides.forEach((side) => {
        // console.log(`probing-input-b-${side}-${tooth}`);
        let inputField = document.getElementById(
          `probing-input-b-${side}-${tooth}`
        );
        inputField.value = hasBackFace[side];
      });
      reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");
    }
  });
}

const initializePlaque = () => {
  toothNumbers.forEach((tooth) => {
    let hasPlaqueOnFront = plaque.value?.[tooth]?.["plaque"]?.["front"];
    let hasPlaqueOnBack = plaque.value?.[tooth]?.["plaque"]?.["back"];

    if (typeof hasPlaqueOnFront !== "undefined") {
      const sides = Object.keys(hasPlaqueOnFront);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `plaque-f-${side}-${tooth}`
        );
        inputField.classList.toggle("bg-slate-200");
        inputField.classList.toggle("bg-blue-600");
      });
    }
    if (typeof hasPlaqueOnBack !== "undefined") {
      const sides = Object.keys(hasPlaqueOnBack);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `plaque-b-${side}-${tooth}`
        );
        inputField.classList.toggle("bg-slate-200");
        inputField.classList.toggle("bg-blue-600");
      });
    }
  });
}

const initializeBleeding = () => {
  toothNumbers.forEach((tooth) => {

    let hasBleedingOnFront = bleeding.value?.[tooth]?.["bleeding"]?.["front"];
    let hasBleedingOnBack = bleeding.value?.[tooth]?.["bleeding"]?.["back"];

    if (typeof hasBleedingOnFront !== "undefined") {
      const sides = Object.keys(hasBleedingOnFront);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `bleeding-f-${side}-${tooth}`
        );
        inputField.classList.toggle("bg-slate-200");
        inputField.classList.toggle("bg-rose-600");
      });
    }
    if (typeof hasBleedingOnBack !== "undefined") {
      const sides = Object.keys(hasBleedingOnBack);
      sides.forEach((side) => {
        let inputField = document.getElementById(
          `bleeding-b-${side}-${tooth}`
        );
        inputField.classList.toggle("bg-slate-200");
        inputField.classList.toggle("bg-rose-600");
      });
    }
  });
}

const initializeMobility = () => {
  toothNumbers.forEach((tooth) => {
    let inputFrontField = document.getElementById(`mobility-f-${tooth}`);
    const hasMobilityOnFrontFace = mobility.value?.[tooth]?.["front"];
    if (typeof hasMobilityOnFrontFace !== "undefined") inputFrontField.value = parseInt(hasMobilityOnFrontFace);
  });
}

const initializeImplant = () => {
  toothNumbers.forEach((tooth) => {
    let inputFrontField = document.getElementById(`implant-f-${tooth}`);
    const hasImplantOnFrontFace = implant.value?.[tooth]?.["implant"]?.["front"];

    reRenderChart(tooth, `canvasContainerFront-${tooth}`, "front");
    reRenderChart(tooth, `canvasContainerBack-${tooth}`, "back");

    if (typeof hasImplantOnFrontFace !== "undefined") inputFrontField.checked = hasImplantOnFrontFace;
  });
}

const save = () => {
  const teethWithProbingDepthChange = Object.keys(probingDepthLevels.value);
  const teethWithGingivalMarginChange = Object.keys(
    gingivalMarginLevels.value
  );
  const teethWithPlaque = Object.keys(plaque.value);
  const teethWithBleeding = Object.keys(bleeding.value);
  const teethWithFurcation = Object.keys(furcationCounts.value);
  const teethWithMobility = Object.keys(mobility.value);
  const teethWithImplant = Object.keys(implant.value);
  const teethMissing = implant.value;

  teethWithProbingDepthChange.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        probingDepthLevels.value[tooth]
      );
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        probingDepthLevels.value[tooth]
      );
    }
  });
  teethWithGingivalMarginChange.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        gingivalMarginLevels.value[tooth]
      );
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        gingivalMarginLevels.value[tooth]
      );
    }
  });
  teethWithBleeding.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        bleeding.value[tooth]
      );
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        bleeding.value[tooth]
      );
    }
  });
  teethWithPlaque.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        plaque.value[tooth]
      );
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(
        treatmentBlob.value[tooth]["periodontal"],
        plaque.value[tooth]
      );
    }
  });
  teethWithFurcation.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        furcation: furcationCounts.value[tooth],
      });
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        furcation: furcationCounts.value[tooth],
      });
    }
  });
  teethWithMobility.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        mobility: mobility.value[tooth],
      });
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        mobility: mobility.value[tooth],
      });
    }
  });
  teethWithImplant.forEach((tooth) => {
    if (treatmentBlob.value[tooth].hasOwnProperty("periodontal")) {
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        implant: implant.value[tooth],
      });
    } else {
      treatmentBlob.value[tooth]["periodontal"] = {};
      Object.assign(treatmentBlob.value[tooth]["periodontal"], {
        implant: implant.value[tooth],
      });
    }
  });

  const currentMissingTeeth = treatmentBlob.value.missing;
  treatmentBlob.value.missing = [...new Set(currentMissingTeeth.concat(missing.value.map(String)))]; 

  if (typeof treatmentBlob.value?.['implant_dates'] === 'undefined') {
    Object.assign(treatmentBlob.value, { implant_dates: [ moment().format("DD-MM-YYYY") ]})  
  } else {
    const alreadyCapturedDates = treatmentBlob.value.implant_dates;
    alreadyCapturedDates.push(moment().format("DD-MM-YYYY HH:mm"));
    treatmentBlob.value.imaplant_dates = [...new Set(alreadyCapturedDates)]
  }

  saveDoneTreatment(treatmentBlob.value, 0, 0, [], []);

};

onMounted(() => {
  initializeStateRefs();
  initializeMissing();
  initializeCanvases();
  initializeFurcation();
  initializeGingivalMargin();
  initializeProbingDepth();
  initializePlaque();
  initializeBleeding();
  initializeMobility();
  initializeImplant();
});

watch(treatmentBlob, () => {
  initializeStateRefs();
  initializeMissing();
  initializeCanvases();
  initializeFurcation();
  initializeGingivalMargin();
  initializeProbingDepth();
  initializePlaque();
  initializeBleeding();
  initializeMobility();
  initializeImplant();
})

defineExpose({ save })

</script>

<style scoped>
input {
  @apply text-center text-xs;
}

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
  content: "";
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
