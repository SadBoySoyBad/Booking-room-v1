<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
    <div class="relative flex justify-center items-center h-[120px] sm:h-[150px] md:h-[180px] mb-4 sm:mb-6">
      <h1 class="absolute text-6xl sm:text-7xl md:text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-white/0 to-black/15 z-10 whitespace-nowrap">
        WELCOME
      </h1>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-black z-10 whitespace-nowrap">Log In</h2>
    </div>

    <div class="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-md w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-5">
      <h1 class="text-xl sm:text-2xl font-bold text-center">เข้าสู่ระบบ</h1>

      <div class="border-t border-gray-300 pt-4 sm:pt-5">
        <h2 class="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">สำหรับ Guest</h2>
        <form class="space-y-3 sm:space-y-4" @submit.prevent="handleGuestLogin">
          <input
            v-model="guest.name"
            required
            type="text"
            placeholder="ชื่อ"
            class="w-full p-2 text-sm sm:p-2.5 sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <input
            v-model="guest.phone"
            required
            type="tel"
            placeholder="เบอร์โทร"
            class="w-full p-2 text-sm sm:p-2.5 sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <input
            v-model="guest.company"
            type="text"
            placeholder="บริษัท (ไม่บังคับ)"
            class="w-full p-2 text-sm sm:p-2.5 sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 text-base rounded hover:bg-blue-700 transition"
          >
            เข้าใช้งานในฐานะ Guest
          </button>
        </form>
      </div>

      <div class="border-t border-gray-300 pt-4 sm:pt-5">
        <h2 class="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">สำหรับพนักงาน / แอดมิน</h2>
        <button
          class="w-full border border-blue-600 text-blue-600 py-2 text-base rounded hover:bg-blue-50 transition"
          @click="loginWithMicrosoft"
        >
          Login with Microsoft 365 <img src="/microsoft.png" alt="microsoft" class="h-5 w-auto ml-2 inline block mb-1">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// ✅ ใช้ useState เพื่อ sync กับ Navbar
const isLoggedIn = useState('isLoggedIn', () => false)
const router = useRouter()

const guest = reactive({
  name: '',
  phone: '',
  company: ''
})

// ถ้า login แล้วให้เด้งไปหน้า reservation เลย
if (import.meta.client && localStorage.getItem('guest')) {
  isLoggedIn.value = true
  router.push('/reservation')
}

// ✅ Login แบบ Guest
function handleGuestLogin() {
  const guestData = {
    name: guest.name,
    phone: guest.phone,
    company: guest.company
  }

  localStorage.setItem('guest', JSON.stringify(guestData))
  isLoggedIn.value = true
  router.push('/')
}

// ✅ Login แบบ Microsoft (mock ไว้ก่อน)
function loginWithMicrosoft() {
  localStorage.setItem('guest', JSON.stringify({ type: 'microsoft' }))
  isLoggedIn.value = true
  router.push('/')
}
</script>