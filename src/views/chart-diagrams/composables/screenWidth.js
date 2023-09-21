import { onMounted, onUnmounted, ref } from 'vue';

export default function useWindowResize() {
  const width = ref(null);

  function resize() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  return { width };
}
