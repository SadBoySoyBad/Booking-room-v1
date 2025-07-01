<template>
  <div>
    <!-- Navbar -->
    <header
      class="flex justify-between items-center px-6 py-4 bg-white text-black shadow-lg border-d border-b-1 border-black"
    >
      <!-- border-b border-black border-b-2 -->

      <!-- Logo -->
      <NuxtLink to="/" class="hover:underline transition">
        <div class="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" class="h-8 w-auto" />
          <h1 class="text-2xl font-bold">arrangemeet.</h1>
        </div>
      </NuxtLink>
      
      <div class="animation-container">
      <span class="scrolling-text">RukCom เป็นคนทำเว้ยย</span>
    </div>

      <!-- Navigation -->
      <nav class="flex items-center space-x-6 text-md font-semibold mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <NuxtLink to="/history" class="text-black hover:underline transition">
          History
        </NuxtLink>
        <NuxtLink to="/booking" class="hover:underline transition">
          Reservation
        </NuxtLink>

        <!-- ปุ่ม Login / Logout -->
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

    <!-- Main page content -->
    <NuxtPage />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// ✅ ใช้ useState เพื่อให้แชร์สถานะ login ได้ทุกหน้า
const isLoggedIn = useState("isLoggedIn", () => false);
const router = useRouter();

// ✅ อัปเดตสถานะตอนโหลด (เฉพาะ client เท่านั้น)
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


<style>
/* CSS สำหรับ Animation อักษรวิ่ง */

/* Container สำหรับจัดกึ่งกลาง Animation */
.animation-container {
    display: flex;
    justify-content: center; /* จัดกึ่งกลางแนวนอน */
    align-items: center;    /* จัดกึ่งกลางแนวตั้ง */
    width: 300px; /* **สำคัญ: กำหนดความกว้างของพื้นที่ที่ข้อความจะวิ่ง** */
    overflow: hidden; /* ซ่อนข้อความที่เกินขอบ */
    white-space: nowrap; /* ไม่ให้ข้อความขึ้นบรรทัดใหม่ */
}

/* ข้อความวิ่ง (Scrolling Text) */
.scrolling-text {
    font-size: 1.2em; /* ขนาดตัวอักษร */
    color: #007bff; /* สีตัวอักษร (สามารถเปลี่ยนเป็นสีอื่นได้) */
    font-weight: bold; /* ทำให้ตัวอักษรหนาขึ้น (ตามต้องการ) */
    display: inline-block; /* สำคัญเพื่อให้ animate ได้ */
    padding-left: 100%; /* ทำให้ข้อความเริ่มวิ่งจากนอกจอทางขวา */
    animation: scroll-left 5s linear infinite; /* ความเร็ว, รูปแบบ, วนซ้ำ */
    /*
      - scroll-left: คือชื่อของ @keyframes ที่เรากำหนด
      - 15s: คือใช้เวลา 15 วินาทีในการวิ่งครบ 1 รอบ
      - linear: คือความเร็วคงที่ตลอดการวิ่ง
      - infinite: คือให้เล่น animation ซ้ำไปเรื่อยๆ ไม่มีที่สิ้นสุด
    */
}

/* Keyframes สำหรับควบคุมการเลื่อนตำแหน่งของข้อความ */
@keyframes scroll-left {
    0% {
        transform: translateX(0%); /* เริ่มต้นที่ตำแหน่งปกติ (แต่มี padding-left 100% ทำให้เริ่มจากขวา) */
    }
    100% {
        transform: translateX(-100%); /* เลื่อนไปทางซ้ายจนสุด (หายไปจากจอ) */
    }
}

/*
หากต้องการให้วิ่งจากซ้ายไปขวา:
เปลี่ยน padding-left: 100%; เป็น padding-right: 100%;
และเปลี่ยน Keyframes เป็น:
@keyframes scroll-right {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
}
และใน .scrolling-text เปลี่ยน animation: scroll-left เป็น animation: scroll-right
*/
</style>