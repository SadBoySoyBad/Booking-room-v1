<template>
  <div>
    <!-- Navbar -->
    <header class="flex justify-between items-center px-6 py-4 bg-white text-black shadow-lg border-d border-b-1 border-black">  <!-- border-b border-black border-b-2 -->

      <!-- Logo -->
      <NuxtLink to="/" class="hover:underline transition">
      <div class="flex items-center space-x-2">
        <img src="/logo.png" alt="logo" class="h-8 w-auto">
        <h1 class="text-2xl font-bold">arrangemeet.</h1>
      </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center space-x-6 text-md font-semibold mr-5">
        <NuxtLink to="/letterbox" class="text-red-500 hover:underline transition">
          LetterBox
        </NuxtLink>
        <NuxtLink to="/booking" class="hover:underline transition">
          Reservation
        </NuxtLink>

        <!-- ปุ่ม Login / Logout -->
        <template v-if="isLoggedIn">
          <button class="hover:underline transition text-red-600" @click="logout">
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
import { useRouter } from 'vue-router'

// ✅ ใช้ useState เพื่อให้แชร์สถานะ login ได้ทุกหน้า
const isLoggedIn = useState('isLoggedIn', () => false)
const router = useRouter()

// ✅ อัปเดตสถานะตอนโหลด (เฉพาะ client เท่านั้น)
if (import.meta.client) {
  watchEffect(() => {
    isLoggedIn.value = !!localStorage.getItem('guest')
  })
}

// ✅ ฟังก์ชัน Logout
function logout() {
  localStorage.removeItem('guest')
  isLoggedIn.value = false
  router.push('/')
}
</script>
