<template>
  <TransitionRoot as="template" :show="open">
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
              class="relative bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full"
            >
              <!-- modal header -->
              <div class="px-3 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b">
                  <h3 class="text-xl font-bold font-sans text-yellow-650 pb-3">
                    {{ appointment?.treatment_type?.code }} -
                    {{
                    appointment?.treatment_type?.title || appointment?.appointment_type?.title ||
                    (translation('Common Phrases',621) ?? "No appointment title " )

                    
                    }}
                    
                  </h3>
                  <button
                    type="button"
                    id="closeAppoitmentModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-yellow-650 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                      :class="!appointment?.status?.status && 'text-yellow-650'"
                    >
                      {{
                      appointment?.status?.status ||
                      (translation('Common Phrases',623) ?? "No status")
                      }}
                    </h5>
                  </div>
                  <div class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max">
                    <h5 class="text-gray-800 font-sans font-medium">
                      {{ translation('Common Phrases',66) ?? "Time " }} - (
                      {{
                      appointment.slots[0]["start-time"] ||
                      (translation('Common Phrases',624) ?? "No start time")
                      }}
                      -
                      {{
                      appointment.slots[0]["end-time"] ||
                      (
                        translation('Common Phrases',625) ?? "No end time " )
                      }})
                    </h5>
                  </div>
                  <div class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max">
                    <h5 class="text-gray-800 font-sans font-medium">
                     <span>{{
                        translation('Common Phrases',627) ?? "Creation Source " 
                      }}-</span> 
                    </h5>
                    <h5 class="font-sans font-normal text-sm">
                      {{
                      appointment?.source?.source ||
                      (translation('Common Phrases',630) ?? "No creation source") 
                     
                      }}
                    </h5>
                  </div>
                </div>

                <!-- columns -->
                <div class="grid grid-cols-12 gap-6 z-50">
                  <!-- first column -->
                  <div class="col-span-6 2xl:col-span-6">
                    <!-- patient -->
                    <div class="flex flex-col pt-2">
                      <h5
                        class="text-gray-800 font-sans font-bold"
                      >{{ 
                      translation('Common Phrases',631) ?? "Patient Name"
                      }}</h5>
                      <!-- {{patient}} -->
                      <h5 class="text-gray-800 font-sans font-normal" v-if="appointment?.patient?.first_name  ">
                        {{ appointment?.patient?.first_name + " "
                        }}{{
                        appointment?.patient?.middle_name  ? patient?.middle_name : " " + " "
                        }}{{ " " + appointment?.patient?.last_name }}
                      </h5>
                      <span
                      v-else
                        class="text-yellow-650 font-normal text-sm"
                      >
                        {{
                        appointment.material_name ||
                        (  translation('Common Phrases',648) ?? "No name set" ) 
                      
                        }}
                      </span>
                    </div>
                    <!-- appointment type -->
                    <div
                      id="appointmenttype"
                      class="text-gray-800 font-sans font-bold flex flex-col mt-2"
                    >
                      {{
                        translation('Common Phrases',21) ?? "Appointment Type"
                      }}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="
                        !appointment?.appointment_type?.title &&
                        'text-yellow-650'
                      "
                      >
                        {{
                        appointment?.treatment_type?.title ||
                        (
                          translation('Common Phrases',621) ?? "No appointment title"
                          )
                        }}
                      </span>
                    </div>
                    <!-- serving time -->
                    <div
                      id="servingtime"
                      class="text-gray-800 font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        translation('Common Phrases',643) ?? "Serving Time" 
                         }}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="!appointment.servingtime && 'text-yellow-650'"
                      >{{ appointment?.servingtime ||
                      (  translation('Common Phrases',937) ?? "No Serving Time Set" )
                      
                      }}</span>
                    </div>
                    <!-- material name -->
                    <div id="material" class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                      {{ 
                        (  translation('Common Phrases',647) ?? "Material Name" ) }}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="!appointment.material_name && 'text-yellow-650'"
                      >
                        {{
                        appointment.material_name ||
                        (  translation('Common Phrases',648) ?? "No Material Name " ) 
                      
                        }}
                      </span>
                    </div>
                    <!-- doctors -->
                    <div id="doctors" class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                      {{ 
                        (  translation('Common Phrases',80) ?? "Doctors" ) 
                       }}
                      <ul class="list-disc">
                        <li
                          class="text-gray-700 font-sans font-normal text-sm"
                          :class="!appointment?.employees && 'text-yellow-650'"
                          v-for="doctor in appointment.employees"
                          :key="doctor"
                        >
                          -
                          {{
                          doctor?.first_name ||
                          (  translation('Common Phrases',638) ?? "No doctors" ) 
                       
                          }}
                          {{
                          doctor?.last_name ||
                          (  translation('Common Phrases',638) ?? "No doctors" ) 
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- last column -->
                  <div class="col-span-6 2xl:col-span-6">
                    <!-- date -->
                    <div id="date" class="text-gray-800 font-sans font-bold flex flex-col">
                      {{ 
                        (  translation('Common Phrases',550) ?? "Due Date" )  }}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="!appointment.date && 'text-yellow-650'"
                      >
                        {{
                        appointment.date ||
                        (  translation('Common Phrases',635) ?? "No date set" )
                        }}
                      </span>
                    </div>
                    <!-- interval -->
                    <div id="interval" class="text-gray-800 font-sans font-bold flex flex-col mt-2">

                      {{ 
                        (  translation('Common Phrases',370) ?? "Interval" )}}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="!appointment.interval && 'text-yellow-650'"
                      >
                        {{
                        appointment.interval ||
                        (  translation('Common Phrases',638) ?? "No Interval" )
                        }}
                        {{ 
                          (  translation('Common Phrases',640) ?? "minutes" )
                         }}
                      </span>
                    </div>
                    <!-- checking time -->
                    <div
                      id="checkintime"
                      class="text-gray-800 font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        (  translation('Common Phrases',218) ?? "Checkin Time" )
                        }}
                      <span
                        class="text-gray-700 font-normal text-sm"
                        :class="!appointment.checkin_time && 'text-yellow-650'"
                      >{{ appointment?.checkin_time || 
                        (  translation('Common Phrases',946) ?? "No Check In Time Set" )
                    }}</span>
                    </div>
                    <!-- procedure -->
                    <div
                      id="procedures"
                      class="text-gray-800 font-sans font-bold flex flex-col mt-2"
                    >
                      {{ 
                        (  translation('Common Phrases',269) ?? "Procedures" )
                         }}
                      <ul class="list-disc">
                        <h5
                          class="text-yellow-650 font-normal text-sm"
                          v-if="!appointment?.treatment_type"
                        >{{ 
                          (  translation('Common Phrases',649) ?? "No procedures" )
                         }}</h5>
                        <h5
                          class="text-yellow-650 font-normal text-sm"
                          v-else-if="
                          appointment?.treatment_type?.procedures?.length <= 0
                        "
                        >{{ 
                          (  translation('Common Phrases',649) ?? "No procedures" )
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
                        class="text-gray-800 font-sans font-bold"
                      >{{ 
                        (  translation('Common Phrases',133) ?? "Comments" )
                      }}</h5>
                      <h5
                        class="font-sans font-normal text-sm"
                        :class="!appointment.comments && 'text-yellow-650'"
                      >
                        {{
                        appointment.comments ||
                        (  translation('Common Phrases',634) ?? "No comments" )
                       
                        }}
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-x-3 gap-y-2 pb-2 border-b"></div>
                <div class="flex items-center w-full justify-start space-x-4 mt-4">
                  <Button
                  :label="translation('Common Phrases', 42)  ?? 'Cancel'"
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
import customAxios from "./../../../axios";
export default defineComponent({
  name: "TreatmentModal;",
  props: {
    appointment: Object
  },
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot
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

      customAxios(config).then(response => {
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
    const translation = inject("translation");

    return {
      translation
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
