import { defineStore } from "pinia";
import ProductService from "../service/products";
import moment from "moment";

export const allProductsStore = defineStore("allProductsStore", {
  state: () => ({
    products: [],
	vendorProducts: [],
	isLoading: false,
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
		this.isLoading = true;


		const { data, success } = await ProductService.fetchVendorProducts(
			
		  );
		  console.log('all vendor products', data)
		// if(success) {
			this.vendorProducts = data.data
			this.isLoading = false;
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


