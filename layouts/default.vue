<template>
  <div>
    <header
      class="flex justify-between items-center px-3 py-3 bg-white text-black shadow-lg border-b border-black sm:px-4 md:px-6"
    >
      <NuxtLink to="/" class="hover:underline transition flex-shrink-0">
        <div class="flex items-center space-x-1">
          <img src="/logo.png" alt="logo" class="h-6 w-auto sm:h-7 md:h-8" />
          <h1 class="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:text-xl md:text-2xl">arrangemeet.</h1>
        </div>
      </NuxtLink>

      <nav class="flex flex-nowrap items-center gap-x-1 text-xs font-bold mr-1 sm:gap-x-2 sm:text-sm md:gap-x-4 md:text-md lg:gap-x-6 lg:text-md md:mr-5">
        <div>
          <button
            @click="openLetterBox"
            class="text-red-500 hover:underline transition button-as-link whitespace-nowrap min-w-0"
          >
            <img src="/letterbox.png" alt="letterbox" class="h-4 w-auto mt-2 sm:h-5" />
          </button>

          <LetterBoxPopup
            :isVisible="isLetterBoxPopupVisible"
            @close-letter-box="isLetterBoxPopupVisible = false"
          />
        </div>

        <NuxtLink to="/history" class="hover:underline transition whitespace-nowrap min-w-0">
          History
        </NuxtLink>
        <NuxtLink to="/booking" class="hover:underline transition whitespace-nowrap min-w-0">
          Reservation
        </NuxtLink>

        <template v-if="isLoggedIn">
          <button
            class="hover:underline transition text-red-600 whitespace-nowrap min-w-0"
            @click="logout"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="hover:underline transition whitespace-nowrap min-w-0">
            Login
          </NuxtLink>
        </template>
      </nav>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useState } from "#app/composables/state";

// ✅ Import Component LetterBoxPopup.vue
import LetterBoxPopup from "~/components/LetterBoxPopup.vue";

// ✅ ตัวแปร ref สำหรับควบคุมการแสดง/ซ่อน Pop-up
const isLetterBoxPopupVisible = ref(false);

// ✅ ฟังก์ชันสำหรับเปิด Pop-up
const openLetterBox = () => {
  isLetterBoxPopupVisible.value = true;
};

// ✅ ใช้ useState สำหรับสถานะการ Login
const isLoggedIn = useState("isLoggedIn", () => false);
const router = useRouter();

// ✅ Logic สำหรับตรวจสอบสถานะ Login จาก localStorage
if (import.meta.client) {
  watchEffect(() => {
    isLoggedIn.value = !!localStorage.getItem("guest");
  });
}

// ✅ ฟังก์ชัน Logout
function logout() {
  localStorage.removeItem("guest");
  isLoggedIn.value = false;
  router.push("/");
}
</script>

<style scoped>
.button-as-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>