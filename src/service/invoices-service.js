import axios from '../axios'
import { useLocalStorage } from './local-starage-service'
export default class InvoiceService {
  static async fetchInvoices(url, data, cancelToken) {
    console.log('invoice service  url', url, data, cancelToken)
    try {

      const response = await axios
        .post(
          url,
          data,
          { cancelToken: cancelToken }
        )
      // let data = response.data;
  
      if(response?.data?.error){
      if (response?.data?.error === 'Token is Expired') {
        useLocalStorage().clearSession()
        
        this.$router.push('/login')
      }
      if (response?.data?.error === 'Token is Invalid') {
        useLocalStorage().clearSession()
        
        this.$router.push('/login')
      }}
      console.log('rrrrr invoice service', response?.data?.status );
      if(response?.data?.status ===true
        ){
          console.log('got data')
        return { success: true, data: response.data.payload, message: 'Invoices loaded' };
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

  static async makePayment(data) {
    try {


      const response = await axios
        .post(
          'patients/payments/process',
          data
        )
      // let data = response.data;
      console.log('data response in service make payment', response);
    
        return { status: response?.data?.status, data: response.data.payload, message: ""
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  static async getTransactions(url, data) {
    console.log('type service get invoices url', url, data)
    // console.log('service create appointments url', url, data)
    try {

      const response = await axios
        .post(
          url,
          data
        )
      // let data = response.data;
      console.log('type data response in service create appo', response?.data?.payload, response?.data?.status);
    
        return { status: response?.data?.status, data: response.data.payload, message: "Transactions retrieved successfully"
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  static async fetchSettings() {
 
    try {
  
      const response = await axios
        .get(
          "patients/settings/all"
        )
    
      console.log('settings data response in service', response.data.payload);
    
        return { success: true, data: response.data.payload, message: 'Settings loaded' };
     
    } catch (err) {
      return { success: false, data: {}, message: `${err}` };
    }
  }
}