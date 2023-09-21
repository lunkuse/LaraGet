import { ref } from 'vue';

export default function menuHandler() {
  const currentMenu = ref('systemReports');

  const changeMenu = (menu) => {
    currentMenu.value = menu;
  };

  return {
    currentMenu,
    changeMenu,
  };
}
