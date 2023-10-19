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



		const { data, success } = await ProductService.fetchVendorProducts(
			parameters
		  );
		  console.log('all vendor products', data)
		// if(success) {
			this.vendorProducts = data.data
		// }
	
	  },

    resetStore() {
		this.products = [];
    },
	resetVendorStore() {
		this.vendorProducts = [];
    },
  },
});


