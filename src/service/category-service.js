// src/services/countryService.ts

import axios from "axios";

export const categoryService = {
 

  async getProductCategories() {
    const token = localStorage.getItem("token");
  
    const response = await axios.get(`/products/category`, {
      headers: {
        Authorization: "Bearer " + token,

        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return response.data;
  },

 
};
