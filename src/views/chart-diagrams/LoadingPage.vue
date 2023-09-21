<template>
  <div class="bg-gray-200 flex flex-col items-center font-mono justify-center overflow-auto fixed top-[180px] bottom-0 right-0 left-96">
    <Loader/>
    <p>{{ $t('treatments.loading') }}</p>
  </div>
</template>

<script setup>
import Loader from './BigLoader.vue';
</script>

<style scroped>

</style>