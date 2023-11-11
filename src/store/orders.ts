import { defineStore } from "pinia";
import OrderService from "../service/order-service";
import moment from "moment";

export const allOrdersStore = defineStore("allOrdersStore", {
  state: () => ({
    orders: [],
  }),
  getters: {
    getOrders: (state) => state.orders
  },
  actions: {

	  async fetchOrders(parameters) {



		const { data, success } = await OrderService.fetchAll(
			parameters
		  );
		  console.log('all orders for vendor', data)
		// if(success) {
			this.orders = data.data
		// }
	
	  },

    resetStore() {
		this.orders = [];
    },
	
  },
});


