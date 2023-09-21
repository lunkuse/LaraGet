
import AppointmentService from "../service/appointments-service";
import {useStore} from "vuex";
const initialState = []
const initialUpcomingAppointmentsState = []

export const allappointments = {
  namespaced: true,
  state: {
    patientAppointments: initialState,
    patientUpcomingAppointments: initialUpcomingAppointmentsState,
    
   
  },
  actions: {
    // get all appointments
    async FetchAppointments({ commit }, {url, data, cancelToken}) {
  const res = await AppointmentService.fetchAppointments(url, data, cancelToken);
   commit("SET_PATIENT_APPOINTMENTS", res?.data);
    },
 // get upcoming appointments
 async FetchUpcomingAppointments({ commit }, {}) {
  

  console.log('entered upcoming appointment store')
    
     const res = await AppointmentService.fetchUpcomingAppointments();
    
     commit("SET_UPCOMING_APPOINTMENTS", res?.data);
   },
   
  },
  mutations: {
    SET_PATIENT_APPOINTMENTS: (state, payload) => {
      
      state.patientAppointments = payload;
      
    },
    SET_UPCOMING_APPOINTMENTS: (state, payload) => {
      
      state.patientUpcomingAppointments = payload;
      console.log("seting upcoming Appointments ",state.patientUpcomingAppointments);
    }
  },
};
// fetchUpcomingAppointments