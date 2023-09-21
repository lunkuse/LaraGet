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
  props: {
    divRef: null,
  },
  methods: {
    scrollToTop() {
      this.$nextTick(() => {
        // const containerRef = this.divRef;
        this.$refs.divRef.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
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
