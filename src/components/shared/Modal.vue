<template>
<transition name="modal-fade fade">
  <div class="modal-backdrop">
    <div class="modal1 bg-light"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
    >
    <header class="modal-header" id="modalTitle">
      <slot name="header">
      This is the default title!
      </slot>
      <button type="button"
      class="btn-close"
      @click="close" aria-label="Close modal"
      >
      <!-- x -->
      </button>
    </header>

    <section class="modal-body" id="modalDescription">
      <slot name="body">
      this is the default body!
      </slot>
    </section>

    <footer class="modal-footer">
      <slot name="footer">
      This is the defualt footer!
      </slot>
      </footer>

    </div>
  </div>
  </transition>
</template>
<script>
import Button from '../../components/shared/buttons/Button.vue';


export default {
  name: 'Modal',
  components: {
    Button,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style scoped>

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 200;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fade {
    transition: opacity 0.15s linear;
}

  .modal1 {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    /* overflow-x: auto; */
    height: auto;
    width: 500px;
    margin-top: 10%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 200;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
  .modal-header,
  .modal-footer {
    padding: 10px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    background-color: #FF782E;
    color: #FFFFFF;
    justify-content: space-between;
  }

  .modal-header h{
    color: #FFFFFF;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 1px;
    right: 0px;
    border: none;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #f2fff2;
    /* background: red; */
    border-radius: 50px;
    margin: 1% 9px 3px 3px;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
    transition: opacity .5s ease;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>
