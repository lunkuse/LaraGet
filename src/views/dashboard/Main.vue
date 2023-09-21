<template>
  <div>
    <div>
      <div class="content">
        <div class="col-span-12 2xl:col-span-9">
          <!-- first column -->
          <CustomerSupport class="position: absolute z-50" />

          <div
            class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3"
          >
            <h2 class="text-lg font-medium truncate mr-5">
              {{ $t("translation.services_text") }}
            </h2>
          </div>
          <div class="grid grid-cols-12 gap-6">
            <!-- tabs -->
            <div class="col-span-12 grid grid-cols-12 gap-6">
              <!-- manage appointments -->
              <router-link
                to="/dashboard/viewappointments"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-43 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        {{ $t("translation.manage_your_appointments") }}
                      </div>
                      <div
                        class="text-theme-43 py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                      >
                        {{ no_of_appointments }}
                      </div>
                    </div>
                    <div class="mt-1">
                      <div>
                        <CalendarIcon class="text-theme-43" />
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- statements & invoices -->
              <router-link
                to="/dashboard/invoice"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-44 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        <span>{{ $t("translation.statements_text") }}</span>
                        &
                        <span>{{ $t("translation.invoice_text") }}</span>
                      </div>
                      <!-- <div class="text-lg font-medium truncate mr-3" v-else>Statements & Invoices</div> -->
                      <div
                        class="text-theme-44 py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                      >
                        {{ no_of_invoices }}
                      </div>
                    </div>
                    <div class="mt-1">
                      <div>
                        <CreditCardIcon class="text-theme-44" />
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- Communicate to your doctor -->
              <router-link
                to="/dashboard/communication"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-43 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        {{ $t("translation.communicate_to_your_doctor") }}
                      </div>

                      <div
                        class="text-theme-43 py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                      ></div>
                    </div>
                    <div class="mt-1">
                      <div>
                        <MessageCircleIcon class="text-theme-43" />
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- treatment plans -->
              <router-link
                to="/dashboard/appointmenttypes"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-42 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        {{ $t("translation.appointment_types_text") }}
                      </div>

                      <div
                        class="text-theme-42 py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                      >
                        {{ no_of_types }}
                      </div>
                    </div>
                    <div class="mt-1">
                      <div>
                        <ClipboardIcon class="text-theme-42" />
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 2xl:col-span-9">
            <!-- first column -->

            <div class="grid grid-cols-12 gap-6">
              <!-- added -->
              <!-- BEGIN: Calender Component -->
              <div class="col-span-12 lg:col-span-12 mt-8">
                <!-- <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">Chart</h2>
                </div>-->

                <div class="intro-x flex flex-wrap items-center h-14">
                  <h2 class="text-lg font-medium mr-5" v-if="chartVisible">
                    {{ $t("translation.chart_text") }}
                  </h2>
                  <h2 class="text-lg font-medium mr-5" v-if="perioVisible">
                    {{ $t("translation.perio_text") }}
                  </h2>
                  <a
                    v-if="chartVisible"
                    @click="showPerio()"
                    class="ml-auto flex mr-1 mb-2 ml-auto btn flex mr-1 mb-2 bg-theme-32 text-white dark:text-white truncate"
                  >
                    <EyeIcon class="text-white h-6 w-6 mr-2" />
                    <span class="flex flex-wrap"
                      >{{ $t("translation.perio_text") }}
                    </span>
                  </a>
                  <a
                    v-if="perioVisible"
                    @click="showChart()"
                    class="ml-auto flex mr-1 mb-2 ml-auto btn flex mr-1 mb-2 bg-white dark:text-white truncate"
                  >
                    <FullChartButton
                      class="border-yellow-650 border-1 mr-2 h-6 w-6 text-theme-36"
                    />
                    <span class="flex flex-wrap pt-1">{{
                      $t("translation.chart_text")
                    }}</span>
                  </a>
                </div>
                <div class="intro-y box p-2 mt-10 sm:mt-5">
                  <!-- dental chart -->
                  <TeethDiagram v-if="chartVisible" />
                  <PerioTeethDiagram v-if="perioVisible" />
                  <!-- <FullCalendar :options="calendarOptions" /> -->
                </div>
              </div>
              <!-- END: Calender Component  -->

              <!-- upcoming -->
              <div
                class="col-span-12 block 2xl:hidden xl:block lg:block md:block sm:block"
              >
                <div class="2xl:border-l border-gray-100 -mb-10 pb-1">
                  <div class="2xl:pl-6 grid grid-cols-12">
                    <div
                      class="col-span-12 md:col-span-12 xl:col-span-12 2xl:col-span-12 mt-3 2xl:mt-8"
                    >
                      <!-- header upcoming -->

                      <div class="intro-x flex flex-wrap items-center h-14">
                        <h2 class="text-lg font-medium mr-5">
                          {{ $t("translation.upcoming_appointments_text") }}
                        </h2>

                        <a
                          href="javascript:;"
                          data-toggle="modal"
                          data-target="#static-backdrop-modal-preview"
                          class="ml-auto flex btn mr-1 mb-2 bg-theme-32 text-white dark:text-white truncate"
                        >
                          <PlusIcon />
                          <span class="flex flex-wrap">{{
                            $t("translation.new_appointment_text")
                          }}</span>
                        </a>
                      </div>

                      <span
                        v-if="loadingupcoming"
                        class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
                      >
                        <LoadingIcon icon="oval" class="w-10 h-10" />
                        <span>{{ $t("translation.loading_text") }}</span>
                      </span>
                      <div v-else>
                        <div
                          class="leading-[2.15rem] w-full sm:w-52 text-gray-500 dark:text-white -mt-3"
                        >
                          <span
                            class="font-medium"
                            v-if="upcomingappointmentsCount < 1"
                          >
                            <p
                              class="text-sm text-theme-1 font-medium truncate mr-5 mt-6"
                            >
                              {{
                                $t(
                                  "translation.no_upcoming_appointments_yet_text"
                                )
                              }}!
                            </p>
                          </span>
                        </div>

                        <div class="intro-y p-2 mt-1 sm:mt-1">
                          <div class="mt-5 relative" style="height: 100%">
                            <div
                              class="intro-x relative flex items-center mb-3"
                              v-for="upcomingappointments in upcomingonly"
                              :key="upcomingappointments.id"
                              :class="{ 'mt-5': upcomingappointments.id }"
                            >
                              <!-- <a
                            href="javascript:;"
                            data-toggle="modal"
                            data-target="#open-notification-all-modal"
                            :disabled="isDisabled"
                            @click="getUpcomingAppointment(upcomingappointments)"
                            class="flex-1 float-right"
                          >-->
                              <!-- <div class="box px-5 py-2 ml-4 flex-1 zoom-in " 
                :class="appointmentStatusClass(upcomingappointments.status.status)"
                          >-->

                              <!-- <router-link
                              :to="{
                      name: 'side-menu-appointment-details',
                      params: { appointmentId: upcomingappointments.id }
                    }"
                          >-->
                              <div class="box px-5 py-2 ml-1 flex-1 zoom-in">
                                <div class="flex items-center">
                                  <div class="font-medium truncate ...">
                                    <h5
                                      class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                                    >
                                      {{
                                        upcomingappointments.treatment_type
                                          ? upcomingappointments?.treatment_type
                                              ?.title
                                          : upcomingappointments
                                              ?.appointment_type?.title
                                      }}
                                    </h5>
                                  </div>
                                </div>
                                <div class="text-gray-800 truncate">
                                  <span class="float-right">
                                    <div
                                      class="flex"
                                      :class="{
                                        'text-theme-44':
                                          upcomingappointments?.status
                                            ?.status === 'Waiting',
                                        'text-theme-9':
                                          upcomingappointments?.status
                                            ?.status === 'Confirmed',
                                        'text-theme-42':
                                          upcomingappointments?.status
                                            ?.status === 'Closed',
                                        'text-grey-100':
                                          upcomingappointments?.status
                                            ?.status === 'Pending',
                                        'text-theme-6':
                                          upcomingappointments?.status
                                            ?.status === 'Canceled',
                                        'text-theme-44':
                                          upcomingappointments?.status
                                            ?.status === 'Serving',
                                      }"
                                    >
                                      <AlertCircleIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Waiting'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      <ThumbsUpIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Confirmed'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      <CheckSquareIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Closed'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      <CheckSquareIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Pending'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      <CheckSquareIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Canceled'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      <CheckSquareIcon
                                        v-if="
                                          upcomingappointments?.status
                                            ?.status === 'Serving'
                                        "
                                        class="w-4 h-4 mr-2"
                                      />
                                      {{
                                        getStatus(
                                          upcomingappointments?.status?.status
                                        )
                                      }}
                                    </div>
                                  </span>
                                  <div
                                    class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-600"
                                  >
                                    <div
                                      v-if="
                                        upcomingappointments?.date.match(
                                          /^\d{4}-\d{2}-\d{2}$/
                                        ) === null
                                      "
                                    >
                                      {{
                                        moment(
                                          upcomingappointments?.date,
                                          "DD-MM-YYYY"
                                        ).format("DD-MM-YYYY")
                                      }}
                                    </div>
                                    <div v-else>
                                      {{
                                        moment(
                                          upcomingappointments?.date,
                                          "YYYY-MM-DD"
                                        ).format("DD-MM-YYYY")
                                      }}
                                    </div>
                                  </div>
                                  <p
                                    class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-400"
                                  >
                                    {{
                                      upcomingappointments?.slots["start-time"]
                                    }}
                                    -
                                    {{
                                      upcomingappointments?.slots["end-time"]
                                    }}
                                  </p>
                                  <div class="w-36 md:w-56 sm:w-36 pt-1">
                                    <!-- <Countdown
                                    countdownSize="1.5rem"
                                    labelSize="0.8rem"
                                    mainColor="white"
                                    :deadlineDate="appointmentTimer(upcomingappointments.id)"
                                />-->
                                  </div>

                                  <button
                                    class="btn btn-outline-secondary w-full border-slate-300 focus:outline-none dark:border-darkmode-300 border-dashed relative justify-start mb-2 mt-2"
                                    @click="showAppDetail(upcomingappointments)"
                                  >
                                    <span class="truncate mr-5">{{
                                      $t("translation.viewAppointmentDetails")
                                    }}</span>
                                    <span
                                      class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"
                                    >
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
                                        icon-name="arrow-right"
                                        data-lucide="arrow-right"
                                        class="lucide lucide-arrow-right w-4 h-4"
                                      >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                      </svg>
                                    </span>
                                  </button>
                                  <br />
                                  <router-link
                                    :to="{
                                      name: 'side-menu-dentalquestions',
                                      params: {
                                        appointmentId: upcomingappointments?.id,
                                        patientId:
                                          upcomingappointments?.patient_id,
                                      },
                                    }"
                                    v-if="
                                      upcomingappointments?.is_qtn_required == 1
                                    "
                                  >
                                    <button
                                      class="btn hover:text-white btn-outline-danger focus:ring-0 w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2"
                                      v-if="
                                        upcomingappointments?.is_question_answered !=
                                        1
                                      "
                                    >
                                      <span class="truncate mr-5">{{
                                        $t(
                                          "translation.answer_anamnese_questions_text"
                                        )
                                      }}</span>
                                      <span
                                        class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"
                                      >
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
                                          icon-name="arrow-right"
                                          data-lucide="arrow-right"
                                          class="lucide lucide-arrow-right w-4 h-4"
                                        >
                                          <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                          />
                                          <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                      </span>
                                    </button>
                                  </router-link>
                                </div>
                              </div>
                              <!-- </router-link> -->
                              <!-- </div> -->
                              <!-- </a> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- BEGIN: Upcoming Appointments -->
              <!-- <div class="col-span-12 lg:col-span-6 mt-8" v-if="upcomingappointments.length !== 0"> -->

              <div
                class="col-span-12 lg:col-span-12 mt-8"
                v-if="client_invoices.length !== 0"
              >
                <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    {{ $t("translation.recent_invoices_text") }}
                  </h2>
                  <router-link
                    to="/dashboard/invoice"
                    class="ml-auto btn mr-1 mb-2 bg-theme-32 text-white dark:text-theme-10 truncate"
                  >
                    {{ $t("translation.view_all_invoices_text") }}</router-link
                  >
                </div>
                <div class="intro-y p-2 mt-10 sm:mt-5">
                  <div
                    v-for="invoice in client_invoices"
                    :key="invoice.id"
                    class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                  >
                    <router-link
                      :to="{
                        name: 'side-menu-invoice-details',
                        params: { invoiceId: invoice.id },
                      }"
                    >
                      <div class="intro-y">
                        <div
                          class="box px-4 py-4 mb-3 flex items-center zoom-in"
                        >
                          <div class="ml-4 mr-auto">
                            <div class="font-medium">
                              {{ invoice.invoice_id }}
                            </div>
                            <div class="text-slate-500 text-xs mt-0.5">
                              {{
                                moment(invoice.created_at).format("DD-MM-YYYY")
                              }}
                            </div>
                          </div>
                          <div
                            class="py-1 px-2 rounded-full text-xs bg-success cursor-pointer font-medium"
                          >
                            ${{ invoice?.total_with_vat }}
                            <div
                              class="py-1 rounded-full text-xs text-theme-36 cursor-pointer font-medium"
                            >
                              {{ getInvoiceStatus(invoice.status) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- END: Calender Component  -->
              <!-- appointment creation form -->
              <div
                class="col-span-12 lg:col-span-12 mt-8"
                v-if="notificationclientemails.length !== 0"
              >
                <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    {{ $t("translation.recent_messages_text") }}
                  </h2>

                  <router-link
                    to="/dashboard/communication"
                    class="ml-auto btn mr-1 mb-2 bg-theme-32 text-white dark:text-theme-10 truncate"
                    >{{ $t("translation.view_more_text") }}</router-link
                  >
                </div>
                <div class="intro-y p-2 mt-10 sm:mt-5">
                  <div
                    v-for="notificationclientemail in notificationclientemails"
                    :key="notificationclientemail"
                    class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                  >
                    <!-- <router-link
                      :to="{
                        name: 'side-menu-open-email',
                        params: {
                          emailId: notificationclientemail.id,
                          messageId: notificationclientemail.data.message_id
                        }
                      }"
                      @click="goToEmail()"
                    > -->
                    <div class="intro-y">
                      <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                        <div class="ml-4 mr-auto">
                          <div class="flex items-center">
                            <div class="flex-none image-fit mr-1">
                              <Avatar
                                v-if="
                                  !!notificationclientemail.data.from_details
                                "
                                v-bind:initials="
                                  notificationclientemail?.data?.from_details
                                    ?.first_name +
                                  notificationclientemail?.data?.from_details
                                    ?.last_name
                                "
                                class="rounded-full"
                              />
                              <Avatar
                                v-else
                                v-bind:initials="
                                  notificationclientemail?.data?.message
                                "
                                class="rounded-full"
                              />

                              <div
                                class="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white"
                              ></div>
                            </div>
                            <div class="ml-2 overflow-hidden">
                              <div
                                class="flex items-center"
                                v-if="
                                  !!notificationclientemail.data.from_details
                                "
                              >
                                <a
                                  href="javascript:;"
                                  class="font-medium truncate mr-5"
                                  >{{
                                    notificationclientemail?.data?.from_details
                                      ?.first_name
                                  }}
                                  {{
                                    notificationclientemail?.data?.from_details
                                      ?.last_name
                                  }}</a
                                >
                              </div>
                              <div class="flex items-center" v-else>
                                <a
                                  href="javascript:;"
                                  class="font-medium truncate mr-5"
                                  >{{ notificationclientemail?.data?.message }}
                                </a>
                              </div>

                              <div
                                class="w-24 2xl:w-full xl:w-full lg:w-full md:w-full truncate text-gray-600 mt-0.5"
                              >
                                <span class="w-10 truncate">
                                  <!--    class="2xl:w-64 xl:w-64  truncate sm:w-auto" -->
                                  <span class="truncate font-medium">{{
                                    notificationclientemail?.data?.subject
                                  }}</span></span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="py-1 px-2 rounded-full text-xs bg-success cursor-pointer font-medium"
                        >
                          {{
                            moment(
                              notificationclientemail?.created_at
                            ).fromNow()
                          }}
                        </div>
                      </div>
                    </div>
                    <!-- </router-link> -->
                  </div>
                </div>
              </div>
              <!-- BEGIN: Upcoming Appointments -->
            </div>
          </div>
          <div class="col-span-12 2xl:col-span-3">
            <div class="2xl:border-l border-gray-100 -mb-10 pb-1">
              <div class="2xl:pl-6 grid grid-cols-12">
                <div
                  class="col-span-12 md:col-span-12 xl:col-span-12 2xl:col-span-12 mt-3 2xl:mt-8 hidden 2xl:block xl:hidden lg:hidden md:hidden sm:hidden"
                >
                  <!-- header upcoming -->
                  <div class="intro-x flex flex-wrap items-center h-10">
                    <a
                      href="javascript:;"
                      data-toggle="modal"
                      data-target="#static-backdrop-modal-preview"
                      class="ml-auto btn flex mr-1 mb-2 bg-theme-32 text-white dark:text-white truncate"
                    >
                      <PlusIcon />
                      <span class="flex flex-wrap">{{
                        $t("translation.new_appointment_text")
                      }}</span>
                    </a>
                  </div>
                  <div class="intro-x flex flex-wrap items-center h-10">
                    <h2 class="text-lg font-medium mr-5">
                      {{ $t("translation.upcoming_appointments_text") }}
                    </h2>
                  </div>

                  <span
                    v-if="loadingupcoming"
                    class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
                  >
                    <LoadingIcon icon="oval" class="w-10 h-10" />
                    <span>{{ $t("translation.loading_text") }}</span>
                  </span>
                  <div v-else>
                    <div
                      class="leading-[2.15rem] w-full sm:w-52 text-gray-500 dark:text-white -mt-3"
                    >
                      <span
                        class="font-medium"
                        v-if="upcomingappointmentsCount < 1"
                      >
                        <p
                          class="text-sm text-theme-1 font-medium truncate mr-5 mt-8"
                        >
                          {{
                            $t("translation.no_upcoming_appointments_yet_text")
                          }}!
                        </p>
                      </span>
                    </div>

                    <div class="intro-y p-2 mt-1 sm:mt-1">
                      <div class="mt-5 relative" style="height: 100%">
                     
                        <div
                          class="intro-x relative flex items-center mb-3"
                          v-for="upcomingappointments in upcomingonly"
                          :key="upcomingappointments.id"
                          :class="{ 'mt-5': upcomingappointments.id }"
                        >
                          <!-- <a
                            href="javascript:;"
                            data-toggle="modal"
                            data-target="#open-notification-all-modal"
                            :disabled="isDisabled"
                            @click="getUpcomingAppointment(upcomingappointments)"
                            class="flex-1 float-right"
                          >-->
                          <!-- <div class="box px-5 py-2 ml-4 flex-1 zoom-in " 
                :class="appointmentStatusClass(upcomingappointments.status.status)"
                          >-->

                          <!-- <router-link
                              :to="{
                      name: 'side-menu-appointment-details',
                      params: { appointmentId: upcomingappointments.id }
                    }"
                          >-->
                          <div class="box px-5 py-2 ml-1 flex-1 zoom-in">
                            <div class="flex items-center">
                              <div class="font-medium truncate ...">
                                <h5
                                  class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                  {{
                                    upcomingappointments.treatment_type
                                      ? upcomingappointments?.treatment_type
                                          ?.title
                                      : upcomingappointments?.appointment_type
                                          ?.title
                                  }}
                                </h5>
                              </div>
                            </div>
                            <div class="text-gray-800 truncate">
                              <span class="float-right">
                                <div
                                  class="flex"
                                  :class="{
                                    'text-theme-44':
                                      upcomingappointments?.status?.status ===
                                      'Waiting',
                                    'text-theme-9':
                                      upcomingappointments?.status?.status ===
                                      'Confirmed',
                                    'text-theme-42':
                                      upcomingappointments?.status?.status ===
                                      'Closed',
                                    'text-grey-100':
                                      upcomingappointments?.status?.status ===
                                      'Pending',
                                    'text-theme-6':
                                      upcomingappointments?.status?.status ===
                                      'Canceled',
                                    'text-theme-44':
                                      upcomingappointments?.status?.status ===
                                      'Serving',
                                  }"
                                >
                                  <AlertCircleIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Waiting'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  <ThumbsUpIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Confirmed'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  <CheckSquareIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Closed'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  <CheckSquareIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Pending'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  <CheckSquareIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Canceled'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  <CheckSquareIcon
                                    v-if="
                                      upcomingappointments?.status?.status ===
                                      'Serving'
                                    "
                                    class="w-4 h-4 mr-2"
                                  />
                                  {{
                                    getStatus(
                                      upcomingappointments?.status?.status
                                    )
                                  }}
                                </div>
                              </span>
                              <div
                                class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-600"
                              >
                                <div
                                  v-if="
                                    upcomingappointments?.date.match(
                                      /^\d{4}-\d{2}-\d{2}$/
                                    ) === null
                                  "
                                >
                                  {{
                                    moment(
                                      upcomingappointments?.date,
                                      "DD-MM-YYYY"
                                    ).format("DD-MM-YYYY")
                                  }}
                                </div>
                                <div v-else>
                                  {{
                                    moment(
                                      upcomingappointments?.date,
                                      "YYYY-MM-DD"
                                    ).format("DD-MM-YYYY")
                                  }}
                                </div>
                              </div>
                              <p
                                class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-400"
                              >
                                {{ upcomingappointments?.slots["start-time"] }}
                                -
                                {{ upcomingappointments?.slots["end-time"] }}
                              </p>
                              <div class="w-36 md:w-56 sm:w-36 pt-1">
                                <!-- <Countdown
                                    countdownSize="1.5rem"
                                    labelSize="0.8rem"
                                    mainColor="white"
                                    :deadlineDate="appointmentTimer(upcomingappointments.id)"
                                />-->
                              </div>
                              <button
                                class="btn btn-outline-secondary w-full border-slate-300 focus:outline-none dark:border-darkmode-300 border-dashed relative justify-start mb-2 mt-2"
                                @click="showAppDetail(upcomingappointments)"
                              >
                                <span class="truncate mr-5">{{
                                  $t("translation.viewAppointmentDetails")
                                }}</span>
                                <span
                                  class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"
                                >
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
                                    icon-name="arrow-right"
                                    data-lucide="arrow-right"
                                    class="lucide lucide-arrow-right w-4 h-4"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </span>
                              </button>
                              <br />
                              <router-link
                                :to="{
                                  name: 'side-menu-dentalquestions',
                                  params: {
                                    appointmentId: upcomingappointments?.id,
                                    patientId: upcomingappointments?.patient_id,
                                  },
                                }"
                                v-if="
                                  upcomingappointments?.is_qtn_required == 1
                                "
                              >
                                <button
                                  class="btn hover:text-white btn-outline-danger w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2"
                                  v-if="
                                    upcomingappointments?.is_question_answered ==
                                    0
                                  "
                                >
                                  <span class="truncate mr-5">{{
                                    $t(
                                      "translation.answer_anamnese_questions_text"
                                    )
                                  }}</span>
                                  <span
                                    class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"
                                  >
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
                                      icon-name="arrow-right"
                                      data-lucide="arrow-right"
                                      class="lucide lucide-arrow-right w-4 h-4"
                                    >
                                      <line x1="5" y1="12" x2="19" y2="12" />
                                      <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                  </span>
                                </button>
                              </router-link>
                            </div>
                          </div>
                          <!-- </router-link> -->
                          <!-- </div> -->
                          <!-- </a> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ApplicationForm :key="componentKey" />
    <AppointmentModal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :appointment="selectedAppointment"
      class="!z-50"
    />
  </div>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import list from "@fullcalendar/list";
// import axios from 'axios'
import axios from "../../axios";
import moment from "moment";
import nl from "moment/locale/nl";
import router from "../../router";
import ApplicationForm from "../appointments/AddAppointment.vue";
// import ModalIdle from '@/components/idle/ModalIdle.vue'
import { Countdown } from "vue3-flip-countdown";
import TeethDiagram from "../dashboard/TeethDiagram.vue";
// import PerioTeethDiagram  from '../chart-diagrams/PerioContainer.vue'
import PerioTeethDiagram from "../treatments/Perio.vue";
import CustomerSupport from "@/components/customersupport/Chat.vue";
import Avatar from "@/components/avatar/Avatar.vue";
import AppointmentModal from "../appointments/appointments/AppointmentModal.vue";
import { useI18n } from "vue-i18n";
import FullChartButton from "@/components/charting/FullChartButton.vue";
import { useStore } from "vuex";
import { EyeIcon } from "@heroicons/vue/outline";
export default defineComponent({
  components: {
    FullCalendar,
    ApplicationForm,
    // ModalIdle,
    TeethDiagram,
    Countdown,
    CustomerSupport,
    Avatar,
    AppointmentModal,
    EyeIcon,
    PerioTeethDiagram,
    FullChartButton,
  },
  data() {
    return {
      loading: false,
      loadingupcoming: false,
      upcomingappointments: [],
      upcomingappointmentsCount: null,
      datetoday: "",
      no_of_appointments: 0,
      upcomingonly: [],
      no_of_invoices: 0,
      no_of_types: 0,
      client_invoices: [],
      client_messages: [],
      notificationclientemails: "",

      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGrid, list],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        header: {
          left: "title",
          center: "month,agendaWeek,agendaDay",
          right: "today prev,next",
        },
        headerToolbar: {
          left: "dayGridMonth timeGridWeek timeGridDay",
          center: "title",
          right: "prevYear prev next nextYear",
        },
        footerToolbar: {
          left: "TableFormat",
          center: "",
          right: "prev,next",
        },
        customButtons: {
          TableFormat: {
            text: " Table View",
            click: function () {
              // alert('View in Table Format');
              // /dashboard/viewappointments
              router.push({
                name: "side-menu-view-appointments",
              });
            },
          },
        },
        events: [],
        eventColor: "#FF782E",
      },
    };
  },
  watch: {
    upcomingonly(newdata, old) {
      console.log("new upcomingonly", newdata);
      this.upcomingonly = newdata;
    },
  },
  setup() {
    const { t } = useI18n({});

    const perioVisible = ref(false);
    const chartVisible = ref(true);
    const showPerio = () => {
      perioVisible.value = true;
      chartVisible.value = false;
    };
    const showChart = () => {
      perioVisible.value = false;
      chartVisible.value = true;
    };

    const selectedAppointment = ref(null);
    const isAppDetailVisible = ref(false);
    const showAppDetail = (appointment) => {
      selectedAppointment.value = appointment;
      isAppDetailVisible.value = true;
    };
    const closeAppDetail = () => {
      isAppDetailVisible.value = false;
      selectedAppointment.value = null;
    };
    const getInvoiceStatus = (status) => {
      let translatedStatus = status;
      console.log("invoice status", status);
      if (status == "1") {
        translatedStatus = t("translation.paid_text");
        return translatedStatus;
      } else if (status == "0") {
        translatedStatus = t("translation.pending_text");
        return translatedStatus;
      } else {
        return translatedStatus;
      }
    };

    return {
      t,
      selectedAppointment,
      showAppDetail,
      closeAppDetail,
      isAppDetailVisible,
      getInvoiceStatus,
      perioVisible,
      chartVisible,
      showChart,
      showPerio,
    };
  },
  computed: {},
  created() {
    this.getUpcomingAppointmentonly();
    this.getInvoices();
    moment.updateLocale("nl");
  },
  mounted() {
    this.datetoday = new Date();
    this.getUpcomingAppointmentonly();
    this.getUpcomingAppointment();
    this.getInvoices();
    this.getAllAppointmentTypes();
    moment.updateLocale("nl");
    // this.getTreatment()
    this.getInbox();
  },
  methods: {
    moment,

    // status method
    getStatus(status) {
      let translatedStatus = status;

      if (status === "Confirmed") {
        translatedStatus = this.t("translation.confirmed_text");
        return translatedStatus;
      } else if (status === "Pending") {
        translatedStatus = this.t("translation.pending_text");
        return translatedStatus;
      } else if (status === "Waiting") {
        translatedStatus = this.t("translation.waiting_text");
        return translatedStatus;
      } else if (status === "Closed") {
        translatedStatus = this.t("translation.closed_text");
        return translatedStatus;
      } else if (status === "Canceled") {
        translatedStatus = this.t("translation.canceled_text");
        return translatedStatus;
      } else if (status === "Missed") {
        translatedStatus = this.t("translation.missed_text");

        return translatedStatus;
      } else if (status === "Serving") {
        translatedStatus = this.t("translation.serving_text");
        return translatedStatus;
      } else {
        return translatedStatus;
      }
    },
    // Getting All Recent invoices
    getInvoices() {
      axios

        .post("patients/invoices/recent_invoices", {})
        .then((res) => {
          if (res?.data?.payload != null) {
            Object.assign(this.client_invoices, res?.data?.payload);
            const all_client_invoices = res?.data?.payload;
            this.no_of_invoices = all_client_invoices?.length;
            this.client_invoices = all_client_invoices?.slice(0, 5);

            if (res.data?.status === false) {
              this.$store.dispatch("auth/logout");
              this.$router.push("/login");
            }
          }
        })
        .catch((err) => console.log("my error", err));
    },

    // handle date click
    handleDateClick: function (arg) {
      // alert('make new appointment on ' + arg.dateStr)
    },
    // Getting All types
    getAllAppointmentTypes() {
      axios
        .post("patients/appointments/types", {})
        .then((res) => {
          const appointment_type = res.data.payload;
          this.no_of_types = appointment_type.length;
        })
        .catch((err) => console.log(err));
    },
    // total sum for prices
    formatSum(value) {
      if (value) {
        const array = Number(value);
        let sum = 0;

        const total = String(value)
          .split(",")
          .map((e) => parseFloat(e))
          .reduce((value, element) => {
            return value + element;
          });
        // .toStringAsFixed(1)
        const sum2 = 9;

        console.log("new total", total);
        //   console.log('array sum',sum )
        return total;
      }
    },
    // timer date
    appointmentTimer(id) {
      console.log("timer id", id);
      const tommorrow = moment().add(1, "days");

      const date = this.upcomingappointments.filter(
        (element) => element.id === id
      )[0];
      const mydate =
        date.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
          ? moment(
              `${date.date} ${date.slots["start-time"]}`,
              '"DD-MM-YYYY" HH:mm'
            ).format("YYYY-MM-DD HH:mm")
          : moment(
              `${date.date} ${date.slots["start-time"]}`,
              "YYYY-MM-DD HH:mm"
            ).format("YYYY-MM-DD HH:mm");

      console.log("timer date", mydate);

      //          const minusPending = upcheckinappointments.filter((element) =>
      //              (element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
      //                   ? moment(element.date, "DD-MM-YYYY").isSame(new Date(), 'day') : moment(element.date, "YYYY-MM-DD").isSameOrAfter(new Date(), 'day')
      // ))
      return mydate;
    },
    // appointments
    getUpcomingAppointment() {
      this.loading = true;

      try {
        axios.post("patients/appointments/all", {}).then((res) => {
          this.loading = false;
          const allappointments = res.data.payload;

          // element.slots['start-time'] > moment().format("HH:mm")

          //   const minusPending = allappointments.filter((element) =>
          //  (element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
          //       ? moment(element.date, "DD-MM-YYYY").isSameOrAfter(this.datetoday, 'day') : moment(element.date, "YYYY-MM-DD").isSameOrAfter(this.datetoday, 'day')
          //       ))

          //        const minusPending = allappointments.filter((element) =>
          //  (element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
          //       ? moment(element.date, "DD-MM-YYYY").isSameOrAfter(this.datetoday, 'day') : moment(element.date, "YYYY-MM-DD").isSameOrAfter(this.datetoday, 'day')
          //       ))

          const minusPending = allappointments.filter((element) =>
            element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
              ? moment(
                  `${element.date} ${element.slots["end-time"]}`,
                  "DD-MM-YYYY HH:mm"
                ).isSameOrAfter(this.datetoday)
              : moment(
                  `${element.date} ${element.slots["end-time"]}`,
                  "YYYY-MM-DD HH:mm"
                ).isSameOrAfter(this.datetoday)
          );

          console.log("minusPendinglast", minusPending);
          // const minusPending = allappointments.filter((element) =>
          //  (element.status.status !== 'Pending' && element.status.status !== 'Closed' ))
          const array = minusPending
            .sort((a, b) => a.created_at - b.created_at)
            .reverse();
          // const array = minusPending.sort((a, b) => Date(a.date) - new Date(b.date))
          // const array = minusPending.sort((a, b) => b - a)
          const arraydesc = minusPending.reverse();
          console.log("sorted array", arraydesc);
          this.no_of_appointments = allappointments.length;
          this.upcomingappointments = array.slice(0, 5);

          console.log("minusPending ", minusPending);
          const events = allappointments.map((p) => {
            const color =
              p.status.status === "Waiting"
                ? "orange"
                : p.status.status === "Confirmed"
                ? "green"
                : p.status.status === "Closed"
                ? "red"
                : "grey";
            const borderColor =
              p.status.status === "Waiting"
                ? "orange"
                : p.status.status === "Confirmed"
                ? "green"
                : p.status.status === "Closed"
                ? "red"
                : "grey";
            return {
              // appointment.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
              title: p?.treatment_type
                ? p?.treatment_type?.title
                : p?.appointment_type?.title,
              start:
                p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                  ? moment(
                      `${p.date} ${p.slots["start-time"]}`,
                      '"DD-MM-YYYY" HH:mm'
                    ).format("YYYY-MM-DD HH:mm")
                  : moment(
                      `${p.date} ${p.slots["start-time"]}`,
                      "YYYY-MM-DD HH:mm"
                    ).format("YYYY-MM-DD HH:mm"),
              end:
                p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                  ? moment(
                      `${p.date} ${p.slots["end-time"]}`,
                      "DD-MM-YYYY HH:mm"
                    ).format("YYYY-MM-DD HH:mm")
                  : moment(
                      `${p.date} ${p.slots["end-time"]}`,
                      "YYYY-MM-DD HH:mm"
                    ).format("YYYY-MM-DD HH:mm"),
              // start: moment(`${p.date} ${p.slots['start-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm') ,
              // end: moment(`${p.date} ${p.slots['end-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
              display: "block",
              borderColor,
              color,
              // start: '2022-06-02 17:30:00',
              // end: '2022-06-03 21:30:00'
            };
          });
          // 23-06-2022 14:50 //

          Object.assign(this.calendarOptions, {
            ...this.calendarOptions,
            events: events,
          });

          console.log("Events", this.calendarOptions.events);
        });
        // .catch((err) => console.log(err))
      } catch (error) {
        console.log("try catch");
        console.log(error);
      }
    },
    async getUpcomingAppointmentonly() {
      this.loadingupcoming = true;

      try {
        await this.$store.dispatch(
          "allappointments/FetchUpcomingAppointments",
          {}
        );
        const myupcomingappointments =
          this.$store?.state?.allappointments?.patientUpcomingAppointments;
        console.log("store upcoming appointments", myupcomingappointments);
      this.upcomingonly = myupcomingappointments;
      this.upcomingappointmentsCount=this.upcomingonly.length
        // axios.post('patients/appointments/upcoming', {}).then((res) => {
        //   this.loading = false
        // if (res?.data?.error === 'Token is Invalid') {
        //   console.log('pppppppppp')
        //   this.$store.dispatch('auth/logout')
        //   this.$router.push('/login')
        // }

        // this.upcomingonly = res.data.payload
        // })
        
      } catch (error) {
        // this.loadingupcoming = false;
        console.log("try catch error error", error);
        console.log(error);
      }
      this.loadingupcoming = false;
    },
    // Getting All inbox
    getInbox() {
      this.loading = true;
      const userId = localStorage.getItem("userID");

      const data = {
        patientId: userId,
      };
      axios

        .post("v2/mails/notification", data)
        .then((res) => {
          this.loading = false;

          this.inbox = res.data.payload;
          console.log("inboxdash", this.inbox[0]);
          const notify = res.data.payload.flat();
          this.notificationclientemails = notify.slice(0, 5);

          Object.assign(this.notificationclientemails, notify.slice(0, 5));
        })
        .catch(function (err) {
          console.log("expired session error new");
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.flip-clock {
  text-align: left !important;
}
</style>