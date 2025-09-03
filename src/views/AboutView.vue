<script setup>
import { ref } from "vue";

const isLoggedIn = ref(false);
</script>

<template>
  <main class="about">
    <h1>This is an about page</h1>
    <div class="p-4">
      <button
        v-if="isLoggedIn"
        class="bg-red-500 text-white px-4 py-2 rounded"
        @click="isLoggedIn = false"
      >
        Logout
      </button>

      <button
        v-else
        class="bg-green-500 text-white px-4 py-2 rounded"
        @click="isLoggedIn = true"
      >
        Login
      </button>
      <input type="tel" name="" id="">
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
