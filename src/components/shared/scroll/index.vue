<template>
  <ScrollTopComponent>
      <a class="btn-to-top btn-light">
        <button type="button" class="btn btn-to-top"><i class="fa fa-chevron-up"></i></button>
      </a>
  </ScrollTopComponent>
</template>

<script>
import ScrollTopComponent from './ScrollToTop.vue';

export default {
  components: {
    ScrollTopComponent,
  },
};
</script>

<style scoped>
.btn-to-top {
  width: 50px;
  height: 50px;
  padding: 9px 6px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
  background: #ff782e;
}
</style>
