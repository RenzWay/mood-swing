<script setup>
import {
  deleteOldMoods,
  getMood,
  listenMoods,
  deleteMood,
} from "@/model/model";
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useMoodStore } from "@/model/counterStore";
import { Trash2Icon } from "lucide-vue-next";

let showModal = useMoodStore();
const moods = ref([]);
let loading = ref(true);
let unsubscribe = null; // simpan reference biar bisa stop listener

onMounted(() => {
  loading.value = true;
  unsubscribe = listenMoods(async (newMoods) => {
    moods.value = newMoods;
    await deleteOldMoods(3, moods);
    loading.value = false;
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const todayMood = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return moods.value.filter((item) => {
    if (!item.date) return false;
    let moodDate = item.date;
    if (moodDate.seconds) {
      moodDate = new Date(moodDate.seconds * 1000);
    } else {
      moodDate = new Date(moodDate);
    }
    moodDate.setHours(0, 0, 0, 0);
    return moodDate.getTime() === today.getTime();
  });
});

const latestMoodToday = computed(() => {
  return todayMoods.value.length ? todayMoods.value[0] : null;
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

const dayColor = (date) => {
  if (!date) return "from-gray-200 to-gray-300";

  // Convert Firestore timestamp ke Date biasa
  let moodDate = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
  const day = moodDate.getDay(); // 0 = Minggu, 6 = Sabtu

  switch (day) {
    case 0:
      return "from-pink-400 to-red-400"; // Minggu
    case 1:
      return "from-yellow-400 to-orange-400"; // Senin
    case 2:
      return "from-green-400 to-emerald-400"; // Selasa
    case 3:
      return "from-blue-400 to-indigo-400"; // Rabu
    case 4:
      return "from-purple-400 to-pink-400"; // Kamis
    case 5:
      return "from-teal-400 to-cyan-400"; // Jumat
    case 6:
      return "from-red-400 to-orange-400"; // Sabtu
    default:
      return "from-gray-200 to-gray-300";
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

const todayMoods = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return moods.value.filter((item) => {
    if (!item.date) return false;

    // Ambil tanggal dari Firestore timestamp atau Date
    let moodDate = item.date;
    if (moodDate.seconds) {
      moodDate = new Date(moodDate.seconds * 1000);
    } else {
      moodDate = new Date(moodDate);
    }
    moodDate.setHours(0, 0, 0, 0);

    return moodDate.getTime() === today.getTime();
  });
});

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
    dateStyle: "full",
  });
  return locale;
};
</script>

<template>
  <main>
    <header class="flex justify-center mt-6">
      <div
        class="bg-gradient-to-tr from-[#BDE0FE] via-[#cdb4db] to-[#a2d2ff] p-6 lg:p-8 mx-0 md:mx-3 rounded-3xl w-full max-w-[99%] md:max-w-[75%] shadow-xl border border-white/30 backdrop-blur-md"
      >
        <div class="flex gap-1 lg:gap-4">
          <!-- Mood Today Card -->
          <n-card
            class="flex-3 transition hover:scale-105 hover:shadow-lg duration-300 rounded-2xl text-white"
            size="medium"
            :bordered="false"
            content-class="p-5"
            :class="`bg-gradient-to-tr from-[#FFDEE9] to-[#B5FFFC]`"
          >
            <h5 class="text-lg font-bold drop-shadow-md">Your Mood Today</h5>
            <p class="text-sm opacity-90">{{ showDate() }}</p>
            <div
              v-if="latestMoodToday"
              class="p-4 rounded-2xl inline-flex text-4xl mt-3 shadow-md"
              :class="`bg-gradient-to-tr ${moodColor(latestMoodToday.mood)}`"
            >
              {{ iconMood(latestMoodToday.mood) }}
            </div>
            <p v-else class="opacity-80 mt-3 italic">No mood today</p>
          </n-card>

          <!-- Statistic Card -->
          <n-card
            size="small"
            class="flex-2 flex flex-col items-center justify-center rounded-2xl transition hover:scale-105 hover:shadow-lg duration-300 text-white"
            :bordered="false"
            content-class="p-5"
            :class="`bg-gradient-to-tr from-[#FDEB93] to-[#FEB692]`"
          >
            <span class="text-4xl mb-2">📊</span>
            <p class="font-bold drop-shadow-md">Statistics</p>
            <p class="text-sm opacity-90 italic">Coming soon...</p>
          </n-card>
        </div>

        <!-- Scrollable Mood History -->
        <div
          class="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 mt-6 scrollbar-hide"
        >
          <div
            v-for="item in moods"
            :key="item.id"
            class="snap-start shrink-0 transition-transform hover:scale-105"
          >
            <n-card
              class="rounded-2xl flex flex-col items-center select-none text-center shadow-md transition hover:shadow-xl hover:-translate-y-1"
              :class="`bg-gradient-to-tr ${moodColor(item.mood)}`"
              size="medium"
              hoverable
              style="width: 120px"
            >
              <h4 class="text-3xl">{{ iconMood(item.mood) }}</h4>
              <h5 class="capitalize mt-1 text-white">{{ item.mood }}</h5>
              <p
                class="px-3 py-1 rounded-md mt-2 text-xs whitespace-nowrap font-extrabold text-white"
                :class="`bg-gradient-to-tr ${dayColor(item.date)}`"
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
        <n-divider>
          <h1>Today 📅</h1>
        </n-divider>
      </header>
      <!-- md:grid-cols-2  -->
      <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
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

        <div v-else-if="todayMood.length === 0">
          <n-card
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px cyan solid;
              background-color: rgba(123, 223, 242, 0.4);
              backdrop-filter: blur(3px);
              border-radius: 8px;
            "
          >
            <h5>You don't have a mood add mood please.</h5>
            <n-button @click="showModal.openModal" type="success"
              >So what your mood today?</n-button
            >
          </n-card>
        </div>

        <n-card
          v-else
          v-for="item in todayMood"
          :key="item.id"
          class="relative rounded-xl shadow-md hover:shadow-lg transition-shadow select-none"
        >
          <div class="flex items-start gap-4">
            <!-- Mood Icon -->
            <div
              class="flex-shrink-0 p-4 rounded-lg text-white text-3xl"
              :class="`bg-gradient-to-tr ${moodColor(item.mood)}`"
            >
              {{ iconMood(item.mood) }}
            </div>

            <!-- Konten + Tombol Trash di Kanan -->
            <div class="flex-1 flex justify-between items-start gap-3">
              <div>
                <div class="flex flex-col justify-between flex-wrap gap-1">
                  <h3 class="text-lg font-semibold capitalize">
                    {{ item.mood }}
                  </h3>
                  <span class="text-sm text-gray-500">
                    {{ parseDate2(item.date) }}</span
                  >
                </div>
                <p class="mt-2 text-gray-600 text-sm leading-relaxed">
                  {{ item.text || "No description provided." }}
                </p>
              </div>

              <!-- Tombol Delete -->
              <n-button
                secondary
                type="error"
                size="small"
                class="flex-shrink-0"
                @click="deleteMood(item.id)"
              >
                <Trash2Icon size="18" />
              </n-button>
            </div>
          </div>
        </n-card>
      </div>
    </section>

    <footer class="py-10 text-center text-white"><p>hanam</p></footer>
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
