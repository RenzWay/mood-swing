<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <main>
    <p>pemai kau</p>
    <p></p>

    <button
      class="bg-blue-600 p-4 rounded-sm hover:bg-blue-300 transition-all"
      @click="console.log('ini ke klik')"
    >
      Click Me
    </button>
    <v-btn>ini button dari vuetify</v-btn>
  </main>
</template>
