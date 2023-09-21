<template>
        <div class="shadow-2xl bg-white overflow-y-auto text-black rounded mr-2 p-3" :class="divClas">
            <h2 class="text-yellow-650 font-semibold m-3">{{ title }}</h2>
            <div>
              <slot></slot>
            </div>
        </div>
</template>
<script>

export default {
  name: 'ComponentContentCards',
  components: {
  },
  props: ['title', 'divClas'],
};
</script>
<style scoped>

</style>
