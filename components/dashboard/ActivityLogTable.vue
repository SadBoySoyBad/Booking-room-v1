<template>
  <div class="overflow-x-auto flex-grow flex flex-col">
    <div class="min-w-full">
      <div class="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr] gap-x-4 pb-3 border-b border-gray-400 mb-2">
        <div class="font-bold text-gray-800 text-sm md:text-base">Date</div>
        <div class="font-bold text-gray-800 text-sm md:text-base">Time</div>
        <div class="font-bold text-gray-800 text-sm md:text-base">Name</div>
        <div class="font-bold text-gray-800 text-sm md:text-base">Role</div>
        <div class="font-bold text-gray-800 text-sm md:text-base">Action</div>
      </div>

      <div class="space-y-2 divide-y divide-gray-200">
        <div v-for="(log, index) in activityLogDataInternal" :key="index"
          class="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr] gap-x-4 items-center py-3"
        >
          <div class="text-gray-700 text-sm md:text-base break-words">{{ log.date }}</div>
          <div class="text-gray-700 text-sm md:text-base break-words">{{ log.time }}</div>
          <div class="text-gray-700 text-sm md:text-base break-words">{{ log.name }}</div>
          <div class="text-gray-700 text-sm md:text-base break-words">{{ log.role }}</div>
          <div class="flex items-center justify-center">
            <span :class="activityActionClass(log.actionType)"
                  class="px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-colors duration-200">
              <svg v-if="log.actionType === 'login' || log.actionType === 'logout'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <svg v-else-if="log.actionType === 'request'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg v-else-if="log.actionType === 'reserved'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else-if="log.actionType === 'add'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m0 0h-3m-6 4h10a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg v-else-if="log.actionType === 'edited'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ log.action }}
            </span>
          </div>
        </div>
        <div v-if="activityLogDataInternal.length === 0" class="text-center text-gray-500 py-4">
          No activity logs available.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  activityLogData: { // รับข้อมูลมาจาก Parent Component
    type: Array,
    default: () => [],
  },
  isModal: { // Prop ใหม่: เพื่อระบุว่า Table นี้แสดงอยู่ใน Modal หรือไม่
    type: Boolean,
    default: false
  }
});

const activityLogDataInternal = ref([]);

// Watch prop activityLogData และอัปเดต activityLogDataInternal
watch(() => props.activityLogData, (newVal) => {
  activityLogDataInternal.value = [...newVal];
}, { immediate: true });

const activityActionClass = (type) => {
  switch (type) {
    case 'login':
    case 'logout':
      return 'bg-gray-200 text-gray-800'; // Gray for login/logout
    case 'request':
      return 'bg-yellow-100 text-yellow-800'; // Yellow for Request
    case 'reserved':
      return 'bg-green-100 text-green-800'; // Green for Reserved
    case 'add':
      return 'bg-blue-100 text-blue-800'; // Blue for Add
    case 'edited':
      return 'bg-purple-100 text-purple-800'; // Purple for Edited
    default:
      return '';
  }
};
</script>

<style scoped>
/* เพิ่มสไตล์เฉพาะสำหรับคอมโพเนนต์นี้ถ้าจำเป็น */
</style>