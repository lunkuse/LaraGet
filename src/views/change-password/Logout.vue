<template>
  
</template>

<script>



import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
 created() {
    localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('phoneverification')
        localStorage.removeItem('loginstatus')
        this.$router.go('/login')
  },
   mounted() {
    localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('loginstatus')
        this.$router.go('/login')
  }
});
</script>
