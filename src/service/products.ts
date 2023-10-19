import axios from '../axios'

import {  Paginated } from "../types";
import { useFetch } from "../utils";

export type Product = {
    
        id: number,
        patient:{
            id: number,
            first_name: string,
            last_name: string,
            middle_name: string,
            image: string
        },
        treatment_type: {
            id: number,
            title:string,
            procedures: []
        },
        doctors: [],
        appointment_type: {
            id: number,
            title: string,
            code: number
        },
        status: {
            id: number,
            status: string
        },
        date: string,
        slots: {
            start_time: string,
            end_time: string
        },
        employees: {
            id: number,
            first_name: string,
            last_name: string
        },
        source: {
            id: number,
            source: string
        },
        material_name: string,
        servingtime: string,
        interval: string,
        checkin_time: string,
        comments: string

       
}



export type ProductRequestObj = {
  vendorId?: number
  
}



class ProductService {
// get all products
  // async fetchAll() {
  //   return await useFetch<Product>({
  //     url: "products/allItems",
  //     method: "get",
  //   });
  // }
 
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
  async fetchVendorProducts({vendorId}: ProductRequestObj) {
    console.log("vendor id",vendorId);
    return await useFetch<Product>({
      url: "products/vendorItems",
      method: "post",
      data: { VenderId:3},
    });
  }


  async fetchVendorProducts(VendorId)  {
    
    // console.log('service create appointments url', url, data)
    try {
const url = "products/vendorItems"
      const response = await axios
        .post(
          url,
          { VenderId:3}
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


  

export default new ProductService()
