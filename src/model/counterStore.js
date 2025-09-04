import { defineStore } from "pinia";
import { ref } from "vue";

export const useMoodStore = defineStore("mood", () => {
  const showModal = ref(false);

  function openModal() {
    showModal.value = true;
  }

  function closeModal() {
    showModal.value = false;
  }

  return { showModal, openModal, closeModal };
});
