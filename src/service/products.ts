import axios from '../axios'

import {  Paginated } from "../types";
import { useFetch } from "../utils";




class ProductService {

  async fetchAll()  {
    
    // console.log('service create appointments url', url, data)
    try {
const url = "products/allItems"
      const response = await axios
        .get(
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


  // get products for single vendor 
  async fetchVendorProducts1({vendorId}: ProductRequestObj) {
    console.log("vendor id",vendorId);
    return await useFetch<Product>({
      url: "products/vendorItems",
      method: "post",
      data: { VenderId:3},
    });
  }


  async fetchVendorProducts(VendorId)  {
    const user = localStorage.getItem('user')
    const Id = JSON.parse(user)?.id;
    console.log('logged user',Id)
    try {
const url = "products/vendorItems"
      const response = await axios
        .post(
          url,
          { VenderId:Id}
        )
      // let data = response.data;
      console.log('vendor type data ', response.data);
    
        return { status: response?.data?.status, data: response.data.data, message: "Products retrieved successfully"
        };
     
    } catch (err) {
      return { status: false, data: {}, message: `${err}` };
    }
  }

  async deleteProduct(data) {
   
    try {
  
      const response = await axios
        .post(
          'products/deleteItem',
          data
        )
      // let data = response.data;
    
    
        return { status: response?.data?.status, data: response.data.payload, message: response?.data?.message
        };
     
    } catch (err) {
      console.log('data response when deleting', err);
      return { status: false, data: {}, message: `${err}` };
    }
  }

}


  

export default new ProductService()
