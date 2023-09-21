
 <template>
  <div
    class="overlay"
  >
    <div
      class="
        max-w-2xl
        mx-4
        sm:max-w-sm
        md:max-w-sm
        lg:max-w-sm
        xl:max-w-sm
        sm:mx-auto
        md:mx-auto
        lg:mx-auto
        xl:mx-auto
        mt-16
        bg-white
        shadow-xl
        rounded-lg
        text-gray-900
      "
    >
      <div class="modal__title">
        <h1><span>Session is about to expire</span></h1>
      </div>
      <div class="p-3"> 
    		<h2 >You have left this browser idle.</h2>
    		<p class="font-medium">{{ time }} second left</p>
           <div class="p-4 border-t mx-8 mt-2">
        <button
          class="
            w-auto
            block
            mx-auto
            rounded-full
            hover:shadow-lg
            font-semibold
            text-white
            px-6
            py-2
            btn
            bg-theme-36
          "
          
          type="button"
        >
          Close
        </button>
      </div>
      </div>
    </div>
    
  </div>
</template>



<script>
export default {
  
	data() {
		return {
			time: parseInt(localStorage.getItem("sessionTime"))*1000
		}
	},
   methods: {
Logout(){
  console.log('modal button clicked')
}},
	created() {
    // this.time = localStorage.getItem("sessionTime")
    console.log("session time out", this.time)
    let timerId = setInterval(() => {
      this.time -= 1000;
      if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);
      if (this.time < 1) {
        clearInterval(timerId);
     
        // Your logout function should be over here
        alert('Your session has expired. Login to resume');
          localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('phoneverification')
        localStorage.removeItem('loginstatus')
        this.$router.go('/login')

       
      }
    }, 1000);
  }
};
</script>
<style lang="scss"  scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 500px;
  box-shadow: 1px 2px 4px rgba(153, 155, 168, 0.12);
  border-radius: 4px;
  @apply bg-white; 
}
.modal__title {
  color: #38404f;
  @apply flex ;
  @apply items-center;
   @apply justify-between;
    @apply p-3;
     @apply font-bold;
}
</style>