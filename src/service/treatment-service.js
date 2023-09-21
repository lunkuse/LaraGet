import axios from '../axios'
import { useLocalStorage } from './local-starage-service'
export default class AppointmentsService {

  static async fetchTreatments(url, data) {
    console.log('treatments service  url', url, data)
    try {

      const response = await axios
        .post(
          url,
          data
        )
     
      console.log('treatment service', response );
      if(response?.data?.status ==='SUCCESS'
        ){
          console.log('treatment got data', response.data.payload)
          // console.log('treatment got data', response)
        return { success: true, data: response.data.payload, message: 'treatments loaded' };
      }
      else if(response?.data?.status ===false
        ){
        return { success: false, data: response.data, message: 'failed' };
      }
    //   else{
    //     console.log('got data else')
    //   return { success: true, data: response.data.payload, message: 'Invoices loaded' };
    // }
    } catch (err) {
      return { success: false, data: {}, message: `${err}` };
    }
  }


}