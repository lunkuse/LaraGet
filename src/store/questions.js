import PatientsService from "../service/patients.service";
import AppointmentService from "../service/appointments-service";
import {useStore} from "vuex";
const initialState = []

export const allquestions = {
  namespaced: true,
  state: {
    patientQuestions: initialState,
    patientAppointmentQuestions:[],
    questionsLoader:false
  },
  actions: {
    async patientsFetchQuestions({ commit }, id) {
      const store = useStore()
const newpatientId =  store.state.auth?.user?.id;
      console.log('newpatientId',newpatientId)
      const url = "/v2/answers/answer_with_appointment";
      const res = await PatientsService.fetchQuestions(url, parseInt(newpatientId));
      console.log("The patients questions are", res?.data);
      commit("SET_PATIENT_QUESTIONS", res?.data);
    },

    async FetchAppointmentsWithQuestions({ commit }, id) {
      const url = "patients/appointments/appointments-with-anamnese";
      const res = await AppointmentService.appointments_with_anamnese(url);
      console.log("The patients questions with appointments are", res?.data);
      commit("SET_APPOINTMENTS_QUESTIONS", res?.data);
    },
  },
  mutations: {
    SET_PATIENT_QUESTIONS: (state, payload) => {
      
      state.patientQuestions = payload;
      console.log("seting questions are",state.patientQuestions);
    },
    SET_APPOINTMENTS_QUESTIONS: (state, payload) => {
      
      state.patientAppointmentQuestions = payload;
      console.log("patientAppointmentQuestions",state.patientAppointmentQuestions);
    },

    logoutQuestions(state) {
      state.patientQuestions = []
      state.patientAppointmentQuestions = [];
    
    },
  },
};
