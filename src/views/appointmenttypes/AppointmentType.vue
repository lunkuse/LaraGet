<template>

  <div class="">
    
    <AppointmentTypesTable />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppointmentTypesTable from "../appointmenttypes/Table.vue";
export default defineComponent({
  components: {
   AppointmentTypesTable
  },
  data() {
    return {
    }
  },

  setup() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
})
</script>

<style scoped>

</style>
