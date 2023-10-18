import { defineStore } from "pinia";
import ProductService from "../service/products";
import moment from "moment";

export const allProductsStore = defineStore("allProductsStore", {
  state: () => ({
    products: [],
	vendorProducts: [],
  }),
  getters: {
    getProducts: (state) => state.products
  },
  actions: {

  
	async fetchAllProducts(){
	
		const { data, success } = await ProductService.fetchAll();
		console.log('all products', data)
		// if(success) {
			this.products = data
			
		// }
	
	  },
	  async fetchVendorProducts(parameters) {



		const { payload, success } = await ProductService.fetchVendorProducts(
			parameters
		  );
		if(success) {
			this.vendorProducts = payload
		}
	
	  },

    resetStore() {
		this.products = [];
    },
	resetVendorStore() {
		this.vendorProducts = [];
    },
  },
});


