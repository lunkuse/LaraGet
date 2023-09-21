<template>
  <div>
    hello
    <div v-if="warningZone">warning</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
      warningTimer: null,
      logoutTimer: null,
      warningZone: false,
    };
  },
  mounted() {
    this.events.forEach((event) => {
      window.addEventListener(event, this.resetTimer());
    }, this);

    this.setTimers();
  },
  unmounted() {
    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetTimer());
    }, this);
    this.resetTimer();
  },
  methods: {
    setTimers() {
      this.warningTimer = setTimeout(this.warningMessage(), 4 * 1000);
      this.logoutTimer = setTimeout(this.logoutuser(), 10 * 1000);

      this.warningZone = false;
    },
    warningMessage() {
      this.warningZone = true;
    },
    logoutuser() {
      this.$auth.logout('local').then((data) => {
        console.log(data);
      });
    },
    resetTimer() {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>

<style></style>
