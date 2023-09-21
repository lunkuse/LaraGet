import { ref } from 'vue';

export default function useDevelopmentDisorder() {
  const isDevelopmentDisorderPresent = ref(false);

  function confirmDevelopmentDisorderAbsence() {
    isDevelopmentDisorderPresent.value = false;
  }
  function confirmDevelopmentDisorderPresence() {
    isDevelopmentDisorderPresent.value = true;
  }

  return {
    isDevelopmentDisorderPresent,
    confirmDevelopmentDisorderAbsence,
    confirmDevelopmentDisorderPresence,
  };
}
