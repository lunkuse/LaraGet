<template>
  <section class="py-10 font-poppins dark:bg-gray-800">
  
    <div class="max-w-6xl px-4 mx-auto">
      <div class="flex flex-wrap mb-24 -mx-4">
        <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
          <div class="sticky top-0 overflow-hidden ">
            <div class="relative mb-6 lg:mb-10 lg:h-96">
              <a
                class="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                @click="previousIndex()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  ></path>
                </svg>
              </a>
              <img
                class="object-contain w-full lg:h-full"
                :src="product?.Images[currentIndex]"
                alt=""
              />
            
              <a
                class="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                @click="nextIndex()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
              </a>
            </div>
            <div class="flex-wrap hidden -mx-2 md:flex">
              <div
      v-for="(image, index) in product?.Images"
      :key="index"
      class="w-1/2 p-2 sm:w-1/4"
      @click="changeIndex(index)"
    >
      <a
        class="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
        href="#"
      >
        <img
          class="object-contain w-full lg:h-28"
          :src="image"
          alt=""
        />
      </a>
    </div>
              
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2">
          <div class="lg:pl-20">
            <div class="mb-6 ">
              <span
                class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200"
                >  
                <!-- {{ product?.Category }} -->
                </span
              >
              <h2
                class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300"
              >
                {{ product?.Name }}
              </h2>
             
              <p
                class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 "
              >
                <span>{{ product?.Discounted_Price }}</span>
                <span
                  class="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400"
                  > {{ product?.Price }}</span
                >
              </p>
            </div>
            <div class="mb-6">
              <h2
                class="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400"
              >
                About :
              </h2>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-xl">
                <div class="p-3 lg:p-5 ">
                  <div
                    class="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50"
                  >
                    <div class="flex flex-wrap justify-center gap-x-10 gap-y-4">
                      <div class="w-full mb-4 md:w-2/5">
                        <div class="flex ">
                          
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                             Category
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.Category }}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="w-full mb-4 md:w-2/5">
                        <div class="flex ">
                          
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                             Price
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.Price }}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="w-full mb-4 md:w-2/5">
                        <div class="flex ">
                         
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                           Discounted Price
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.Discounted_Price
}}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="w-full mb-4 lg:mb-0 md:w-2/5">
                        <div class="flex ">
                          
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                            Dimensions
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.Dimensions }}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="w-full mb-4 lg:mb-0 md:w-2/5">
                        <div class="flex ">
                          
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                            Weight
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.Weight}}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="w-full mb-4 lg:mb-0 md:w-2/5">
                        <div class="flex ">
                          
                          <div>
                            <p
                              class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                          SKU
                            </p>
                            <h2
                              class="text-base font-semibold text-gray-700 dark:text-gray-400"
                            >
                            {{ product?.SKU }}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="py-3 mb-6 border-t border-b border-gray-200 dark:border-gray-700"
            >
              <span class="text-base text-gray-600 dark:text-gray-400 font-black"
                >Description</span
              >
              <p class="mt-2 text-sm text-blue-500 dark:text-blue-200">
            
                <span class="text-gray-600 dark:text-gray-400">
                  {{ product?.Description
}}
                </span>
              </p>
            </div>
            <div
              class="py-3 mb-6 border-t border-b border-gray-200 dark:border-gray-700"
            >
              <span class="text-base text-gray-600 dark:text-gray-400 font-black"
                >Specifications
</span
              >
              <p class="mt-2 text-sm text-blue-500 dark:text-blue-200">
            
                <span class="text-gray-600 dark:text-gray-400">
                  {{ product?.Specifications
}}
                </span>
              </p>
            </div>
            <div class="mb-6 "></div>
            

            <div class="flex gap-4 mb-6">
              <a
                href="#"
                class="font-medium w-full px-4 py-3 text-center text-white bg-theme-31 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-600 hover:text-gray-100  rounded-xl"
               >
                Edit</a
              >
            </div>
           
            
            <div class="flex gap-4 mb-6">
              <a
                href="#"
                class="font-medium w-full px-4 py-3 text-center text-gray-100 bg-theme-34 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
              >
                Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    // Data

    const product = ref();
  
    const loading = ref(false);
    const route = useRoute();
    const getProduct = () => {
      console.log("inside get product");
      loading.value = true;
      const token = localStorage.getItem("token");
      const data = {
        id: route.params.productID,
      };
      axios
        .post("products/item", data, {
          headers: {
            Authorization: "Bearer " + token,

            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((res) => {
         
          if (res.data.status === "success") {
          
            product.value = res.data.data.data;
            console.log("product here", product.value);
          }
        })

        .catch(function(err) {});
    };
    getProduct();
    const currentIndex = ref(0);
    const changeIndex =(index)=>{
      currentIndex.value= index
    }
   const  previousIndex=()=>{
      currentIndex.value= currentIndex.value - 1
    }
           const nextIndex=()=>{
      currentIndex.value= currentIndex.value + 1
    }
    return {
      route,
      loading,
      getProduct,
      product,
      currentIndex,
      changeIndex,
      nextIndex,
      previousIndex
    };
  },
});
</script>

<style scoped>
/* Your styles go here */
</style>
