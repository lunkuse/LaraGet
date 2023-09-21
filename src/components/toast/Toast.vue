<template>
  <!-- BEGIN: Toast message-->
  <div id="success-notification-content" class="toastify-content hidden flex">
    <CheckCircleIcon class="text-theme-9" />
    <div class="ml-4 mr-4">
      <div class="font-medium">{{ successmeassage }}</div>
    </div>
  </div>
  <!-- END: Toast message-->
</template>
  
  <script>
import { defineComponent, onMounted, computed, inject } from 'vue'
import Toastify from 'toastify-js'
import $ from 'cash-dom'
export default defineComponent({
  props: {
    successmeassage: String
  },

  setup() {
    onMounted(() => {
      Toastify({
        node: $('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    })

    return {}
  }
})
</script>
  