<template>
 <div class="row">
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="form-group mb-2">
      <div class="d-flex align-items-center">
        <div class="d-flex bg-white align-items-center  doc-div ml-2 flex-row flex-wrap w-100 ">
          <div v-for="(option_select, x) in selected_options" :key="x" class="pt-2"  >
            <div class="bg-light ml-1 p-3 pb-0 doc-pill" >
              <span class="rounded-circle bg-white p-2 text-primary font-bold mr-1">{{option_select.label[0]}}</span>
              {{option_select.label}}
              <span aria-hidden="true" class="text-primary pl-2 close-icon cursor-pointer" @click="cancelOption(option_select)">&times;</span>
            </div>
          </div>
          <input type="text" class="form-control form-control-sm" v-model="search_option" placeholder="Search here..."/>
        </div>
      </div>
      </div>
      <!--start search-->
    <div v-if="search_option.length !== 0" class="option-container">
      <div class="options-list bg-white mt-0 pt-0 d-flex justify-content-between flex-row pr-2 align-items-center" v-for="option in filteredOptions" :key="option.id">
        <input type="text" class="option-item" :value="option.label"  @click="selectedOption($event,option)" readonly/>
        <i class="fa fa-check"></i>
      </div>
    </div>
</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
      return {
        label: '',
        search_option: '',
        selected_options: [],
        options_passed: this.options,
      };
    },
    props: {
        options: {
            type: Array,
            required: true,
            default() {
              return [];
            }
        },
        label: {
          type: String,
          required: true,
          default: null,
        },
    },
     mounted() {
      this.$watch('options', (options)=>{
        this.options_passed = options;
      },{immediate: true,});
    },
    methods: {
      selectedOption(event, option) {
         if (this.search_option) {
           this.search_option = event.target.value;
         }
         if (!this.selected_options.includes(option.id)) {
           this.selected_options.push(option);
         }
         this.$emit('selected_option',option.id);
         this.search_option = '';
      },

      cancelOption(option) {
        const index = this.selected_options.indexOf(option);
        if (index > -1) {
        this.selected_options.splice(index, 1);
        this.$emit('cancel',option.label);
        }
      },
    },
    computed: {
      filteredOptions() {
        let optionsList = this.options_passed.filter((option) => !this.selected_options.includes(option))
        if (this.search_option) {
          optionsList = optionsList.filter((option) => (option.label.toUpperCase()).includes(this.search_option.toUpperCase()));
        }
        return optionsList;
      }
    },
}
</script>

<style scoped>
input {
  border-bottom: 1px solid rgb(175, 175, 175) !important;
  border-top: 1px solid white !important;
  border-left: 1px solid white !important;
  border-right: 1px solid white !important;
  border-radius: 0px;
}
input:focus {
  border-bottom: 2px solid #2f3c91 !important;
  border-radius: 8px !important;
}
.doc-div {
  border-bottom: 1px solid rgb(175, 175, 175) !important;
}
.doc-div input {
  border-bottom: 1px solid white !important;
  width: 80%;
}
.doc-pill {
  border-radius: 18px !important;
}
.time-div input:focus,
.doc-div input:focus {
  border-radius: 8px !important;
  border-bottom: 1px solid white !important;
}
.doc-div input:focus {
  border-bottom: 1px solid rgb(175, 175, 175) !important;
  border-top: 1px solid white !important;
  border-left: 1px solid white !important;
  border-right: 1px solid white !important;
  border-radius: none !important;
}
.optional-text,
.doc-div svg {
  color: #2f3c91;
  padding-right: 5px;
}
.optional-text:hover {
  cursor: pointer;
}
.option-container {
  font-size: 14px;
  position: absolute;
  margin-top: 10px;
  max-height: 30vh;
  width: 90%;
  overflow-y: auto;
  border-radius: 10px;
  z-index: 100;
  /* max-height:40vh; */
  overflow-x: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05),
    -5px -5px 10px rgba(0, 0, 0, 0.05);
}
.option-item {
  border: none !important;
}
.option-item:focus {
  border-radius: 0px !important;
  border-bottom: 1px solid white !important;
}
.options-list:hover {
  background-color: aliceblue !important;
}
.option-item:hover {
  cursor: pointer;
  color: rgb(25, 25, 120);
  width: 100% !important;
  background-color: aliceblue !important;
}
.fa-check {
  opacity: 0 !important;
}
.options-list:hover .fa-check {
  opacity: 1 !important;
}
@media only screen and (max-width: 1440px) {
  .doc-div input {
    width: 60% !important;
  }
  .form-container {
    height: 55vh;
    width: 50%;
    overflow-y: auto;
  }
}
</style>