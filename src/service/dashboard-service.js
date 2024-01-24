import axios from '../axios'

// import {  Paginated } from "../types";
// import { useFetch } from "../utils";




class DashboardService {

  async fetchAllCounters()  {
    
const user = localStorage.getItem('user')
const Id = JSON.parse(user)?.id;
console.log('logged user',Id)
try {
const url = "products/vendorItemsCount"
  const response = await axios
    .post(
      url,
      { VenderId:Id}
    )
  // let data = response.data;
  console.log('counter data ', response.data);

    return { status: response?.data?.status, data: response.data.data, message: "counters retrieved successfully"
    };
 
} catch (err) {
  return { status: false, data: {}, message: `${err}` };
}
  }



}


  

export default new DashboardService()
