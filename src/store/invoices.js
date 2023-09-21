
import InvoiceService from "../service/invoices-service";
import {useStore} from "vuex";
const initialState = []
const initialSettings = []

export const allinvoices = {
  namespaced: true,
  state: {
    patientInvoices: initialState,
    systemsettings: initialSettings,
    
   
  },
  actions: {
    // get all appointments
    async FetchInvoices({ commit }, {url, data, cancelToken}) {
  const res = await InvoiceService.fetchInvoices(url, data, cancelToken);
   commit("SET_PATIENT_INVOICES", res?.data);
    },
 // get upcoming appointments
 async FetchSettings({ commit }, {}) {
  

  console.log('entered settings store')
    
     const res = await InvoiceService.fetchSettings();
    
     commit("SET_SYSTEM_SETTINGS", res?.data);
   },
   
  },
  mutations: {
    SET_PATIENT_INVOICES: (state, payload) => {
      
      state.patientInvoices = payload;
      
    },
    SET_SYSTEM_SETTINGS: (state, payload) => {
      
      state.systemsettings = payload;
      console.log("seting Sytem settings ",state.systemsettings);
    }
  },
};
// fetchUpcomingAppointments