
<template>
 <div id="qr-code-full-region"></div>
  <!-- END: Super Large Modal Content -->
</template>

<script>
import { defineComponent, toRaw, reactive, toRefs } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'

// Validations
import { required, maxValue, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default defineComponent({
 props: {
    qrbox: {
      type: Number,
      default: 250
    },
    fps: {
      type: Number,
      default: 10
    },
  },
  mounted () {
    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
    };
    const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
    html5QrcodeScanner.render(this.onScanSuccess);
  },
  methods: {
    onScanSuccess (decodedText, decodedResult) {
      this.$emit('result', decodedText, decodedResult);
    }
  }
})
</script>
<style lang="scss"></style>

