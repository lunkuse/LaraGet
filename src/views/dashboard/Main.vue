<template>
  <div>
    <div>
      <div class="content">
        <div class="col-span-12 2xl:col-span-9">
          <!-- first column -->

          <div class="grid grid-cols-12 gap-6">
            <!-- tabs -->
            <div class="col-span-12 grid grid-cols-12 gap-6">
              <!-- products -->
              <router-link
                to="/allproducts"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-43 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        Products
                        <!-- {{ $t("translation.manage_your_appointments") }} -->
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

              <!-- orders -->
              <router-link
                to="/allorders"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-44 border-r-4"
              >
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        Orders
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


                <!-- invoices -->
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
                       Invoices
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

              <!-- order types -->
              <!-- <router-link
                to="/dashboard/communication"
                class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y zoom-in rounded-2xl border-theme-43 border-r-4"
              > -->
                <div
                  class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y rounded-2xl"
                >
                  <div class="box p-5 zoom-in rounded-2xl">
                    <div class="flex">
                      <div class="text-lg font-medium truncate mr-3">
                        <!-- {{ $t("translation.communicate_to_your_doctor") }} -->
                        Product Types
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
              <!-- </router-link> -->
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-6 hidden">
          <div class="col-span-12 2xl:col-span-9">
            <!-- first column -->

            <div class="grid grid-cols-12 gap-6">
              <!-- added -->
              <!-- BEGIN: Calender Component -->

              <!-- upcoming installments -->
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
                          Upcoming Installments
                          <!-- {{ $t("translation.upcoming_appointments_text") }} -->
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
                              <div class="box px-5 py-2 ml-1 flex-1 zoom-in">
                                <div class="flex items-center">
                                  <div class="font-medium truncate ...">
                                    <h5
                                      class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                                    >
                                      title
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
                                  title
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
  </div>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
// import axios from 'axios'
import axios from "../../axios";
import moment from "moment";
import nl from "moment/locale/nl";
import router from "../../router";

import Avatar from "@/components/avatar/Avatar.vue";
import { useI18n } from "vue-i18n";

import { useStore } from "vuex";
import { EyeIcon } from "@heroicons/vue/outline";
export default defineComponent({
  components: {
    Avatar,
    EyeIcon,
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

    return {
      t,
    };
  },
  computed: {},
  created() {
    console.log("on dashboard");
    // moment.updateLocale("nl");
  },
  mounted() {
    this.datetoday = new Date();
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.flip-clock {
  text-align: left !important;
}
</style>