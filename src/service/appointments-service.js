import dataTablesDataTables from 'datatables.net-dt/js/dataTables.dataTables';
import axios from '../axios'
import { useLocalStorage } from './local-starage-service'

// import { useFetch } from "../utils";
// import { Appointment, Paginated, AppointmentType, Slot } from "../types";

export default class AppointmentsService {
 
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



}