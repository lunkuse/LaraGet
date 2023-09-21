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
 * ---------   },
 *             treatments: [
 *              {
 *                treatmentCode: E650,
                  treatmentPrice: 150,
                  technicalCost: 30,
                  treatmentComplete: 0,
                  generalRemark: 'Phase 1',
                  treatmentType: ['Restoration'/'Endodontic'/etc...]
                  paymentStatus: 0
 *              },
 *             ]
 * ---------  },
*/

/* eslint-disable import/prefer-default-export */
import { watch, ref, provide, computed } from 'vue';
import { useStore } from 'vuex';
import useConstants from './constants';

export default function useCustomStore() {
  const vuexStore = useStore();

  const { age } = useConstants();

  const activeTooth = ref(11);

  const selectedTeeth = ref([]);

  const chartView = ref(false);

  const activeSummaryType = ref(1);

  const historySelected = ref(false);

  const loading = ref(true);

  const activeTreatment = computed(() => vuexStore.state.treatments.activeTreatment);

  const updateActiveTooth = (newValue) => activeTooth.value = newValue;

  const updateChartView = (newValue) => chartView.value = newValue;

  const updateActiveSummaryType = (newValue) => activeSummaryType.value = newValue;

  const updateHistorySelected = (newValue) => historySelected.value = newValue;

  const updateLoadingState = (newValue) => loading.value = newValue;

  const updateSelectedTeeth = (teeth) => selectedTeeth.value = teeth;

  // watch(activeTreatment.value, (newValue) => {
  //   const isActiveTreatmentSet = Object.keys(newValue).length !== 0;
  //   if (isActiveTreatmentSet) Object.assign(treatmentBlob.value, JSON.parse(newValue.tooth_sections));
  // })

  // const updateTreatmentBlob = () => {
  //   const isActiveTreatmentSet = Object.keys(activeTreatment.value).length !== 0;
  //   if (isActiveTreatmentSet) Object.assign(treatmentBlob.value, JSON.parse(activeTreatment.value.tooth_sections));
  //   // console.log(activeTreatment.value.tooth_sections);
  // }

  const missingTeeth = ref(age.value < 18 ? ['18', '17', '16', '28', '27', '26', '38', '37', '36', '48', '47', '46'] : [])

  const treatmentBlobResetValue = {
    missing: missingTeeth.value,
    generalTreatment: [],
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
  };

  
  const updateTreatmentBlob = () => {
    const blob = activeTreatment.value;
    // let newBlob = Object.create(treatmentBlobResetValue.value, treatmentBlobResetValue.value);
    if (Object.keys(blob).length !== 0) return JSON.parse(blob.tooth_sections);
    else return Object.assign(treatmentBlobResetValue, { missing: missingTeeth.value });
  }

  const treatmentBlob = ref(updateTreatmentBlob());

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
  provide('selectedTeeth', selectedTeeth);
  provide('updateSelectedTeeth', updateSelectedTeeth);

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
