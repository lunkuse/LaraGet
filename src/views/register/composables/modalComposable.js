import {ref} from 'vue';

export default function modalFunctionality() {

    const isOpen = ref(false);
    const showModal = () => {
        isOpen.value = true;
    }

    const closeModal = () => {
        isOpen.value = false;
    }

    return {
        isOpen,
        showModal,
        closeModal,
    }
}