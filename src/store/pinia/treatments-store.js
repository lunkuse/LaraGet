import { defineStore } from "pinia";

export const useTreatmentStore = defineStore("treatmentStore", {
  state: () => ({
    latestTreatment: null,
    latestTreatmentBlob: null,
  }),
  getters: {},
  actions: {
    setLatestTreatmentBlob(treatment) {
      this.latestTreatmentBlob = treatment;
    },
  }
});