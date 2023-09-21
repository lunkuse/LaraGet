<template>
    <div @click="scrollTop" v-show="visible" class="bottom-right">
        <slot>
          <button type="button" class="btn btn-to-top">
            <i class="fa fa-chevron-up"></i>
          </button>
        </slot>
    </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    scrollTop() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        // window.scroll(0, window.pageYOffset - 50);
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 10);
    },
    scrollListener() {
      this.visible = window.scrollY > 150;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  },
};
</script>

<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
.btn-to-top {
  width: 50px;
  height: 40px;
  padding: 4px 5px;
  border-radius: 4px;
  font-size: 20px;
  line-height: 22px;
  background: #ff782e;
  color: white;
}
</style>
