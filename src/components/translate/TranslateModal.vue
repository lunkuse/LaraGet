<template>
  <div id="translate-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div
      class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900"
    >
   <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Select Language
                </h3>
                <button data-dismiss="modal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
      <div class="text-center mt-2 max-h-screen overflow-y-auto">
        <form id="form1" runat="server" class="overflow-y-auto h-60">
          <div id="google_translate_element" style="display: none"></div>
          <ul>
            <!-- Netherlands Dutch -->
            <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="Dutch"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
                  <img
                    src="https://flagcdn.com/40x30/nl.png"
                    srcset="https://flagcdn.com/80x60/nl.png 2x, https://flagcdn.com/120x90/nl.png 3x"
                    width="40"
                    height="30"
                    alt="Dutch"
                  />
                </div>
                <span class="bg-red h-6">Dutch</span>
              </a>
            </li>
<!--  data-dismiss="modal" -->
            <!-- usa english -->
            <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="English"
                onclick="translateLanguage(this.id); "
               
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
                  <img
                    src="https://flagcdn.com/40x30/us.png"
                    srcset="https://flagcdn.com/80x60/us.png 2x, https://flagcdn.com/120x90/us.png 3x"
                    width="40"
                    height="30"
                    alt="English"
                  />
                </div>
                <span class="bg-red">English</span>
              </a>
            </li>

            <!-- germany -->

            <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="German"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
                  <img
                    src="https://flagcdn.com/40x30/de.png"
                    srcset="https://flagcdn.com/80x60/de.png 2x, https://flagcdn.com/120x90/de.png 3x"
                    width="40"
                    height="30"
                    alt="Germany"
                  />
                </div>
                <span class="bg-red">German</span>
              </a>
            </li>
<!-- italy Italian-->
 <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="Italian"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
                 <img
  src="https://flagcdn.com/40x30/it.png"
  srcset="https://flagcdn.com/80x60/it.png 2x,
    https://flagcdn.com/120x90/it.png 3x"
  width="40"
  height="30"
  alt="Italy">
                </div>
                <span class="bg-red">Italian</span>
              </a>
            </li>
<!-- Spain Spanish -->
 <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="Spanish"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
  <img
  src="https://flagcdn.com/40x30/es.png"
  srcset="https://flagcdn.com/80x60/es.png 2x,
    https://flagcdn.com/120x90/es.png 3x"
  width="40"
  height="30"
  alt="Spain">
                </div>
                <span class="bg-red">Spanish</span>
              </a>
            </li>
<!-- France French -->
 <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="French"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
 <img
  src="https://flagcdn.com/40x30/fr.png"
  srcset="https://flagcdn.com/80x60/fr.png 2x,
    https://flagcdn.com/120x90/fr.png 3x"
  width="40"
  height="30"
  alt="France">
                </div>
                <span class="bg-red">French</span>
              </a>
            </li>
            <!-- India Hindi -->
 <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="Hindi"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
 <img
  src="https://flagcdn.com/40x30/in.png"
  srcset="https://flagcdn.com/80x60/in.png 2x,
    https://flagcdn.com/120x90/in.png 3x"
  width="40"
  height="30"
  alt="India">
                </div>
                <span class="bg-red">Hindi</span>
              </a>
            </li>


                   <!-- Russia Russian -->
 <li class="box px-5 py-2 ml-1 flex-1 zoom-in">
              <a
                href="javascript:;"
                id="Russian"
                onclick="translateLanguage(this.id);"
                class="pl-4 w-full bg-indigo flex flex items-center"
              >
                <div class="w-1/4 bg-blue">
<img
  src="https://flagcdn.com/40x30/ru.png"
  srcset="https://flagcdn.com/80x60/ru.png 2x,
    https://flagcdn.com/120x90/ru.png 3x"
  width="40"
  height="30"
  alt="Russia">
                </div>
                <span class="bg-red">Russian</span>
              </a>
            </li>
           
         
          </ul>
        </form>
      </div>

      <!-- <div class="p-4 border-t mx-8 mt-2">
        <button
          class="w-1/2 block mx-auto rounded-full hover:shadow-lg font-semibold text-white px-6 py-2 bg-theme-36"
          data-dismiss="modal"
          type="button"
        >Close</button>
      </div> -->
    </div>
  </div>
  <!-- END: Modal Content -->
</template>

<script>
import { toRaw } from 'vue'

export default {
  name: 'PhoneVerificationDeatails',
  props: ['this.id'],
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
  },

  data() {}
}
</script>
