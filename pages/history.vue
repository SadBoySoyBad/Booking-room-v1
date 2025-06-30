<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top- 2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
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
              <svg v-if="item.statusType === 'Cancelled'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {{ item.statusType }}
            </button>
          </div>

          <div class="flex justify-center items-center">
            <HistoryActionPopUp @select-option="handleHistoryOptionSelect(index, $event)" />
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
import HistoryActionPopUp from '../components/HistoryActionPopUp.vue'; // <-- ตรวจสอบ Path นี้ให้ถูกต้องกับโครงสร้างโฟลเดอร์ของคุณ

// ตั้งค่า Title ของหน้าเว็บเมื่อ Component ถูก Mount
onMounted(() => {
  document.title = "History";
});

// ข้อมูลจำลองสำหรับตาราง (Mock Data)
const historyData = ref([
  {
    date: '01 Jan 23',
    time: '10:00 - 11:00',
    name: 'Meeting Room A',
    type: 'Request',
    actionType: 'Request',
    statusType: 'Approved',
  },
  {
    date: '05 Feb 23',
    time: '14:30 - 15:30',
    name: 'Projector B',
    type: 'Booking',
    actionType: 'Reserved',
    statusType: 'Approved',
  },
  {
    date: '10 Mar 23',
    time: '09:00 - 10:00',
    name: 'Laptop C',
    type: 'Request',
    actionType: 'Request',
    statusType: 'Pending',
  },
  {
    date: '15 Apr 23',
    time: '11:00 - 12:00',
    name: 'Conference Hall D',
    type: 'Booking',
    actionType: 'Reserved',
    statusType: 'Pending',
  },
  {
    date: '20 May 23',
    time: '16:00 - 17:00',
    name: 'Whiteboard E',
    type: 'Request',
    actionType: 'Request',
    statusType: 'Approved',
  },
]);

// ฟังก์ชันที่จะถูกเรียกเมื่อ HistoryActionPopUp ส่ง event 'select-option'
const handleHistoryOptionSelect = (index, option) => {
  if (option === 'edit') {
    editItem(historyData.value[index]);
  } else if (option === 'cancel') {
    // Logic การยกเลิก: เปลี่ยน statusType เป็น 'Cancelled'
    historyData.value[index].statusType = 'Cancelled';
    alert(`Item "${historyData.value[index].name}" has been cancelled.`);
  }
};

// ฟังก์ชันสำหรับจัดการการคลิกปุ่ม Edit
const editItem = (item) => {
  alert(`Editing item: ${item.name}`);
  // **NOTE:** หากในอนาคตคุณต้องการให้ "Edit" เปิดฟอร์มการจอง/แก้ไข
  // คุณจะต้องใช้การสื่อสารแบบ Global State Management (เช่น Vuex, Pinia)
  // หรือ emit เหตุการณ์ขึ้นไปให้คอมโพเนนต์แม่ (App.vue) จัดการ
  // เช่น: emit('open-edit-form', item);
};

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
    return 'bg-orange-100 text-orange-800';
  } else if (type === 'Cancelled') { // เพิ่ม class สำหรับสถานะ Cancelled
    return 'bg-red-100 text-red-800';
  }
  return '';
};
</script>

<style scoped>
/* คุณสามารถเพิ่มหรือปรับแต่ง CSS เพิ่มเติมที่นี่ได้ */
</style>