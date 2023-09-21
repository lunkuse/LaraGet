<template>
    <div class="grid-cols-12 ">
      <div class="col-span-12 lg:col-span-6 md:col-span-3    col-span-12 2xl:col-span-6">
        <div class=" rounded-sm dark:bg-gray-800">
         
          <span
            v-if="loading"
            class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
          >
            <LoadingIcon icon="oval" class="w-10 h-10" />
            <span> <p >{{
                                  $t("translation.loading_text")
                                }}</p>
                      </span>
          </span>
  
          <div class="scrollbar-hidden intro-y" v-if="!loading">
            <ul
              class="divide-y divide-gray-200 dark:divide-gray-800 mt-4"
              v-if="allquestions.length > 0 && !loading"
            >
              <div v-for="(data, index) in allquestions" :key="index">
                <div
                  class="accordion__header hover:bg-white dark:bg-gray-800 items-center flex items-center justify-between w-full rounded bg-theme-46 dark:bg-gray-900 dark:is-active:bg-gray-900 text-xs is-active:bg-white hover:bg-white"
                  :class="{ 'is-active': index == activeTab }"
                  :id="data.id"
                  @click="toggleAccordion(index)"
                >
                
                  <p class="font-bold pr-4">
                    <span>Date:</span>
                    {{ data.date }}
                  </p>
                  <p class="font-bold pr-4">
                    
                    <span >Approval Status:</span>
                    {{ data.approved}}
                  </p>
                  <p class="font-bold pr-4">
                   
                    <span >Approved By:</span>
                    {{ data.approved_by?  data.approved_by: "not yet approved"}}
                  </p>
                  <p class="font-bold pr-4">
                 
                    <span >Approved At:</span>
                    {{ data.approved_at ?  data.approved_at : "not yet approved"}}
                  </p>
                  
                  <!-- <p v-if="index !== activeTab" class="pr-2">{{ data.date }}</p> -->
                  <i
                    class="accordion__toggle bg-black dark:bg-white before:bg-black dark:before:bg-white"
                  ></i>
                </div>
                <div class="accordion__body" :class="{ 'is-active': index == activeTab }">
                 
                  
                  <div class="">
    <div >
      <!-- first -->
      <div id="intake_questions" class="col-span-12 2xl:col-span-6">
        <div
          class="p-2 rounded-sm"
          v-for="(q, index) in data.questions.slice(0,15)"
          :key="q.no"
          :class="{'bg-gray-200 dark:bg-gray-800': index % 2 == 0}"
        >
          <h5
            class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
          >{{ q.no }} {{ q.question }}</h5>
          <form class="flex items-center p-2">
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
            >
              Yes
              <input type="radio" :name="q.no" value="true" v-model="q.status" :disabled="toggle"/>
            </label>
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
            >
              No
              <input type="radio" :name="q.no" value="false" v-model="q.status" :disabled="toggle"/>
            </label>
          </form>
          <div v-if="q.status == 'true'">
            <div class="gap-2 ml-3" v-for="other in q.others" :key="other.no">
              <h5
                class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
              >{{ other.no }} {{ other.question }}</h5>
              <div class="flex items-center pl-4 pt-2">
                <label
                  class="font-sans text-gray-800 dark:text-white dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
                >
                  Yes
                  <input type="radio" :name="other.no" value="true" v-model="other.status" :disabled="toggle"/>
                </label>
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
                >
                  No
                  <input type="radio" :name="other.no" value="false" v-model="other.status" :disabled="toggle"/>
                </label>
              </div>
              <div v-if="other.status == 'true' && other.sub">
                <h5
                  class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
                >{{ other.sub.no }} {{ other.sub.question }}</h5>
                <div class="flex items-center pt-2 pb-2">
                  <label
                    class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 w-full input-disabled"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :name="other.sub.no"
                      v-model="other.sub.value"
                      :disabled="toggle"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2"></div>
        </div>
      </div>

      <!-- second -->
      <div id="intake_questions_2" class="col-span-12 2xl:col-span-6">
        <div
          class="p-2 rounded-sm"
          v-for="(q, index) in data.questions.slice(-15)"
          :key="q.no"
          :class="{'bg-gray-200 dark:bg-gray-800 dark:text-white': index % 2 !== 0}"
        >
          <h5
            class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
          >{{ q.no }} {{ q.question }}</h5>
          <form class="flex items-center p-2">
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
            >
              Yes
              <input type="radio" :name="q.no" value="true" v-model="q.status" :disabled="toggle"/>
            </label>
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
            >
              No
              <input type="radio" :name="q.no" value="false" v-model="q.status" :disabled="toggle"/>
            </label>
          </form>
          <div v-if="q.status == 'true'">
            <div class="gap-2 ml-3" v-for="other in q.others" :key="other.no">
              <h5
                class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
              >{{ other.no }} {{ other.question }}</h5>
              <div class="flex items-center pl-4 pt-2">
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
                >
                  Yes
                  <input type="radio" :name="other.no" value="true" v-model="other.status" :disabled="toggle"/>
                </label>
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
                >
                  No
                  <input type="radio" :name="other.no" value="false" v-model="other.status" :disabled="toggle"/>
                </label>
              </div>
              <div v-if="other.status == 'true' && other.sub">
                <h5
                  class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
                >{{ other.sub.no }} {{ other.sub.question }}</h5>
                <div class="flex items-center pt-2 pb-2">
                  <label
                    class="font-sans  dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 w-full input-disabled"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :name="other.sub.no"
                      v-model="other.sub.value"
                      :disabled="toggle"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2"></div>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto justify-center mt-4"
      style="display: flex;
      align-items: center; text-align: center;"
      v-if="saveStatus"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          style="background-color: #FF2400;"
          type="reset"
          data-dismiss="modal"
          class="btn closeBTN btn-danger w-40 mr-auto bg-theme-43 text-white"
        >
          <p class>Cancel</p>
        </button>

        <!-- <button
                            type="reset"
                            class="btn clearBTN bg-theme-32  w-40 mr-auto text-white"
        >Clear</button>-->
        <button type="submit" class="btn bg-theme-32 w-40 mr-auto text-white" @click="saveHistory">
          <LoadingIcon v-if="loading" icon="spinning-circles" color="white" class="w-4 h-4 ml-2" />
          <p data-dismiss="modal" class="text-white" v-else>Save</p>
        </button>
      </div>
    </div>
  </div>
                 
                 
                </div>
              </div>
            </ul>
         
        
          <!-- <div
            v-if="allquestions.length === 0 "
            class="w-full h-96 flex flex-col items-center justify-center text-black text-sm"
          >
            <img src="@/assets/images/nodata.svg" class="h-48 w-48" alt="no appointments" />
            <p class="text-black dark:text-white">No history yet.</p>
          </div> -->
           </div>
        </div>
      </div>
    </div>
  </template>
  
  <script >
  import { defineComponent, onMounted, ref, inject } from 'vue'
  import moment from 'moment'
  import axios from 'axios'
  import router from '../../router'
  export default defineComponent({
    setup() {
      const treatments = ref([])
      const allquestions = ref([])
      const activeTab = ref()
      const loading = ref(true)
      const loadingTreatments = ref(true)
      const translations = inject('translation_v3')
      const toggleAccordion = tab => {
        if (activeTab.value === tab) {
          activeTab.value = null
          return
        }
        activeTab.value = tab
      }
  
      onMounted(() => {
        console.log('component created')
       
        const token = localStorage.getItem('token')
        loading.value = true
     axios
       .post('patients/history/all', {}, {
         headers: {
           Authorization: 'Bearer ' + token,
           'Content-Type': 'application/json',
           Accept: 'application/json'
         }
       })
       .then(response => {
        loading.value = false
         if (response.data.status == true) {
           const resdata=response.data.payload
          
           allquestions.value=resdata
           console.log('history response url', allquestions.value)
          
         } else {
          
         }

         console.log('response', response)
       })
       .catch(error => {
         console.log('Error', error)
      
       })




  
        const userId = localStorage.getItem('userID')








    
        
      })
      return {
       
        toggleAccordion,
        activeTab,
        loading,
        translations,
        allquestions
      }
    }
  })
  </script>
  
  <style scoped lang="scss">
  .accordion__header {
    padding: 1em;
    background-color: #fff;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  
  .accordion__header > * {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;
  }
  
  .accordion__header.is-active {
    background-color: #d1d5db;
  }
  
  .accordion__header:hover {
    background-color: #d1d5db;
  }
  
  .accordion__toggle {
    margin-left: 10px;
    height: 3px;
    background-color: #222;
    width: 13px;
    display: block;
    position: relative;
    flex-shrink: 1;
    border-radius: 2px;
  }
  
  .accordion__toggle::before {
    content: '';
    width: 3px;
    height: 13px;
    display: block;
    background-color: #222;
    position: absolute;
    top: -5px;
    left: 5px;
    border-radius: 2px;
  }
  
  .date__hint {
    position: relative;
    margin-left: 30px;
    display: block;
  }
  
  .is-active .accordion__toggle::before {
    display: none;
  }
  
  .accordion__body {
    display: none;
    padding: 1em;
    border: 1px solid #ccc;
    border-top: 0;
  }
  
  .accordion__body.is-active {
    display: block;
  }
  input[type="radio"]:disabled {
    -webkit-appearance: none;
    display: inline-block;
    width: 12px;
    height: 12px;
    padding: 2px;
    background-clip: content-box;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 50%;
}

input[type="radio"]:checked {
    background-color: 	#007bff;
     border: 1px solid 	#007bff;
}
  </style>
  