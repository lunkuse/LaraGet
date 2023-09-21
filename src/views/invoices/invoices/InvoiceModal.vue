<template>
  <TransitionRoot as="template" :show="open" class="bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full"
            >
              <!-- modal header -->
              <div class="px-3 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b">
                  <h3 class="text-xl font-bold font-sans text-theme-1 text-white    pb-3">
                    {{ appointment?.treatment_type?.code }} -
                    {{
                    appointment?.treatment_type?.title || appointment?.appointment_type?.title ||
                    (translations?.no_appointment_title_text ?? "No appointment title " )

                    
                    }}
                    
                  </h3>
                  <button
                    type="button"
                    id="closeAppoitmentModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-theme-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="defaultModal"
                    @click="$emit('close')"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- modal content -->
              <div class="p-3 space-y-2">
                <!-- status, duration, source -->
                <div class="flex space-x-2 items-center">
                  <div class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max">
                    <div
                      class="h-4 w-4 rounded-full"
                      :class="{
                        'bg-success': appointment?.status_id === 1,
                        'bg-blue-500': appointment?.status_id === 2,
                        'bg-yellow-650': appointment?.status_id === 3,
                        'bg-gray-400': appointment?.status_id === 4,
                        'bg-gray-800': appointment?.status_id === 5,
                        'bg-red-500': appointment?.status_id === 6,
                        'bg-green-500': appointment?.status_id === 7,
                      }"
                    ></div>
                    <h5
                      class="font-sans font-normal text-sm"
                      :class="!appointment?.status?.status && 'text-theme-1'"
                    >
                      {{
                      appointment?.status?.status ||
                      (translations?.no_status_text ?? "No status")
                      }}
                    </h5>
                  </div>
                  <div class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max">
                    <h5 class="text-gray-800 dark:text-white  font-sans font-medium">
                      {{ translations?.time_text ?? "Time " }} - (
                      {{
                      appointment.slots[0]["start-time"] ||
                      (translations?.no_start_time_text ?? "No start time")
                      }}
                      -
                      {{
                      appointment.slots[0]["end-time"] ||
                      (
                        translations?.no_end_time_text ?? "No end time " )
                      }})
                    </h5>
                  </div>
                  <div class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max">
                    <h5 class="text-gray-800 dark:text-white  font-sans font-medium">
                     <span>{{
                      translations?.creation_source_text ?? "Creation Source " 
                      }}-</span> 
                    </h5>
                    <h5 class="font-sans font-normal text-sm">
                      {{
                      appointment?.source?.source ||
                      (translations?.no_creation_source_text ?? "No creation source") 
                     
                      }}
                    </h5>
                  </div>
                </div>

                <!-- columns -->
                <div class="grid grid-cols-12 gap-6 z-50">
                  <!-- first column -->
                  <div class="col-span-6 2xl:col-span-6">
                
                    <!-- appointment type -->
                    <div
                      id="appointmenttype"
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{
                        translations?.appointment_type_text ?? "Appointment Type"
                      }}
                      <span
                        class="text-gray-700 dark:text-white  font-normal text-sm"
                        :class="
                        !appointment?.appointment_type?.title &&
                        'text-theme-1'
                      "
                      >
                        {{
                        appointment?.treatment_type?.title ||
                        (
                          translations?.no_appointment_title_text ?? "No appointment title"
                          )
                        }}
                      </span>
                    </div>
                    <!-- serving time -->
                    <div
                      id="servingtime"
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        translations?.serving_time_text ?? "Serving Time" 
                         }}
                      <span
                        class="text-gray-700 dark:text-white  font-normal text-sm"
                        :class="!appointment.servingtime && 'text-theme-1'"
                      >{{ appointment?.servingtime ||
                      ( translations?.no_serving_time_set_text ?? "No Serving Time Set" )
                      
                      }}</span>
                    </div>
                    <!-- material name -->
                    <div id="material" class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2">
                      {{ 
                        (  translations?.material_name_text ?? "Material Name" ) }}
                      <span
                        class="text-gray-700 dark:text-white  font-normal text-sm"
                        :class="!appointment.material_name && 'text-theme-1'"
                      >
                        {{
                        appointment.material_name ||
                        (  translations?.no_material_name_text ?? "No Material Name " ) 
                      
                        }}
                      </span>
                    </div>
                    <!-- doctors -->
                    <div id="doctors" class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2">
                      {{ 
                        (  translations?.doctors_text ?? "Doctors" ) 
                       }}
                     
                      <ul class="list-disc">

                        <li
                          class="text-gray-700 dark:text-white  font-sans font-normal text-sm"
                          :class="!appointment?.employees && 'text-theme-1'"
                          v-for="doctor in appointment?.employees"
                          :key="doctor"
                        >
                          -
                          {{
                          doctor?.first_name ||
                          (  translations?.no_doctors_text ?? "No doctors" ) 
                       
                          }}
                          {{
                          doctor?.last_name ||
                          (  translations?.no_doctors_text ?? "No doctors" ) 
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- last column -->
                  <div class="col-span-6 2xl:col-span-6">
                    <!-- date -->
                    <div id="date" class="text-gray-800 dark:text-white font-sans font-bold flex flex-col">
                      {{ 
                        (   translations?.due_date_text ?? "Due Date" )  }}
                      <span
                        class="text-gray-700 dark:text-white  font-normal text-sm"
                        :class="!appointment.date && 'text-theme-1'"
                      >
                        {{
                        appointment.date ||
                        ( translations?.no_date_set_text ?? "No date set" )
                        }}
                      </span>
                    </div>
                    <!-- interval -->
                    <div id="interval" class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2">

                      {{ 
                        (  translations?.interval_text ?? "Interval" )}}
                      <span
                        class="text-gray-700 dark:text-gray-200  font-normal text-sm"
                        :class="!appointment.interval && 'text-theme-1'"
                      >
                        {{
                        appointment.interval ||
                        (  translations?.no_interval_text ?? "No Interval" )
                        }}
                        {{ 
                          (  translations?.minutes_text ?? "minutes" )
                         }}
                      </span>
                    </div>
                    <!-- checking time -->
                    <div
                      id="checkintime"
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        ( translations?.checkin_time_text ?? "Checkin Time" )
                        }}
                      <span
                        class="text-gray-700 dark:text-white  font-normal text-sm"
                        :class="!appointment.checkin_time && 'text-theme-1'"
                      >{{ appointment?.checkin_time || 
                        ( translations?.no_checkin_time_set_text ?? "No CheckIn Time Set" )
                    }}</span>
                    </div>
                    <!-- procedure -->
                    <div
                      id="procedures"
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        (  translations?.procedures_text ?? "Procedures" )
                         }}
                      <ul class="list-disc">
                        <h5
                          class="text-theme-1 font-normal text-sm"
                          v-if="!appointment?.treatment_type"
                        >{{ 
                          (   translations?.no_procedures_text ?? "No procedures" )
                         }}</h5>
                        <h5
                          class="text-theme-1 font-normal text-sm"
                          v-else-if="
                          appointment?.treatment_type?.procedures?.length <= 0
                        "
                        >{{ 
                          (   translations?.no_procedures_text ?? "No procedures" )
                         }}</h5>
                        <li
                          class="text-gray-700 font-sans font-normal text-sm"
                          v-else
                          v-for="procedure in appointment?.treatment_type
                          ?.procedures"
                          :key="procedure.id"
                        >{{ procedure[0]?.name }}</li>
                      </ul>
                    </div>
                    <!-- comments -->
                    <div class="flex flex-col mt-2">
                      <h5
                        class="text-gray-800 dark:text-white font-sans font-bold"
                      >{{ 
                        (translations?.comments_text ?? "Comments" )
                      }}</h5>
                      <h5
                        class="font-sans font-normal text-sm"
                        :class="!appointment.comments && 'text-theme-1'"
                      >
                        {{
                        appointment.comments ||
                        (  translations?.no_comments_text ?? "No comments" )
                       
                        }}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-x-3 gap-y-2 pb-2 border-b"></div>
                <div class="flex items-center w-full justify-start space-x-4 mt-4">
            
                  <Button
                  :label="translations?.cancel_text ?? 'Cancel'"
                    :cancel="true"
                    :transparent="true"
                    @click="$emit('close')"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
// import { ref } from "vue";
import { defineComponent, ref, inject } from "@vue/runtime-core";
// import getPatientsemployees from "../../../../composables/employeesTab";
// import patientInfoFunctionality from '../../../../composables/patientProfile';
import Button from "@/components/shared/buttons/Button.vue"
import axios from "axios";
export default defineComponent({
  name: "EmployeeModal;",
  props: {
    appointment: Object
  },
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Button 
  },
  data() {
    return {
      open: true
    };
  },
  methods: {
    async exportDataTable() {
      let appointments = [];

      appointments.push(this.employee?.id);

      return appointments;
    },
    async printSingleEmployee() {
      console.log("single employee print");
      const employees2 = await this.exportDataTable();
      const config = {
        url: "/v2/employees/download-pdf-single",
        method: "get",
        responseType: "blob",
        params: {
          employees: JSON.stringify(employees2)
        }
      };

      axios(config).then(response => {
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
    }
  },
  setup() {
    
    const translations = inject("translation_v3");
    return {
      translations
    };
  }
});


// const { patient, getDoctor } = [];
// // eslint-disable-next-line no-undef
// const props = defineProps({
//   employee: Object
// });
// const open = ref(true);
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
