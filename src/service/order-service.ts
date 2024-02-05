import axios from '../axios'

import {  Paginated } from "../types";
import { useFetch } from "../utils";




class OrderService {

  async fetchAll1()  {
    
    // console.log('service create appointments url', url, data)
    try {
const url = "products/vendorOrders"
      const response = await axios
        .post(
          url
        )
      // let data = response.data;
      console.log('type data response in service create appo', response.data);
    
        return { status: response?.data?.status, data: response.data.data, message: "Products retrieved successfully"
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  async fetchAll()  {
    const user = localStorage.getItem('user')
    const Id = JSON.parse(user)?.id;
    console.log('logged user',Id)
    try {
const url = "products/vendorOrders"
      const response = await axios
        .post(
          url,
          { VendorId:Id, page: 1, pageSize: 5 }
        )
      // let data = response.data;
      console.log('vendor type data ', response.data);
    
        return { status: response?.data?.status, data: response.data.data, message: "Products retrieved successfully"
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }
}
export default new OrderService()
