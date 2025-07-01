<template>
  <div>
    <header
      class="flex justify-between items-center px-6 py-4 bg-white text-black shadow-lg border-b border-black"
    >
      <NuxtLink to="/" class="hover:underline transition">
        <div class="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" class="h-8 w-auto" />
          <h1 class="text-2xl font-bold">arrangemeet.</h1>
        </div>
      </NuxtLink>

      <nav class="flex items-center space-x-6 text-md font-bold mr-5">
        <div>
          <button
            @click="openLetterBox"
            class="text-red-500 hover:underline transition button-as-link"
          >
            <img src="/letterbox.png" alt="letterbox" class="h-6 w-auto" />
          </button>

          <LetterBoxPopup
            :isVisible="isLetterBoxPopupVisible"
            @close-letter-box="isLetterBoxPopupVisible = false"
          />
        </div>

        <NuxtLink to="/history" class="hover:underline transition">
          History
        </NuxtLink>
        <NuxtLink to="/booking" class="hover:underline transition">
          Reservation
        </NuxtLink>

        <template v-if="isLoggedIn">
          <button
            class="hover:underline transition text-red-600"
            @click="logout"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="hover:underline transition">
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
import { useState } from '#app/composables/state';

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
  /* คุณมี TailwindCSS classes อยู่แล้ว: text-red-500 hover:underline transition */
}
</style>