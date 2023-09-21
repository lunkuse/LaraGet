<template>
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
</template>

<script>

export default {
  name: 'SmallLoader',
  props: {
    background: String,
  },
  mounted() {
    // Look for every div under the lds class and then give a background color which is passed to the component
    document.querySelectorAll('.lds-facebook div').forEach((div) => {
      div.style.background = this.background;
    });
  },
};
</script>

<style scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
  top:-10px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 4px;
  width: 2px;
  /* background: #556ee5; */
  animation: lds-facebook 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 14px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 20px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 24px;
  }
  50%, 100% {
    top: 14px;
    height: 10px;
  }
}
</style>
