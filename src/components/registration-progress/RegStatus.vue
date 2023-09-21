<template>
  <!-- <a
    href="javascript:;"
    data-toggle="modal"
    :data-target="value && value === true ? model_id : ''"
  > -->
  <div
    class="
      intro-x
      lg:text-center
      flex
      items-center
      mt-5
      lg:mt-0 lg:block
      flex-1
      z-10
    "
  >
    <a
      href="javascript:;"
      data-toggle="modal"
      :data-target="value && value === true ? model_id : ''"
      class="w-10 h-10 rounded-full rounded-full btn"
      :class="value && value === true ? 'btn-success' : 'btn-danger'"
      id="contact-tab"
      role="tab"
      aria-controls="contact"
      aria-selected="false"
    >
      <CheckCircleIcon v-if="value && value === true" />
      <XCircleIcon v-else />
    </a>
    <div class="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
      {{ title }}
    </div>
  </div>
  <!-- </a> -->
</template>

<script>
export default {
  name: 'RegStatus',
  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean
    },
    model_id: {
      type: String
    }
  },
  created() {
    console.log('NewVal', this.value)
  }
}
</script>

<style>
</style>
