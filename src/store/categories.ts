import { defineStore } from "pinia";
import { categoryService } from "../service/category-service";

export const allCategoriesInfo = defineStore("allCategoriesInfo", {
  state: () => ({
    categories: [],
    productCategories: [],
    isLoading: false,
    pagination: {
      currentPage: 1,
      perPage: 10,
      totalPages: 0,
      totalItems: 0,
      from: 0,
      to: 0,
    },
  }),
  getters: {
    getProductCategories: (state) => state.productCategories,
  },
  actions: {
    async fetchProductCategories() {
      const data = await categoryService.getProductCategories();
    
      this.productCategories = data?.data?.data;
      console.log("123 category list", this.productCategories);
    },

    resetStore() {
      this.users = [];
    },
  },
});
