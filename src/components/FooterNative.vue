<script setup>
import { addMood, getMood } from "@/model/model";
import { HomeIcon, PlusIcon, History, ChartArea } from "lucide-vue-next";
import { ref } from "vue";
import { NModal, NForm, NInput, NSelect, NDatePicker, NButton } from "naive-ui";
import { RouterLink } from "vue-router";
import { useMoodStore } from "@/model/counterStore";

let showModal = useMoodStore();
let showAlert = ref(false);
let moodText = ref("");
let moodType = ref(null);
let moodDate = ref(Date.now());

const moodOptions = [
  { label: "😊 Happy", value: "happy" },
  { label: "😔 Sad", value: "sad" },
  { label: "😡 Angry", value: "angry" },
  { label: "😴 Tired", value: "tired" },
  { label: "🤩 Excited", value: "excited" },
];

async function saveMood() {
  const col = {
    mood: moodType.value,
    text: moodText.value,
    date: new Date(moodDate.value),
  };

  if (!moodType.value || !moodText.value.trim()) {
    showAlert.value = true;
    return;
  }

  await addMood(col);
  await getMood();
  // reset & close
  showModal.closeModal();
  moodText.value = "";
  moodType.value = null;
  moodDate.value = Date.now();
  showAlert.value = false;
}
</script>

<template>
  <n-modal
    v-model:show="showModal.showModal"
    preset="card"
    style="
      max-width: 400px;
      border-radius: 10px;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      background-color: rgba(162, 210, 255, 0.3);
    "
    title="🌈 What's Your Mood?"
    :mask-closable="false"
    @update:show="
      (val) => {
        if (!val) showAlert = false;
      }
    "
  >
    <n-form @submit="saveMood" label-placement="top">
      <!-- PILIH MOOD -->
      <n-select
        v-model:value="moodType"
        :options="moodOptions"
        placeholder="Select your mood"
        style="margin-bottom: 12px"
      />
      <!-- CURHAT -->
      <n-input
        v-model:value="moodText"
        type="textarea"
        placeholder="Write about your feeling..."
        rows="3"
        style="margin-bottom: 12px"
      />
      <!-- PILIH TANGGAL -->
      <n-date-picker
        v-model:value="moodDate"
        type="date"
        style="margin-bottom: 12px; width: 100%"
      />
      <n-alert v-show="showAlert" title="Alert" type="error" closeable>
        Please add your mood or cancel it
      </n-alert>
    </n-form>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px">
        <n-button type="error" @click="showModal.closeModal">Cancel</n-button>
        <n-button type="primary" @click="saveMood">Save</n-button>
      </div>
    </template>
  </n-modal>

  <footer class="p-4 rounded-2xl w-full md:w-[60%] lg:w-[75%] m-auto">
    <section class="flex justify-between">
      <n-popover trigger="hover">
        <template #trigger>
          <RouterLink
            to="/"
            class="icon-footer home bg-violet-400 rounded-xl p-2.5"
          >
            <HomeIcon color="white" :size="25" />
          </RouterLink>
        </template>
        <span>Home</span>
      </n-popover>

      <n-popover trigger="hover">
        <template #trigger>
          <button
            @click="showModal.openModal"
            class="icon-footer plus bg-cyan-400 rounded-xl p-2.5"
          >
            <PlusIcon color="white" :size="25"></PlusIcon>
          </button>
        </template>
        <span>Your Feeling</span>
      </n-popover>

      <n-popover>
        <template #trigger>
          <RouterLink
            to="/analytic"
            class="icon-footer analytic bg-pink-400 rounded-xl p-2.5"
          >
            <ChartArea color="white" :size="25"></ChartArea>
          </RouterLink>
        </template>
        <span>Analytic</span>
      </n-popover>

      <n-popover>
        <template #trigger>
          <RouterLink
            to="/history"
            class="icon-footer history bg-gray-400 rounded-xl p-2.5"
          >
            <History color="white" :size="25"></History>
          </RouterLink>
        </template>
        <span>History</span>
      </n-popover>
    </section>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  /* border: 1px solid #a2d2ff; */
  z-index: 50;
  background: rgba(162, 210, 255, 0.3);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  animation: appear 1.5s ease-in-out;
}

@keyframes appear {
  from {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.plus {
  transform: translateY(-5px) scale(1.1);
}

.icon-footer {
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.icon-footer:hover {
  transform: translateY(-18px) scale(1.15);
}

.icon-footer:active {
  transform: scale(0.85) translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.icon-footer.home:active {
  transform: scale(0.85) rotate(-20deg);
}

.icon-footer.plus:active {
  transform: scale(0.85) rotate(-80deg);
}

.icon-footer.analytic:active {
  transform: scale(0.85) rotate(10deg);
}

.icon-footer.history:active {
  transform: scale(0.85) rotate(-20deg);
}
</style>
