<template>
     <label class="font-weight-bold">{{ label }}</label>
     <input type="text" placeholder="Search here..." v-model="search_term" class="form-control" />
    <div v-if="search_term.length !== 0" class="option-container">
         <div class="options-list mt-0 pt-0 d-flex justify-content-between flex-row pr-2 align-items-center" v-for="option in filteredOptions" :key="option.id">
                <input type="text" class="option-item" :value="option.first_option+' '+option.last_option" @click="selectedOption($event, option.id)" readonly/>
                <i class="fa fa-check"></i>
          </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
      return {
        label: '',
        options_passed: this.options,
        search_term: '',
      };
    },
    props:{
        label: {
          type: String,
          required: true,
          default: null,
        },
        options: {
          type: Array,
          required: false,
          default() {
            return [];
          }
        },
    },
    mounted() {
      this.$watch('options', (options)=>{
        this.options_passed = options;
      },{immediate: true,})
    },
    methods: {
      selectedOption(event, id) {
        this.search_term = event.target.value;
        this.$emit('option_id', id);
      },
    },
    computed: {
      filteredOptions() {
        let optionsList = this.options_passed;
        if (this.search_term) {
          optionsList = optionsList.filter((option)=>(option.first_option.toUpperCase()).includes(this.search_term.toUpperCase()) || (option.last_option.toUpperCase()).includes(this.search_term.toUpperCase()));
        }
        return optionsList;
      },
    },
}
</script>

<style scoped>
.option-container {
  font-size: 14px;
  position: absolute;
  margin-top: 10px;
  max-height: 30vh;
  width: 90%;
  overflow-y: auto;
  border-radius: 10px;
  z-index: 100;
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
</style>