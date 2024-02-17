<template>
  <div>
    <div
      class="bg-white dark:bg-dark-1 flex overflow-hidden w-full h-full"
      @click="outsideDialogBox"
    >
      <div
        class="grid grid-cols-12 h-full sm:grid-cols-5 gap-2 w-full product-container"
      >
        <div
          class="appointments-list h-full overflow-hidden col-span-12 border-r border-b border-gray-200"
        >
          <div
            class="hidden w-auto gap-2 text-sm mt-2 content-center flex items-center"
          >
            <!-- length checked -->
            <div
              class="mx-auto text-slate-500"
              v-if="filteredOrders.length > 0"
            >
              {{ $t("translation.showing_text") }}
              {{ lengthFrom }}
              {{ $t("translation.to_text") }}
              3
              <!-- {{ lengthTo }} -->
              <!-- {{ $t("translation.of_text") }} -->
              {{ lengthTotal }}
              products
            </div>
            <div
              class="mx-auto text-slate-500"
              v-if="checkedOrderListMain.length > 0"
            >
              {{ $t("translation.selected_text") }}
              {{ checkedOrderListMain.length }}
              products
              <span
                @click="UncheckAllSelected"
                class="text-theme-1 hover:underline cursor-pointer"
              >
                {{ $t("translation.uncheck_all_text") }}
              </span>
            </div>
            <!-- length checked -->
          </div>

          <!-- search component  -->

          <!-- search component  -->

          <div
            class="grid grid-cols-4 w-full gap-2 text-sm mt-2 border-gray-300 bg-gray-100 dark:bg-dark-1 mx-1"
          >
            <!-- filter search -->
            <div
              class="col-span-4 flex justify-between items-center border-1 rounded-md border-gray-300 p-1 mx-1 bg-gray-100 dark:bg-dark-1"
            >
              <!-- key word -->

              <div
                class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 border-r border-gray-300 hidden 2xl:block xl:block"
                :class="displayNameFilter && 'lg:block md:block sm:block'"
              >
                <div class="w-56 relative text-slate-500">
                  <input
                    type="text"
                    class="form-control w-56 box pr-10 focus:border-theme-36 focus:ring-0"
                    :placeholder="`${$t('translation.search_by_keyword_text')}`"
                    v-model="search_term"
                    @change="emptyInput"
                    @keyup="emptyInput"
                    @focus="searchFocus"
                    id="searchID"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    icon-name="search"
                    class="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                    data-lucide="search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>

              <!-- status dropdown -->
              <div
                class="relative w-auto border-r border-gray-300 bg-gray-100 dark:bg-dark-1 mr-2 hidden 2xl:block xl:block"
                :class="displayStatusFilter && 'lg:block md:block sm:block'"
                id="statusselector"
              >
                <div class="w-56 flex items-center justify-between">
                  <input
                    type="text"
                    class="form-control w-56 box pr-10 focus:border-theme-36 focus:ring-0"
                    :placeholder="`${$t('translation.filter_by_text')}`"
                    v-model="filter_option"
                    @focus="expandStatusPanel"
                    readonly
                  />

                  <ChevronDownIcon
                    @click="isFilterOptions = !isFilterOptions"
                    class="h-5 w-5 text-gray-500 mr-2"
                  ></ChevronDownIcon>
                </div>

                <div
                  class="option-container mt-6 text-gray-800 ml-0 mt-2 shadow-lg bg-gray-100 dark:bg-dark-1 absolute w-full h-30 overflow-y-auto z-10 rounded-md scrollContent"
                  v-if="isFilterOptions"
                >
                  <div
                    class="options-list mt-0 pt-0 flex justify-between items-center cursor-pointer bg-white w-full"
                    v-for="(option, index) in filterOptions"
                    :key="index"
                  >
                    <input
                      type="text"
                      class="border-0 p-2 w-full cursor-pointer cursor-pointer bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white ml-1 hover:bg-gray-200 hover:shadow-md0"
                      :value="option.name"
                      @click="selectOption(option.value)"
                      readonly
                    />
                  </div>
                  <div
                    class="flex justify-end border-t text-base shadow-md text-gray-400 border-gray-300 bg-gray-100 dark:bg-dark-1 items-center p-2"
                  >
                    <div
                      class="w-auto flex items-center group hover:bg-slate-200 capitalize p-1 rounded-sm hover:text-gray-800 cursor-pointer bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white"
                      @click="hideFilterOptions"
                    >
                      <XIcon class="w-6 h-6" />
                      <span>{{ $t("translation.close_text") }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- date filter  -->
              <div
                class="relative w-auto hidden 2xl:block xl:block z-50 items-center"
                id="dateselector"
                :class="displayDateFilter && 'lg:block md:block sm:block'"
              >
                <div
                  class="flex w-auto justify-between items-center rounded-md"
                >
                  <div
                    class="flex border-none outline-0 group relative h-10 cursor-pointer"
                  >
                    <div class="w-38 flex items-center justify-between">
                      <input
                        type="text"
                        class="form-control w-36 box focus:border-theme-36 focus:ring-0"
                        :placeholder="`${$t('translation.select_date_text')}`"
                        v-model="filter_date"
                        @focus="showFilterDates"
                        readonly
                      />

                      <ChevronDownIcon
                        class="h-5 w-5 text-gray-500 mr-2"
                        @click="showFilterDates"
                      />
                    </div>

                    <div
                      class="flex flex-col w-full border-1 rounded-sm top-14 absolute p-0 text-sm bg-gray-100 dark:bg-dark-1"
                      v-if="isFilterDates === true"
                    >
                      <div
                        class="flex-1 overflow-y-auto scrollContent bg-gray-100 dark:bg-dark-1"
                      >
                        <div
                          class="text-slate-800 cursor-pointer bg-gray-100 dark:bg-dark-1"
                          v-for="(option, index) in filterDates"
                          :key="index"
                        >
                          <input
                            type="text"
                            class="w-full p-2 cursor-pointer hover:bg-slate-200 text-sm status bg-gray-100 dark:bg-dark-1 hover:bg-gray-200 hover:shadow-md"
                            style="
                            border: none !important;
                            background-color: !important;
                          "
                            :value="option.name"
                            @click="selectDate(option.value)"
                            readonly
                          />
                        </div>
                      </div>

                      <div
                        class="flex justify-end border-t text-base shadow-md text-gray-400 border-gray-300 bg-gray-100 dark:bg-dark-1 items-center p-2"
                      >
                        <div
                          class="w-auto flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                          @click="isFilterDates = false"
                        >
                          <XIcon class="w-6 h-6" />
                          <span>{{ $t("translation.close_text") }}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      class="w-auto flex flex-wrap justify-end items-center bg-gray-100 h-10 calender-width"
                      v-if="isCustomView"
                    >
                      <div
                        class="w-auto sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 border-r border-gray-300"
                      >
                        <div class="w-60 relative text-slate-500">
                          <Datepicker
                            v-model="date"
                            range
                            :format="format"
                            multiCalendars
                            :multiStatic="false"
                            calendarClassName=" dp-custom-calendar"
                            :placeholder="
                              `${$t('translation.date_range_text')}`
                            "
                            class="w-full"
                            :locale="lang"
                            :select-text="`${$t('translation.select_text')}`"
                            :cancel-text="`${$t('translation.cancel_text')}`"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex w-full justify-end items-center bg-gray-100 h-10 calender-width"
                      v-if="isMonthView"
                    >
                      <div class="w-40 relative text-slate-500">
                        <Datepicker
                          v-model="month"
                          monthPicker
                          calendarClassName="dp-custom-calendar"
                          :placeholder="`${$t('translation.month_range_text')}`"
                          class="w-full"
                          :locale="lang"
                          :select-text="`${$t('translation.select_text')}`"
                          :cancel-text="`${$t('translation.cancel_text')}`"
                        />
                      </div>
                    </div>
                    <div
                      class="flex w-full justify-end items-center bg-gray-100 h-10 calender-width"
                      v-if="isWeekView"
                    >
                      <div class="w-60 relative text-slate-500">
                        <Datepicker
                          v-model="date"
                          weekPicker
                          :multiStatic="false"
                          calendarClassName="dp-custom-calendar"
                          :placeholder="`${$t('translation.week_range_text')}`"
                          class="w-full"
                          :locale="lang"
                          :select-text="`${$t('translation.select_text')}`"
                          :cancel-text="`${$t('translation.cancel_text')}`"
                        />
                      </div>
                    </div>
                    <div
                      class="w-auto flex justify-end items-center bg-gray-100 h-10 calender-width"
                      v-if="isYearView"
                    >
                      <div class="w-40 relative text-slate-500">
                        <Datepicker
                          v-model="year"
                          yearPicker
                          calendarClassName="dp-custom-calendar"
                          :placeholder="`${$t('translation.year_range_text')}`"
                          class="w-full"
                          :locale="lang"
                          :select-text="`${$t('translation.select_text')}`"
                          :cancel-text="`${$t('translation.cancel_text')}`"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- date dropdown hide -->

              <!-- date filter-->

              <div
                class="w-full ml-1 relative col-span-1 flex justify-end gap-3"
                id="exportselector"
              >
                <Button
                  :label="`${$t('translation.clear_text')}`"
                  class="!text-sm !capitalize transparent"
                  icon="fa fa-refresh "
                  @click="clearall"
                ></Button>

                <Button
                  :label="`${$t('translation.export_text')}`"
                  icon="fa fa-arrow-up "
                  class="!text-sm !capitalize transparent"
                  @click="showFilterOptionsForExports"
                ></Button>
                <Button
                  id="showfilterss"
                  :label="'Filter'"
                  icon="fa fa-solid fa-filter "
                  @click="showFilterList"
                  class="2xl:invisible xl:invisible !text-sm !capitalize !w-auto"
                ></Button>

                <!-- export buttons -->
                <div
                  class="max-h-44 flex justify-end flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                  v-if="isFilterOptionsForExports"
                >
                  <div
                    class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                    style="margin-top: 13px"
                  >
                    <div class="items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.print_text')}`"
                        @click="printData()"
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                      ></Button>
                    </div>
                    <div class="border-t border-gray-300 items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.pdf_text')}`"
                        @click="printObject('pdf', 'Orders')"
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                      ></Button>
                    </div>
                    <div class="border-t border-gray-300 items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.excel_text')}`"
                        @click="
                          printObject(
                            'xlsx',
                            'Orders',
                            '/orders/download-excel'
                          )
                        "
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                      ></Button>
                    </div>
                    <div class="border-t border-gray-300 items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.csv_text')}`"
                        @click="
                          printObject('csv', 'Orders', '/orders/download-csv')
                        "
                        class="border-t bold border-0 cursor-pointer w-full hover:bg-gray-100 h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                      ></Button>
                    </div>
                  </div>

                  <div
                    class="flex justify-end bg-white text-base shadow-md text-gray-400 border-t border-gray-300 items-center p-2 w-32"
                  >
                    <div
                      class="flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                      @click="hideFilterOptionsForExports"
                    >
                      <XIcon class="w-6 h-6" />
                      <span class="text-center">{{
                        $t("translation.close_text")
                      }}</span>
                    </div>
                  </div>
                </div>
                <!-- export loader -->
                <div
                  class="max-h-44 flex flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                  v-if="isExporting"
                >
                  <div
                    class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                    style="margin-top: 13px"
                  >
                    <div
                      class="flex h-auto gap-2 w-full text-sm text-gray-800 justify-center items-center p-2"
                    >
                      <svg
                        class="animate-spin h-6 w-6 text-yellow-650"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#FF782E"
                          stroke-width="4"
                        />
                        <path
                          class="opacity-1"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <p>{{ $t("translation.exporting_text") }}..</p>
                    </div>
                  </div>
                </div>

                <!-- filter buttons -->
                <div
                  class="max-h-44 flex justify-end flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                  v-if="isFilterList"
                >
                  <div
                    class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                    style="margin-top: 13px"
                  >
                    <div class="items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.status_text')}`"
                        @click="showStatusFilter"
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                      ></Button>
                    </div>
                    <div class="border-t border-gray-300 items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.name_text')}`"
                        @click="showNameFilter"
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                      ></Button>
                    </div>
                    <div class="border-t border-gray-300 items-center p-1 w-32">
                      <Button
                        :label="`${$t('translation.date_text')}`"
                        @click="showDateFilter"
                        class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                      ></Button>
                    </div>
                  </div>

                  <div
                    class="flex justify-end bg-white text-base shadow-md text-gray-400 border-t border-gray-300 items-center p-2 w-32"
                  >
                    <div
                      class="flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                      @click="isFilterList = false"
                    >
                      <XIcon class="w-6 h-6" />
                      <span class="text-center">{{
                        $t("translation.close_text")
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- exports filter -->
          </div>

          <Table
            :orders="filteredOrders"
            :isLoading="isLoading"
            @clearFilter="clearFilters"
            :isPending="isPending"
            :isTarget="isTarget"
            :filterOption="filter_option"
            :isUnchenkallstatus="isUnchenkallstatus"
            @refreshOrders="fetchMoreData"
            @checkedOrderList="checkedOrderList"
          />
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-center"></div>

    <div
      class="intro-y mt-3 flex flex-wrap items-center sm:flex-row sm:flex-nowrap mb-20"
    >
      <nav class="w-full sm:mr-auto sm:w-auto">
        <ul class="flex w-full mr-0 sm:mr-auto sm:w-auto">
          <li class="flex-1 sm:flex-initial">
            <a
              @click.prevent="previouspreviousPage"
              class="transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-lucide="chevrons-left"
                class="lucide lucide-chevrons-left stroke-1.5 h-4 w-4"
              >
                <path d="m11 17-5-5 5-5"></path>
                <path d="m18 17-5-5 5-5"></path></svg
            ></a>
          </li>
          <li class="flex-1 sm:flex-initial">
            <a
              @click.prevent="previousPage"
              class="hover:text-theme-1 transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-lucide="chevron-left"
                class="lucide lucide-chevron-left stroke-1.5 h-4 w-4"
              >
                <path d="m15 18-6-6 6-6"></path></svg
            ></a>
          </li>
          <li class="flex-1 sm:flex-initial">
            <a
              class="transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              >...</a
            >
          </li>
          <li class="flex-1 sm:flex-initial">
            <a
              class="bg-theme-1 px-3 py-2 text-white transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              >{{ currentPage }}</a
            >
          </li>

          <li class="flex-1 sm:flex-initial">
            <a
              class="transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              >...</a
            >
          </li>
          <li class="flex-1 sm:flex-initial">
            <!-- v-if="filteredProducts  itemsPerPage " -->
            <a
              href="#"
              @click.prevent="nextPage"
              class="transition duration-200 hover:text-theme-1 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-theme-1 focus:ring-opacity-20 focus-visible:outline-none min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-lucide="chevron-right"
                class="lucide lucide-chevron-right stroke-1.5 h-4 w-4"
              >
                <path d="m9 18 6-6-6-6"></path></svg
            ></a>
          </li>
          <li class="flex-1 sm:flex-initial">
            <a
              @click.prevent="nextnextPage"
              href="#"
              class="transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-lucide="chevrons-right"
                class="lucide lucide-chevrons-right stroke-1.5 h-4 w-4"
              >
                <path d="m6 17 5-5-5-5"></path>
                <path d="m13 17 5-5-5-5"></path></svg
            ></a>
          </li>
        </ul>
      </nav>
      <!--  v-model="change_length" -->

      <select
        v-model="itemsPerPage"
        class="w-full disabled:bg-slate-100 disabled:cursor-not-allowed transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1 !box mt-3 w-20 sm:mt-0"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="35">35</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import moment from "moment";
// import axios from 'axios'
import axios from "../../../axios";
import { ref, inject, toRaw, watch } from "vue";
import debounce from "lodash.debounce";
import Button from "@/components/shared/buttons/Button.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { allOrders } from "../../../store/appointments";
import { allOrdersStore } from "../../../store/orders";
import { storeToRefs } from "pinia";
import {
  CalendarIcon,
  SearchIcon,
  ChevronDownIcon,
  XIcon,
} from "@heroicons/vue/outline";

import Datepicker from "@vuepic/vue-datepicker";

import Table from "./Table.vue";

export default {
  name: "Container",
  components: {
    Button,
    CalendarIcon,
    SearchIcon,
    ChevronDownIcon,
    // Button,
    Datepicker,
    XIcon,
    Table,
  },

  data() {
    return {
      filteredResponse: null,

      isLoadingdoctors: true,
      isFilterDates: false,
      isShowDates: false,
      appointments: [],
      allOrderssearch: [],
      patient: {},
      isLoading: false,
      isSearching: false,
      doctorName: "",
      search_term: null,
      isPending: false,
      isAppointmentModal: false,
      isFilterOptions: false,
      isFilterOptionsDate: false,
      // filterDates: ["1 Week", "1 Month", "1 Year", "Custom"],
      //     oneWeek:'Week',
      // oneMonth:'Maand',
      // oneYear:'Jaar',
      // customtext:'Aangepast',
      filterDates: [
        {
          name: this.t("translation.oneWeek"),
          value: "1 Week",
        },
        {
          name: this.t("translation.oneMonth"),
          value: "1 Month",
        },
        {
          name: this.t("translation.oneYear"),
          value: "1 Year",
        },
        {
          name: this.t("translation.customtext"),
          value: "Custom",
        },
      ],
      isCustomView: false,

      isMonthView: false,
      isWeekView: false,
      isYearView: false,
      isTodayView: false,
      isFilterOptionsForExports: false,
      isExporting: false,
      isUnchenkallstatus: null,
      isTarget: true,
      filterStatus: null,
      status: null,
      date: null,
      allAppstatus: "true",
      onLoadApp: "yes",

      filterOptions: [
        {
          name: this.t("translation.product_text"),
          value: "product",
        },
        {
          name: this.t("translation.service_text"),
          value: "service",
        },
      ],
      filterOptionsfff: [
        "Pending",
        "Waiting",
        "Confirmed",
        "Missed",
        "Completed",
        "Serving",
        "Canceled",
        "Upcoming appointments",
        "Past appointments",
        // "All appointments"
      ],
      filterOptionsDate: ["1 Week", "1 Month", "1 Year", "Custom"],
      filter_option: null,
      filter_option_date: "",
      isFilterTypes: false,

      treatment_id: null,
      filterOptionsForExports: ["PDF", "CSV", "Excel", "Print"],
      filter_option_exports: "",
      doctors: [],
      types: [],
      doctor_id: null,
      isDoctorList: false,
      isDoctorGroup: false,
      selected_doctors: [],
      selected_doctorsIDs: [],
      selected_doctorsNames: [],
      doctorsExpanded: false,
      isFilterList: false,
      selectedDoctors: [],
      selectedDoctorIds: [],
      doctorListSearch: "",
      numberDoctor: 0,
      clear: 0,
      firstDate: "",
      secondDate: "",
      filter_option_type: "",
      filter_date: "",
      isTreatments: false,
      typeID: "",
      current_page: 1,
      year: null,
      year_range: null,
      last_page: "",

      list: [],
      checkedOrderListMain: [],
      counter: 1,
      paginatedData: [],
      pagination: {
        last_page_url: null,
        next_page_url: "patients/appointments/all-paginated",
      },
      upcoming_appointments: null,
      past_appointments: null,
      date_range: null,
      month_range: null,
      lengthFrom: 1,
      lengthTo: null,
      lengthTotal: null,
      lengthCheched: null,
      focusTarget: null,
      displayDateFilter: false,
      displayNameFilter: true,
      displayStatusFilter: false,
      ourRequest: null,
      source: null,
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {},

  methods: {
    showStatusFilter() {
      this.displayStatusFilter = true;

      this.isFilterList = false;
      this.displayDateFilter = false;
      this.displayNameFilter = false;
    },
    showDateFilter() {
      this.displayDateFilter = true;
      this.displayStatusFilter = false;
      this.displayNameFilter = false;
      this.isFilterList = false;
    },
    showNameFilter() {
      this.displayNameFilter = true;
      this.displayDateFilter = false;
      this.displayStatusFilter = false;
      this.isFilterList = false;
    },
    showFilterList() {
      this.isFilterList = !this.isFilterList;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;

      this.isFilterDates = false;

      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
    },

    outsideDialogBox: function(e) {
      // close statusselector
      if (!document.getElementById("statusselector")?.contains(e.target)) {
        this.isFilterOptions = false;
      }
      // close dateselector
      if (!document.getElementById("dateselector")?.contains(e.target)) {
        this.isFilterDates = false;
      }
      // close doctorselector
      if (!document.getElementById("doctorselector")?.contains(e.target)) {
        this.doctorsExpanded = false;
      }

      //  close exportselector
      if (!document?.getElementById("exportselector")?.contains(e.target)) {
        this.isFilterOptionsForExports = false;
        this.isFilterList = false;
      } else {
      }
    },

    emptyInput() {
      if (this.search_term?.length < 1) {
        this.clearall();
      }
    },
    UncheckAllSelected() {
      this.isUnchenkallstatus = undefined;
      if (this.checkedOrderListMain.length > 0) {
        this.checkedOrderListMain.length = [];
        this.isUnchenkallstatus = true;
      }
    },
    checkedOrderList(checkedAppointments) {
      this.checkedOrderListMain = checkedAppointments;
    },
    nextPage() {
      // if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log("next page clicked", this.currentPage);
      // this.fetchMoreData();
      // }
    },
    nextnextPage() {
      this.currentPage = this.currentPage + 2;
      console.log("next page clicked", this.currentPage);
    },
    previouspreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 2;
        // this.fetchMoreData();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        // this.fetchMoreData();
      }
    },
    async fetchMoreData() {
      this.paginatedOrder;
    },

    async fetchAll(data) {},

    async exportDataTable() {
      if (this.checkedOrderListMain.length > 0) {
        let products = [];
        products = this.checkedOrderListMain;
        return products;
      } else {
        let products = [];
        this.filteredResponse.forEach((e) => {
          products.push(e.id);
        });
        return products;
      }
      // return appointments;
    },

    // pdf excel, csv export
    async printObject(
      type,
      filename = "Products",
      url = "/products/download-pdf"
    ) {
      try {
        const appointment2 = await this.exportDataTable();
        const token = localStorage.getItem("token");
        const config = {
          url: url,
          method: "get",
          responseType: "blob",

          params: {
            appointments: JSON.stringify(appointment2),
            lang: this.lang,
          },
          headers: {
            Authorization: "Bearer " + token,

            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        };
        this.hideFilterOptionsForExports();
        this.showExportLoader();

        axios(config)
          .then((response) => {
            const blob = new Blob([response.data], {
              type: `application/${type}`,
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.${type}`;
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch((err) => {});

        this.hideExportLoader();
      } catch (err) {}
    },
    async printData() {
      const appointment2 = await this.exportDataTable();
      const token = localStorage.getItem("token");
      const config = {
        url: "/products/appointments/download-pdf",
        method: "get",
        responseType: "blob",
        params: {
          appointments: JSON.stringify(appointment2),
        },
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      this.hideFilterOptionsForExports();
      this.isExporting = true;
      axios(config).then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });

        // window.open(URL.createObjectURL(blob)).print();

        let iframe = document.createElement("iframe"); //load content in an iframe to print later
        document.body.appendChild(iframe);

        iframe.style.display = "none";
        iframe.src = URL.createObjectURL(blob);
        iframe.onload = function() {
          setTimeout(function() {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      });

      this.hideExportLoader();
    },
    searchFocus() {
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      this.isFilterList = false;
    },
    expandDoctorPanel() {
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = !this.doctorsExpanded;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      this.isFilterList = false;
      document.activeElement.blur();
    },

    showFilterDates() {
      setTimeout(() => {
        this.isFilterDates = !this.isFilterDates;
        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isFilterOptionsForExports = false;
        document.activeElement.blur();
      }, 200);
    },
    hideFilterDates() {
      setTimeout(() => {
        this.isFilterDates = false;
      }, 200);
    },
    selectDate(option) {
      this.filter_date = option;
      this.isCustomView = false;
      this.isMonthView = false;
      this.isYearView = false;
      this.isWeekView = false;
      this.dialogClear();
      if (option === "Custom") {
        this.isCustomView = true;
        this.filter_date = this.t("translation.customtext");
      } else if (option === "1 Month") {
        // this.isPending = false;

        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isMonthView = true;
        this.filter_date = this.t("translation.oneMonth");
      } else if (option === "1 Year") {
        // this.isPending = false;

        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isYearView = true;
        this.filter_date = this.t("translation.oneYear");
      } else if (option === "1 Week") {
        // this.isPending = false;
        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;

        this.isWeekView = true;
        this.filter_date = this.t("translation.oneWeek");
      }
      this.hideFilterDates();
    },
    showFilterOptionsForExports() {
      this.isFilterOptionsForExports = !this.isFilterOptionsForExports;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;

      this.isFilterDates = false;

      this.isFilterList = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
    },
    dialogClear() {
      this.clear = 1;
      this.search_term = null;

      this.firstDate = "";
      this.secondDate = "";
      this.status = null;
      this.year = null;
      this.year_range = null;
      // this.isPending = false;
      this.filter_option = null;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;

      this.doctorName = null;

      this.date_range = null;
      this.filterStatus = null;

      this.month_range = null;
    },
    clearall() {
      this.ourRequest.cancel();

      this.paginatedData = [];
      this.clear = 1;
      this.search_term = null;
      this.doctorName = "";
      this.firstDate = "";
      this.secondDate = "";
      this.year = null;
      (this.year_range = null),
        // this.isPending = false;
        (this.status = null);
      this.filterStatus = null;
      this.filter_option = null;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterDates = false;

      this.selected_doctorsNames = [];

      this.filterStatus = null;
      this.checkedOrderListMain.length = 0;
      this.doctorName = null;

      this.date_range = null;

      this.month_range = null;

      this.paginatedOrder;
    },

    expandStatusPanel() {
      this.isFilterOptions = !this.isFilterOptions;
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      document?.activeElement?.blur();
    },
    showFilterOptions() {
      this.isFilterOptions = true;
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      document?.activeElement?.blur();
    },
    showFilterOptionsDate() {
      this.isFilterOptionsDate = true;
    },
    hideFilterOptionsDate() {
      this.isFilterOptionsDate = false;
    },
    showTreatments() {
      this.isTreatments = true;
    },
    selectOptionForExports(option) {
      this.filter_option_exports = option;
      this.performAction(option);
      this.hideFilterOptionsForExports();
    },
    hideFilterOptionsForExports() {
      setTimeout(() => {
        this.isFilterOptionsForExports = false;
      }, 200);
    },

    hideExportLoader() {
      setTimeout(() => {
        this.isExporting = false;
      }, 200);
    },
    showExportLoader() {
      this.isExporting = true;
    },
    hideFilterOptions() {
      setTimeout(() => {
        this.isFilterOptions = false;
      }, 200);
    },
    selectedTreatment(treatment) {
      this.isTreatments = false;

      this.treatment_id = treatment.id;
      this.typeID = treatment.id;
      this.selected_treatment = treatment.treatment;
    },
    hideTreatments() {
      this.selected_treatment = "";
      setTimeout(() => {
        this.isTreatments = false;
      }, 200);
    },

    selectOption(option) {
      if (option === "Pending") {
        this.filter_option = this.t("translation.pending_text");
      } else {
        this.filter_option = option;
      }

      // this.filter_option = option;
      this.hideFilterOptions();
    },
    selectOptionType(option) {
      this.filter_option_type = option;
      this.hideFilterOptions();
    },
    selectOptionDate(option) {
      this.filter_option_date = option;

      this.hideFilterOptionsDate();
    },

    clearFilters() {
      this.search_term = "";
      this.isPending = false;
      this.filter_option = "";
    },
    showModal() {
      this.isAppointmentModal = true;
      document.querySelector("html").classList.add("preventScroll");
    },
    hideModal() {
      this.isAppointmentModal = false;
      document.querySelector("html").classList.remove("preventScroll");
    },
    performAction(query) {
      if (query === "CSV") this.downloadCSV();
      if (query === "PDF") this.downloadPdf();
      if (query === "Excel") this.downloadExcel();
      if (query === "Print") this.printPdf();
    },

    handleDate(modelData) {
      this.filter_option = null;
      this.search_term = null;
      this.date = modelData;
      const startDate = date.value[0];
      const endDate = date.value[1];
    },
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user);
    },
    async paginatedOrder() {
      // keyword

      if (!!this.search_term) {
        this.fetchAll({ search_word: this.search_term });
      }

      // status
      else if (!!this.filterStatus) {
        this.fetchAll({ status: this.filterStatus });
      }

      // year filter
      else if (!!this.year) {
        this.fetchAll({ year: this.year_range });
      }

      // date range
      else if (this.date_range) {
        this.fetchAll({ date_range: this.date_range });
      }

      // month range
      else if (this.month_range) {
        const month = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("MM");
        const year = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("YYYY");
        this.month_range = [month, year];
        this.fetchAll({ month_range: this.month_range });
      } else {
        this.fetchAll({});
      }
    },

    filteredOrders() {
      let allOrders = [...this.orders];

      this.filteredResponse = allOrders;
      return allOrders;
    },
  },
  watch: {
    currentPage: debounce(function(e) {
      if (!!this.currentPage) {
        this.fetchAllOrders(this.currentPage, this.itemsPerPage);
      }
    }, 500),

    itemsPerPage: debounce(function(e) {
      if (!!this.currentPage) {
        this.currentPage = 1;
        this.fetchAllOrders(this.currentPage, this.itemsPerPage);
      }
    }, 500),
    // keyword
    search_term: debounce(function(e) {
      if (!!this.search_term) {
        //  this.source?.cancel();
        this.ourRequest.cancel();

        this.search_term = this.search_term;

        this.checkedOrderListMain = [];

        this.status = null;
        this.filterStatus = null;
        this.month_range = null;
        this.year = null;
        this.filter_option = null;

        this.isTarget = false;
        this.UncheckAllSelected();
        this.paginatedOrder;
      }
    }, 500),

    // status

    filter_option(newsearch_term, oldfilteroption) {
      if (!!newsearch_term) this.ourRequest.cancel();

      if (newsearch_term === this.t("translation.missed_text")) {
        this.year = null;
        this.month_range = null;
        this.search_term = null;

        this.paginatedData = [];
        this.filterStatus = 6;
        this.date_range = null;

        this.selected_doctorsNames = [];
        this.doctorName = null;

        this.UncheckAllSelected();
        this.paginatedOrder;
      } else {
        this.filterStatus = null;
      }

      this.UncheckAllSelected();
      this.paginatedOrder;
    },

    // year
    year: debounce(function(e) {
      if (!!this.year) {
        this.ourRequest.cancel();

        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;
        this.month_range = null;
        this.date_range = null;

        this.year_range = moment(new Date(this.year, 1)).format("YYYY");

        this.UncheckAllSelected();
        this.paginatedOrder;
      }
    }, 500),
    // daterange
    date: debounce(function(e) {
      if (!!this.date) {
        this.ourRequest.cancel();

        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;

        this.year = null;

        this.date = this.date;
        this.month_range = null;
        const startDate = moment(this.date[0]).format("YYYY-MM-DD HH:mm");
        const endDate = moment(this.date[1]).format("YYYY-MM-DD HH:mm");
        this.date_range = [startDate, endDate];

        this.UncheckAllSelected();
        this.paginatedOrder;
      }
    }, 500),

    // daterange
    month: debounce(function(e) {
      if (!!this.month) {
        this.ourRequest.cancel();

        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;
        this.year = null;

        this.date = null;

        this.month_range = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("MM-YYYY");

        this.UncheckAllSelected();
        this.paginatedOrder;
      }
    }, 500),
  },

  setup() {
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const { fetchOrders } = allOrdersStore();
    const { orders, isLoading } = storeToRefs(allOrdersStore());
    // const { products } = storeToRefs(allOrdersStore());

    const fetchAllOrders = (currentPage, itemsPerPage) => {
      const dataObj = {
        currentPage: currentPage,
        itemsPerPage: parseInt(itemsPerPage),
      };
      console.log("page products store parameters", dataObj);
      allOrdersStore().fetchOrders(dataObj);
    };
    fetchAllOrders(currentPage.value, itemsPerPage.value);
    const date = ref();
    const month = ref();

    const { t } = useI18n({});
    const format = (dateArr) => {
      const formattedStartDate = moment(dateArr[0]).format("DD/MM/YYYY");
      const formattedEndDate = moment(dateArr[1]).format("DD/MM/YYYY");

      return `${formattedStartDate} - ${formattedEndDate}`;
    };
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);

    watch(orders, (neworders, oldorders) => {
      orders.value = neworders;
    });
    return {
      t,
      orders,

      date,
      format,
      month,

      lang,
      fetchAllOrders,
      isLoading,
      itemsPerPage,
      currentPage,
    };
  },
};
</script>
<style scoped>
.doctor_search-contents2 {
  background: white;
  min-height: 30px;
  height: 330px;
  position: absolute;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #0000001a, -5px -5px 10px #0000001a;
  padding-top: 0;
  padding-bottom: 0;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 15;
}
.doctor_search-area2 {
  margin-top: 12px;
  margin-bottom: 12px;
  width: 90%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #ff782e;
}
.doctor_search-dropdown2 {
  min-height: 35px;
  max-height: 39vh;
}
.doctor_search-results2 {
  padding: 5px;
  width: 90%;
  height: 330px;
  margin-top: 1px;
  margin-bottom: 10px;
  font-size: 14px;
  overflow: auto;
}

.product-container {
  height: calc(100vh - 80px);

  /* height: calc(100vh - 160px); */
}
.parent-container {
  height: calc(100vh - 325px);
}
.metrics-list {
  height: calc(100vh - 160px);
}
/*media queries */
@media screen and (min-width: 768px) {
  .filter-treatments {
    width: 660px;
  }
}
@media screen and (min-width: 2560px) {
  .datepicker {
    width: 460px !important;
  }
}

@media screen and (min-width: 1440px) {
  .search-container {
    width: 100%;
  }
  .date-picker {
    width: 300px;
  }
  .calender-width {
    /* width: 250px; */
    /* width: 350px;
    margin-right: 500px; */
  }
}
</style>
<style>
.dp__select {
  color: #ff782e !important;
}
.dp__overlay_cell_active {
  background: #ff782e !important;
}
</style>
