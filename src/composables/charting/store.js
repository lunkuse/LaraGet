/**
 * treatmentBlob Structure
 *
 * ---------  missing: [11, 12, 23, 34, 48, 44, 23],
 * ---------
 * ---------  11: {
 * ---------   pathology: {
 * ---------     decay: [],
 * ---------     otherDecayValue: [],
 * ---------     fracture: true,
 * ---------     toothWear: true,
 * ---------     developmentDisorder: true,
 * ---------     apical: true,
 * ---------     discoloration: yellow / red / gray
 * ---------   },
 * ---------   periodontal: {
 * ---------     plaque: center,
 * ---------     bleeding: center,
 *               furcation: type 1,
 *               mobility: 1,
 *               implant: true or false,
 * ---------     probing: {
 *                  left: 0
 *                  center: 10
 *                  right: 4
 *               },
 * ---------     gingivalMargin: {
 *                  left: 0
 *                  center: 10
 *                  right: 4
 *               },
 * ---------   },
 * ---------   restoration: {
 * ---------     color / type
 * ---------     filling: [],
 * ---------   }
 * ---------  },
*/

/* eslint-disable import/prefer-default-export */
import { watch, ref, provide, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'

export default function useCustomStore() {
  const vuexStore = useStore();

  const activeTooth = ref(11);

  const chartView = ref(false);

  const activeSummaryType = ref(1);

  const historySelected = ref(false);

  const loading = ref(true);

  const activeTreatment = computed(
    
    () => 
    vuexStore.state?.patientsTreatments?.activeTreatment
  
    );

  const updateActiveTooth = (newValue) => activeTooth.value = newValue;

  const updateChartView = (newValue) => chartView.value = newValue;

  const updateActiveSummaryType = (newValue) => activeSummaryType.value = newValue;

  const updateHistorySelected = (newValue) => historySelected.value = newValue;

  const updateLoadingState = (newValue) => loading.value = newValue;

  // const updateTreatmentBlob = () => {
  //   const isActiveTreatmentSet = Object.keys(activeTreatment.value).length !== 0;
  //   if (isActiveTreatmentSet) Object.assign(treatmentBlob.value, JSON.parse(activeTreatment.value.tooth_sections));
  //   // console.log(activeTreatment.value.tooth_sections);
  // }

  const treatmentBlobResetValue = ref({
    missing: [],
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
    16: { isPrimary: true },
    17: { isPrimary: true },
    18: { isPrimary: true },
    21: {},
    22: {},
    23: {},
    24: {},
    25: {},
    26: { isPrimary: true },
    27: { isPrimary: true },
    28: { isPrimary: true },
    31: {},
    32: {},
    33: {},
    34: {},
    35: {},
    36: { isPrimary: true },
    37: { isPrimary: true },
    38: { isPrimary: true },
    41: {},
    42: {},
    43: {},
    44: {},
    45: {},
    46: { isPrimary: true },
    47: { isPrimary: true },
    48: { isPrimary: true },
  });

  const treatmentBlob = (Object.keys(activeTreatment?.value).length !== 0) ? ref(JSON.parse(activeTreatment?.value.tooth_sections)) : ref(treatmentBlobResetValue.value);

  const updateTreatmentBlob = (newValue) => {
    Object.assign(treatmentBlob.value, newValue);
    console.log('update happening');
  };

  watch(activeTreatment.value, (newValue) => {
    const isActiveTreatmentSet = Object.keys(newValue).length !== 0;
    if (isActiveTreatmentSet) Object.assign(treatmentBlob.value, JSON.parse(newValue.tooth_sections));
  });

  const resetTreatmentBlob = () => treatmentBlob.value = treatmentBlobResetValue.value;

  provide('treatmentBlob', treatmentBlob);
  provide('activeTooth', activeTooth);
  provide('updateActiveTooth', updateActiveTooth);
  provide('chartView', chartView);
  provide('updateChartView', updateChartView);
  provide('activeSummaryType', activeSummaryType);
  provide('updateActiveSummaryType', updateActiveSummaryType);
  provide('historySelected', historySelected);
  provide('updateHistorySelected', updateHistorySelected);
  provide('resetTreatmentBlob', resetTreatmentBlob);
  provide('updateLoadingState', updateLoadingState);
  provide('treatmentBlobResetValue', treatmentBlobResetValue);
  provide('updateTreatmentBlob', updateTreatmentBlob);

  return {
    treatmentBlob,
    chartView,
    treatmentBlobResetValue,
    updateActiveTooth,
    updateChartView,
    resetTreatmentBlob,
    updateLoadingState,
  };
}
