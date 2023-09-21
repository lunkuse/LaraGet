
import TreatmentService from "../service/treatment-service";
const initialState = []

export const treatment  = {
  namespaced: true,
  state: {
    patientTreatments: initialState,

  },
  actions: {
    async patientsFetch({ commit }, id) {
      const url = "v1/donetreatments/get_done_treatments_by_patient";
      const data = {
        patientId: id
      }
      const res = await TreatmentService.fetchTreatments(url, data);
      console.log("The patients questions are", res?.data);
      commit("SET_PATIENT_TREATMENTS", res?.data);
    },

  },
  mutations: {
    SET_PATIENT_TREATMENTS: (state, payload) => {
      
      state.patientTreatments = payload;
      console.log("seting treatments are",state.patientTreatments);
    },
  
  },
};
