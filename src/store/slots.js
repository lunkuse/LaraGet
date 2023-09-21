import AppointmentService from "../service/appointments-service";
const initialState = []


export const slots = {
    namespaced: true,
    state: {
      doctorSlots: initialState
    },
    actions: {
        async FetchSlots({ commit }, data) {
            console.log("data doctors slots are", data);
        const url = "/patients/appointments/free-slots";
        const res = await AppointmentService.fetchSlots(url, data);
        console.log("The doctors slots are", res?.data);
        commit("SET_SLOTS", res?.data);
      }
    },
    mutations: {
        SET_SLOTS: (state, payload) => {
        
        state.doctorSlots = payload;
      
      }
    },
  };
  