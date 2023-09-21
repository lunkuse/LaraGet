<template>
<div>
    
  <div class="grid grid-cols-7 gap-4 mt-3 mb-2">
    <div class="col-start-1 ml-4">
      <div class="font-semibold text-base text-yellow-650">Date</div>
    </div>
    <div class="col-start-2 col-span-5 ml-8">
      <div class="text-yellow-650 font-semibold text-base">Risk assesment history</div>
    </div>
    <div class="col-start-7">
      <div class="text-yellow-650 font-semibold text-base">By</div>
    </div>
  </div>
  <div class="justify-between" :class="{ flex: variant === 'horizontal' }">
    <ul
      class="tab-header justify-between place-items-start mr-2"
      :class="{ 'flex vertical-menu': variant === 'vertical' }"
    >
      <li
        v-for="(tab, index) in dentalInfoArr"
        :key="index"
        class="tab"
        :class="{
          active: index + 1 === activeTab,
          inactive: index + 1 !== activeTab,
        }"
      >
        <label
          :for="`${Date.now()}${index}`"
          class="tab"
          :class="{
            active: index + 1 === activeTab,
            inactive: index + 1 !== activeTab,
          }"
          v-text="tab.date"
        ></label>
        <input
          type="radio"
          :name="`${Date.now()}-tab`"
          :id="`${Date.now()}${index}`"
          :value="index + 1"
          v-model="activeTab"
          style="display: none"
        />
      </li>
    </ul>
    <template v-for="(details, index) in dentalInfoArr">
      <div :key="index" v-if="index + 1 === activeTab" class="tab-panel bg-gray-100 p-2 rounded-sm">
        <!-- {{ details }} -->
        <!-- <slot :name="`tabPanel-${index + 1}`" /> -->
        <DentalInfoComponent :info="details"/>
      </div>
    </template>
  </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import DentalInfoComponent from './DentalInfoComponent.vue';
import PatientsService from '@/service/patients.service';

export default defineComponent({
  components: {
    DentalInfoComponent,
  },
  props: {
    dentalInfoArr: {
      required: true,
    },
  },
 
  setup() {

    const activeTab = ref(1);
    const variant = ref('horizontal');
    const dentalInfoArr = ref([]);
    const getSlotName = (index) => `tabPanel-${index + 1}`;
   onMounted(() => {
    
      PatientsService.fetchDentalInformation().then((res) => {
        dentalInfoArr.value = res.data;
      });
      }
      );
    return {
      variant,
      activeTab,
    };
  }})
</script>

<style scoped>
.tab-header {
  list-style: none;
  text-align: center;
  overflow: auto;
  white-space: nowrap;
  padding: 3px;
  background: var(--primary);
  border-radius: 5px;
  margin-bottom: 30px;
}

.vertical-menu {
  align-items: center;
  margin-bottom: 6px;
}

.tab {
  width: 100%;
  padding: 3px 4px;
  cursor: pointer;
  border-radius: 5px;
}

.tab.active {
  width: 100%;
  background: var(--primary);
  color: white;
}

/* .tab & .inactive are in the same class attribute */
.tab.inactive {
  width: 100%;
  background: white;
  color: var(--primary);
}
/* .tab-body {
  padding: 5px 10px;
} */
.flex .tab-header {
  background: white;
  flex-basis: 15%;
}
/* .tab-panel is decendant of .flex */
.flex .tab-panel {
  flex-basis: 85%;
}
/*
.flex .tab-panel::not(.vertical-menu){
  flex-wrap: wrap;
} */
</style>
