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
		// console.log("products store parameters", parameters);
		this.isLoading = true;


		const { data, status } = await ProductService.fetchVendorProducts(
			parameters
		  );
		  console.log('all vendor products',  status, data)
		if(status) {
			this.vendorProducts = data.data
			this.isLoading = false;
		}
	else{  this.vendorProducts = []
		this.isLoading = false; }
	  },

    resetStore() {
		this.products = [];
    },
	resetVendorStore() {
		this.vendorProducts = [];
    },
  },
});


