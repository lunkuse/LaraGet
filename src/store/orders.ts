import { defineStore } from "pinia";
import OrderService from "../service/order-service";
import moment from "moment";

export const allOrdersStore = defineStore("allOrdersStore", {
  state: () => ({
    orders: [],
    isLoading: false,
  }),
  getters: {
    getOrders: (state) => state.orders
  },
  actions: {

	  async fetchOrders(parameters) {
      this.isLoading = true;


		const { data, success } = await OrderService.fetchAll(
			parameters
		  );
		  console.log('all orders for vendor', data)
		// if(success) {
			this.orders = data.data
		// }
		this.isLoading = false;
	  },

    resetStore() {
		this.orders = [];
    },
	
  },
});


