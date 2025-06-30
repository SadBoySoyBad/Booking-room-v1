<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        MANAGE
      </h1>
      <h1
        class="top-2 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        History
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-start w-full px-4">
      <div class="bg-white p-8 shadow-lg max-w-5xl w-full rounded-lg">
        <div
          class="grid grid-cols-[0.8fr_0.8fr_1.5fr_1fr_1.2fr_1.2fr_0.5fr] gap-x-4 pb-3 border-b border-gray-400 mb-2 items-center"
        >
          <div class="font-bold text-gray-800 text-sm md:text-base">Date</div>
          <div class="font-bold text-gray-800 text-sm md:text-base">Time</div>
          <div class="font-bold text-gray-800 text-sm md:text-base">Name</div>
          <div class="font-bold text-gray-800 text-sm md:text-base">Type</div>
          <div class="font-bold text-gray-800 text-sm md:text-base">Action</div>
          <div class="font-bold text-gray-800 text-sm md:text-base">Status</div>
          <div class="font-bold text-gray-800 text-sm md:text-base text-center">Manage</div>
        </div>

        <div v-for="(item, index) in historyData" :key="index"
          class="grid grid-cols-[0.8fr_0.8fr_1.5fr_1fr_1.2fr_1.2fr_0.5fr] gap-x-4 py-3 border-b border-gray-200 items-center"
        >
          <div class="text-sm md:text-base text-gray-700">{{ item.date }}</div>
          <div class="text-sm md:text-base text-gray-700">{{ item.time }}</div>
          <div class="text-sm md:text-base text-gray-700">{{ item.name }}</div>
          <div class="text-sm md:text-base text-gray-700">{{ item.type }}</div>
          
          <div class="flex items-center justify-center">
            <button
              :class="actionButtonClass(item.actionType)"
              class="px-2 py-1 rounded-full text-sm flex items-center gap-1 transition-colors duration-200"
            >
              <svg v-if="item.actionType === 'Request'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-if="item.actionType === 'Reserved'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ item.actionType }}
            </button>
          </div>

          <div class="flex items-center justify-center">
            <button
              :class="statusButtonClass(item.statusType)"
              class="px-2 py-1 rounded-full text-sm flex items-center gap-1 transition-colors duration-200"
            >
              <svg v-if="item.statusType === 'Approved'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-if="item.statusType === 'Pending'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ item.statusType }}
            </button>
          </div>

          <div class="flex justify-center items-center">
            <button class="text-gray-500 hover:text-gray-700 font-bold text-xl leading-none">...</button>
          </div>
        </div>

        <div v-if="historyData.length === 0" class="text-center text-gray-500 py-8">
            No history data available.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// ตั้งค่า Title ของหน้าเว็บเมื่อ Component ถูก Mount
onMounted(() => {
  document.title = "History";
});

// ข้อมูลจำลองสำหรับตาราง (Mock Data)
const historyData = ref([
  {
    date: 'DD MM YY',
    time: '00:00',
    name: 'Example1',
    type: 'Request',
    actionType: 'Request', // ใช้ 'Request' หรือ 'Reserved'
    statusType: 'Approved', // ใช้ 'Approved' หรือ 'Pending'
  },
  {
    date: 'DD MM YY',
    time: '00:00',
    name: 'Example2',
    type: 'Booking',
    actionType: 'Reserved',
    statusType: 'Approved',
  },
  {
    date: 'DD MM YY',
    time: '00:00',
    name: 'Example3',
    type: 'Request',
    actionType: 'Request',
    statusType: 'Pending',
  },
]);

// Computed properties หรือ methods สำหรับกำหนด class ของปุ่ม Action/Status
const actionButtonClass = (type) => {
  if (type === 'Request') {
    return 'bg-yellow-100 text-yellow-800';
  } else if (type === 'Reserved') {
    return 'bg-green-100 text-green-800';
  }
  return '';
};

const statusButtonClass = (type) => {
  if (type === 'Approved') {
    return 'bg-green-100 text-green-800';
  } else if (type === 'Pending') {
    return 'bg-orange-100 text-orange-800'; // ใช้ orange เพื่อให้เข้ากับสีทรายในรูป
  }
  return '';
};
</script>

<style scoped>
/* คุณสามารถเพิ่มหรือปรับแต่ง CSS เพิ่มเติมที่นี่ได้ */
</style>