import { defineStore } from "pinia";
import DashboardService from "../service/dashboard-service";


export const allDashboardCounter = defineStore("allDashboardCounter", {
  state: () => ({
    counters: [],
  }),
  getters: {
    getCounters: (state) => state.counters
  },
  actions: {

	  async fetchCounters(parameters) {



		const { data, success } = await DashboardService.fetchCounters(
			
		  );
		  console.log('all storecounter', data)
		// if(success) {
			this.counters = data.data
		// }
	
	  },

    resetStore() {
		this.counters = [];
    },
	
  },
});


