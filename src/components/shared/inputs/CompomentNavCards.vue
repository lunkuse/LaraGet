<template>
        <div class="shadow-2xl w-100 bg-white items-center cursor-pointer justify-around flex flex-col p-4 text-black rounded" :class="shadowColor" @click='cardRouter()'>
                          <div class="d-flex flex-column w-full h-full">
                              <div class="d-flex justify-content-between ">
                                  <h3 class=" heading font-weight-bold" style="width:90%;">{{title}}</h3>
                                  <i :class="icon" style="width:10%;"></i>
                              </div>
                               <div class="font-bold text-4xl ml-5 mb-5" v-if="icon === 'bi bi-clock text-danger'">
                                    <DigitalClock/>
                                  </div><br/>
                              <div class="flex-shrink-0 align-self-start">
                                  <h3 :class="countColor" class="mb-0 font-weight-bold mt-3">{{ count }}</h3>
                              </div>
                          </div>
        </div>
</template>
<script>
import DigitalClock from '../../doctorsSide/DigitalClock.vue';

export default {
  name: 'ComponentNavCards',
  components: {
    DigitalClock,
  },
  props: ['title', 'count', 'icon', 'countColor', 'shadowColor', 'pathUrl'],
  setup(props) {
    console.log(props);
  },
  data() {

  },
  methods: {
    cardRouter() {
      console.log(this.path);
      this.$router.push(`/${this.pathUrl}`);
    },
  },
};
</script>
<style scoped>

</style>
