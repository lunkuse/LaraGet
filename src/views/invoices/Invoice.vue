<template>

  <div class="">
  <InvoiceContainer/>
    <!-- <InvoiceTable /> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import InvoiceTable from "../invoices/Table.vue";
import InvoiceContainer from "../invoices/invoices/InvoiceContainer.vue";
export default defineComponent({
  components: {
    InvoiceTable,
    InvoiceContainer
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
