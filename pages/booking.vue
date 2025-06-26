export default defineNuxtConfig({ devtools: { enabled: true }, modules: [
'@nuxt/ui', // ต้องมีบรรทัดนี้ // ... โมดูลอื่นๆ ที่คุณเลือก เช่น '@nuxt/image',
'@nuxt/eslint' ], // คุณอาจจะมี tailwindcss object
เพิ่มเติมสำหรับการตั้งค่าที่กำหนดเอง // ui: { // // ... การตั้งค่า UI Components
// } })

<!-- <template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        Reserve
      </h1>
      <h1
        class="top-5 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Booking
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-center w-full">
      <div
        class="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full border-2 border-black"
      >
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
              >Name :</label
            >
            <input
              id="name"
              type="text"
              placeholder="Name Surname"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
            >
          </div>

          <div>
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Email :</label
            >
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
            >
          </div>

          <div>
            <label
              for="phone"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Phone :</label
            >
            <input
              id="phone"
              type="tel"
              placeholder="+00 000-0000"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
            >
          </div>

          <div>
            <label for="room" class="block text-gray-700 text-sm font-bold mb-2"
              >Room :</label
            >
            <select
              id="room"
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"
            >
              <option value="room1">Room 1</option>
              <option value="room2">Room 2</option>
              <option value="room3">Room 3</option>
            </select>
          </div>

          <div class="col-span-2">
            <label
              for="start-time"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Time :</label
            >
            <div class="flex items-center space-x-4">
              <select
                id="start-time"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"
              >
                <option value="08:00">08:00</option>
                <option value="08:00">08:30</option>
                <option value="09:00">09:00</option>
                <option value="08:00">09:30</option>
                <option value="08:00">10:00</option>
                <option value="08:00">10:30</option>
                <option value="08:00">11:00</option>
                <option value="08:00">11:30</option>
                <option value="08:00">12:00</option>
                <option value="08:00">12:30</option>
                <option value="08:00">13:00</option>
                <option value="08:00">13:30</option>
                <option value="08:00">14:00</option>
                <option value="08:00">14:30</option>
                <option value="08:00">15:00</option>
                <option value="08:00">15:30</option>
                <option value="08:00">16:00</option>
                <option value="08:00">16:30</option>
                <option value="08:00">17:00</option>
                <option value="08:00">17:30</option>
              </select>
              <span>-</span>
              <select
                id="end-time"
                class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"
              >
                <option value="08:00">08:30</option>
                <option value="09:00">09:00</option>
                <option value="08:00">09:30</option>
                <option value="08:00">10:00</option>
                <option value="08:00">10:30</option>
                <option value="08:00">11:00</option>
                <option value="08:00">11:30</option>
                <option value="08:00">12:00</option>
                <option value="08:00">12:30</option>
                <option value="08:00">13:00</option>
                <option value="08:00">13:30</option>
                <option value="08:00">14:00</option>
                <option value="08:00">14:30</option>
                <option value="08:00">15:00</option>
                <option value="08:00">15:30</option>
                <option value="08:00">16:00</option>
                <option value="08:00">16:30</option>
                <option value="08:00">17:00</option>
                <option value="08:00">17:30</option>
                <option value="08:00">18:00</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-center space-x-4">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          
          <NuxtLink to="/bookingconfirm">
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
          </NuxtLink>
          <button
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Reservation",
});
</script>

<style scoped>
/* CSS เพิ่มเติมหากจำเป็น (แต่ควรใช้ Tailwind เป็นหลัก) */
</style> -->


<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-4xl font-bold mb-2">Reservation</h1>
    <p class="text-gray-500 mb-6 text-lg">Reserve your meetings here.</p>
    <div class="grid grid-cols-2 gap-10">

      <!-- Calendar Left -->
      <div>
        <div class="border-b border-gray-300 mb-4"></div>
        <div class="flex items-center justify-between mb-4">
          <button class="text-xl">&#x276E;</button>
          <h2 class="text-lg font-medium">June 2025</h2>
          <button class="text-xl">&#x276F;</button>
        </div>
        <div class="grid grid-cols-7 gap-2 text-center text-gray-500">
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          <template v-for="d in 30" :key="d">
            <div class="text-black">{{ d }}</div>
          </template>
        </div>
      </div>

      <!-- Form Right -->
      <div class="space-y-4">
        <div>
          <label class="block font-medium">Name :</label>
          <input type="text" placeholder="Name Surname" class="w-full border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div>
          <label class="block font-medium">Email :</label>
          <input type="email" placeholder="example1234@email.com" class="w-full border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div>
          <label class="block font-medium">Phone :</label>
          <input type="tel" placeholder="+00012-345-6789" class="w-full border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div>
          <label class="block font-medium">Room :</label>
          <div class="flex gap-2 mt-1">
            <button class="border border-black rounded-full px-4 py-1">Room 1</button>
            <button class="bg-gray-400 text-white rounded-full px-4 py-1">Room 2</button>
            <button class="bg-red-700 text-white rounded-full px-4 py-1">Room 3</button>
          </div>
        </div>

        <div>
          <label class="block font-medium">Participants :</label>
          <input type="text" placeholder="00" class="w-full border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div>
          <label class="block font-medium">Requirements :</label>
          <input type="text" placeholder="Dropdown Lists" class="w-full border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div class="flex gap-2 items-center">
          <label class="font-medium">Time :</label>
          <input type="time" class="border border-gray-400 rounded-full px-4 py-1 w-[90px]" />
          <span>-</span>
          <input type="time" class="border border-gray-400 rounded-full px-4 py-1 w-[90px]" />
        </div>

        <div class="flex gap-2 items-center">
          <label class="font-medium">Start :</label>
          <input type="date" class="border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div class="flex gap-2 items-center">
          <label class="font-medium">End :</label>
          <input type="date" class="border border-gray-400 rounded-full px-4 py-1" />
        </div>

        <div class="flex gap-4 mt-4">
          <button class="bg-green-300 text-white rounded-full px-6 py-2">Confirm</button>
          <button class="bg-red-300 text-white rounded-full px-6 py-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Logic จะใส่ต่อภายหลัง เช่น router.push เมื่อ Confirm
</script>

<style scoped>
/* ปรับแต่งเพิ่มเติมหากต้องการ */
</style>
