<script setup>
import { getMood } from "@/model/model";
import { onMounted, ref, computed } from "vue";
const items = [
  { icon: "😂", day: "Saturday" },
  { icon: "😊", day: "Sunday" },
  { icon: "😐", day: "Monday" },
  { icon: "😓", day: "Friday" },
  { icon: "😭", day: "Thursday" },
];

const moods = ref([]);
let loading = ref(true);

async function fetchMoods() {
  try {
    loading.value = true;
    moods.value = await getMood();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  fetchMoods();
});

const latestMood = computed(() => {
  if (!moods.value.length) return null;
  return moods.value[0];
});

const iconMood = (mood) => {
  switch (mood) {
    case "happy":
      return "😂";
    case "excited":
      return "🤩";
    case "tired":
      return "😴";
    case "angry":
      return "😡";
    case "sad":
      return "😔";
  }
};

const moodColor = (mood) => {
  switch (mood) {
    case "happy":
      return "from-yellow-400 to-orange-400";
    case "excited":
      return "from-pink-400 to-red-400";
    case "tired":
      return "from-blue-400 to-indigo-400";
    case "angry":
      return "from-red-500 to-orange-500";
    case "sad":
      return "from-gray-400 to-blue-300";
    default:
      return "from-green-400 to-teal-400";
  }
};

const showDate = () => {
  const date = new Date();
  const locale = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return locale;
};

const parseDate = (date) => {
  if (!date) return "Unknown";

  if (date.seconds) {
    date = date.seconds * 1000;
  }

  const Day = new Date(date);
  const locale = Day.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return locale;
};

const parseDate2 = (date) => {
  if (!date) return "Unknown";

  if (date.seconds) {
    date = date.seconds * 1000;
  }

  const Day = new Date(date);
  const locale = Day.toLocaleDateString("en-US", {
    // day: "numeric",
    // weekday: "short",
    dateStyle: "full",
  });
  return locale;
};
</script>

<template>
  <main>
    <header class="flex justify-center">
      <div
        class="bg-[#BDE0FE] p-4 lg:p-8 mx-3 rounded-md w-full max-w-[90%] md:max-w-[75%]"
      >
        <div class="flex gap-0 lg:gap-4">
          <n-card class="flex-3" size="medium">
            <h5>Your Mood Today</h5>
            <p>{{ showDate() }}</p>
            <div
              v-if="latestMood"
              class="p-3 rounded-md inline-flex text-3xl text-white"
              :class="`bg-gradient-to-tr ${moodColor(latestMood.mood)}`"
            >
              {{ iconMood(latestMood.mood) }}
            </div>
            <p v-else class="text-gray-500 mt-2">No mood today</p>
          </n-card>
          <n-card size="small" class="flex-2">
            <p class="text-center text-gray-600">Statistic for demo</p>
          </n-card>
        </div>

        <div
          class="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 mt-4 scrollbar-hide"
        >
          <div v-for="item in moods" :key="item.id" class="snap-start shrink-0">
            <n-card
              class="rounded-md flex flex-col items-center select-none text-center"
              size="medium"
              hoverable
              style="width: 120px"
            >
              <h4 class="text-3xl">{{ iconMood(item.mood) }}</h4>
              <h5>{{ item.mood }}</h5>
              <p
                class="bg-gray-200 px-3 py-1 rounded-md mt-2 whitespace-nowrap"
              >
                {{ parseDate(item.date) }}
              </p>
            </n-card>
          </div>
        </div>
      </div>
    </header>

    <section role="main" class="mt-6 px-4">
      <header class="mb-4">
        <n-divider class="text-xl font-bold text-gray-700">
          <h1>📊 Statistic</h1>
        </n-divider>
      </header>

      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div v-if="loading" class="spinner-wrapper">
          <div class="spinner center">
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
          </div>
        </div>

        <n-card v-else-if="moods.length === 0">
          <h1>none mood yeah</h1>
        </n-card>

        <n-card
          v-for="item in moods"
          :key="item.id"
          v-else="moods.length === 0"
          class="rounded-xl shadow-md hover:shadow-lg transition-shadow select-none"
        >
          <div class="flex items-start gap-4">
            <!-- Mood Icon -->
            <div
              class="flex-shrink-0 p-4 rounded-lg text-white text-3xl"
              :class="`bg-gradient-to-tr ${moodColor(item.mood)}`"
            >
              {{ iconMood(item.mood) }}
            </div>

            <!-- Content -->
            <div class="flex-1">
              <div class="flex justify-between items-center flex-wrap gap-1">
                <h3 class="text-lg font-semibold capitalize">
                  {{ item.mood }}
                </h3>
                <span class="text-sm text-gray-500">{{
                  parseDate2(item.date)
                }}</span>
              </div>
              <p class="mt-2 text-gray-600 text-sm leading-relaxed">
                {{ item.text || "No description provided." }}
              </p>
            </div>
          </div>
        </n-card>
      </div>
    </section>

    <footer class="py-10 text-center"><p>hanam</p></footer>
  </main>
</template>

<style scoped>
main {
  overflow-y: scroll;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
