<template>
  <div>
    <div class="flex">
      <label class="font-weight-bold mt-4">{{ label }}</label>
      <input
        type="text"
        :placeholder="`${$t('translation.search_text')}`"
        v-model="search_term"
        class="mt-1 ml-1 form-control col-11 intro-x py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36   focus:ring-0"
      />
    </div>
    <div v-if="search_term.length !== 0" class="option-container col-7 bg-white shadow-sm">
      <div
        class="options-list mt-0 pt-0 d-flex justify-content-between flex-row pr-2 align-items-center flex h-10"
        v-for="option in filteredOptions"
        :key="option.id"
      >
        <!-- <img class="me-3 rounded-full h-8" width="40" height="70" alt="image" :src="[(option.photo_option) ? `${option.photo_option}` : avatar ]"> -->
        <Avatars v-bind:initials="option.first_option + option.last_option" class="rounded-full" />
        <input
          type="text"
          class="option-item "
          :value="option.first_option+' '+option.last_option"
          @click="selectedOption($event, option.mails)"
          readonly
        />
        <!-- <b class="text-primary">{{option.email_option}}</b> -->
        <i class="fa fa-check"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import avatar from '../../assets/images/placeholder.jpg';
import avatar from '@/assets/images/placeholder.jpg'
import Avatars from '@/components/avatar/Avatar.vue'
/* eslint-disable */
export default {
  data() {
    return {
      label: '',
      options_passed: this.options,
      search_term: '',
      avatar
    }
  },
  components: {
    Avatars
  },
  props: {
    label: {
      type: String,
      required: true,
      default: null
    },
    options: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.$watch(
      'options',
      options => {
        this.options_passed = options
      },
      { immediate: true }
    )
  },
  methods: {
    selectedOption(event, mails) {
      this.search_term = event.target.value
      this.$emit('option_email', mails)
    }
  },
  computed: {
    filteredOptions() {
      // console.log('OptionsDataNew',this.options);
      let optionsList = this.options
      // console.log('OptionsData',optionsList);
      if (this.search_term) {
        optionsList = optionsList.filter(
          option =>
            option.mails
              .toUpperCase()
              .includes(this.search_term.toUpperCase()) ||
            option.last_option
              .toUpperCase()
              .includes(this.search_term.toUpperCase())
        )
      }
      return optionsList
    }
  }
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
  border-bottom: 2px solid #ff9f39 !important;
  border-radius: 8px !important;
}
</style>