<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterNative from "./components/FooterNative.vue";
</script>

<template>
  <header class="flex gap-1">
    <img src="/mood.png" alt="icon mood" class="mood-img" />
    <h1>Mood Swing</h1>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="slide" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <FooterNative></FooterNative>
  </main>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 1em;
  margin: 0 0 1em 0;
  border-bottom: 2px solid gray;

  h1 {
    font-size: 1.5em;
  }
}

.mood-img {
  width: 50px;
  height: auto;
  object-fit: contain;
}

/* Responsif untuk mobile */
@media (max-width: 640px) {
  .mood-img {
    width: 40px;
  }
}

/* Responsif untuk desktop besar */
@media (min-width: 1024px) {
  .mood-img {
    width: 60px;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
