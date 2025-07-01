<template>
  <div v-if="isVisible" class="fixed inset-0 backdrop-blur-sm bg-gray-600/20 bg-opacity-50 flex justify-center items-center z-50" @click.self="closePopup">
    <div class="bg-white rounded-lg p-6 shadow-xl w-11/12 max-w-md">
      <div class="flex items-center justify-center mb-5 text-lg font-bold text-gray-800 relative">
        <hr class="flex-grow border-t-2 border-gray-300 mx-2">
        <span>Letter Box</span>
        <hr class="flex-grow border-t-2 border-gray-300 mx-2">
        <button @click="closePopup" class="absolute top-0 right-0 -mt-2 -mr-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <ul class="space-y-4">
        <li v-for="(notification, index) in notifications" :key="index" class="flex items-start">
          <span class="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0 mt-2 mr-3"></span>
          <div class="flex-grow">
            <span :class="['font-medium', {'text-green-600': notification.status === 'approved', 'text-red-600': notification.status === 'canceled'}]">
              {{ notification.message }}
            </span>
            <span class="block text-right text-sm text-gray-500 mt-1">{{ notification.date }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // ต้อง import ref ถ้าใช้ script setup

// รับ props จาก parent component
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

// กำหนด events ที่จะ emit ไปยัง parent component
const emit = defineEmits(['close-letter-box']);

// ข้อมูลการแจ้งเตือน
const notifications = ref([
  { message: 'TopicXX Meeting in XX minutes!', status: '', date: 'DD, Mth XX:XX' },
  { message: 'Your request has been APPROVED!', status: 'approved', date: 'DD, Mth XX:XX' },
  { message: 'TopicXX Meeting has been CANCELED!', status: 'canceled', date: 'DD, Mth XX:XX' }
]);

// ฟังก์ชันสำหรับปิด Pop-up
const closePopup = () => {
  emit('close-letter-box');
};
</script>

<style scoped>
/* TailwindCSS จัดการเรื่อง style ให้ส่วนใหญ่ */
/* ถ้ามี custom style ที่ Tailwind ทำไม่ได้ค่อยเพิ่มตรงนี้ */
</style>