import dataTablesDataTables from 'datatables.net-dt/js/dataTables.dataTables';
import axios from '../axios'
import { useLocalStorage } from './local-starage-service'

// import { useFetch } from "../utils";
// import { Appointment, Paginated, AppointmentType, Slot } from "../types";

export default class AppointmentsService {
  static async fetchAppointments(url, data, cancelToken) {
    console.log('service appointments url', url, data, cancelToken)
    try {

      const response = await axios
        .post(
          url,
          data,
          { cancelToken: cancelToken }
        )
      // let data = response.data;
      console.log('data response in service', response.data.payload);
    
        return { success: true, data: response.data.payload, message: 'Appointments loaded' };
     
    } catch (err) {
      return { success: false, data: {}, message: `${err}` };
    }
  }


  // static async fetchAppointments(url, data, cancelToken?: string) {
  //   return await useFetch<Paginated<Appointment>>({
  //     url,
  //     method: "post",
  //     data,
  //     cancelToken,
  //   });
  // }


  static async createAppointments(data) {
   
    try {

      const response = await axios
        .post(
          'products/create',
          data
        )
      // let data = response.data;
      console.log('data response in service create appo', response?.data?.message, response?.data?.status);
    
        return { status: response?.data?.status, data: response.data.payload, message: response?.data?.message
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  static async getAppointmentTypes(url, data) {
    console.log('type service get appointments url', url, data)
    // console.log('service create appointments url', url, data)
    try {

      const response = await axios
        .post(
          url,
          data
        )
      // let data = response.data;
      console.log('type data response in service create appo', response?.data?.payload, response?.data?.status);
    
        return { status: response?.data?.status, data: response.data.payload, message: "Appointment types retrieved successfully"
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  static async getFreeSlots(url, data) {
    console.log('slots url service', url, data)
    // console.log('service create appointments url', url, data)
    try {

      const response = await axios
        .post(
          url,
          data
        )
        console.log('failed response', response?.data?.error)
        if (response?.data?.error === 'Token is Expired') {
          console.log('gggggggggggg')
          useLocalStorage().clearSession()
          
          this.$router.push('/login')
        }

  


    if(response?.data?.success !=='false'
      )
       { return { status: response?.data?.status, data: response?.data?.payload, message: "Slots retrieved successfully"}
        }
        else{
          return { status: response?.data?.status, data: response?.data?.payload, message:response?.data?.error}
        }
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  
  static async appointments_with_anamnese(url) {
    console.log('service appointments url', url)
    try {

      const response = await axios
        .get(
          url
        )
      // let data = response.data;
      console.log('data response in service', response.data.payload);
    
        return { success: true, data: response.data.payload, message: 'Appointments loaded' };
     
    } catch (err) {
      return { success: false, data: {}, message: `${err}` };
    }
  }

static async fetchSlots (url, data) {
  console.log('slots url', data)
  try {

    const response = await axios
      .post(
        url,
        data
      )
    // let data = response.data;
    console.log('data response in slots', response.data.payload);
  
      return { success: true, data: response.data.payload, message: 'Slots loaded' };
   
  } catch (err) {
    return { success: false, data: {}, message: `${err}` };
  }
}



static async fetchUpcomingAppointments() {
 
  try {

    const response = await axios
      .post(
        "patients/appointments/upcoming",
        {}
      )
    // let data = response.data;
    console.log('upcoming data response in service', response.data.payload);
  
      return { success: true, data: response.data.payload, message: 'Upcoming Appointments loaded' };
   
  } catch (err) {
    return { success: false, data: {}, message: `${err}` };
  }
}

}