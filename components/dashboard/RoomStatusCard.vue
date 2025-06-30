<template>
  <div class="flex flex-col space-y-4 items-center justify-center w-full h-full">
    <div v-for="room in roomStatus" :key="room.id" class="flex items-center justify-center w-full" style="max-width: 450px;"> <div
        :class="roomButtonClass(room.status)"
        class="rounded-full py-4 text-center flex-none"
        style="width: 150px;"  >
        <div class="flex-1">
            <div :class="roomTextClass(room.status)" class="text-lg font-bold">{{ room.name }}</div>
            <div :class="roomTextClass(room.status)" class="text-sm">{{ room.status.toUpperCase() }}</div>
        </div>
      </div>

      <div class="text-black text-lg font-bold text-left pl-8 flex-1"> <div class="leading-tight">{{ room.time }},</div>
        <div class="leading-tight">{{ room.topic }}</div>
        <div class="inline-block pb-1 leading-tight">{{ room.user }} ({{ room.role }})</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const roomStatus = ref([
  { id: 1, name: 'Room 1', status: 'available', time: '10:00 - 11:00', topic: 'Meeting Topic', user: 'Name Surname', role: 'ROLE' },
  { id: 2, name: 'Room 2', status: 'occupied', time: '11:30 - 12:30', topic: 'Project Discussion', user: 'Name Surname', role: 'ROLE' },
  { id: 3, name: 'Room 3', status: 'maintenance', time: 'XX:XX - XX:XX', topic: 'Maintenance', user: 'Name Surname', role: 'ROLE' },
]);

const roomButtonClass = (status) => {
  switch (status) {
    case 'available':
      return 'bg-white hover:bg-green-100 border-2 border-green-800';
    case 'occupied':
      return 'bg-white hover:bg-red-100 border-2 border-red-600';
    case 'maintenance':
      return 'bg-gray-200 border-2 border-gray-400';
    default:
      return '';
  }
};

const roomTextClass = (status) => {
  switch (status) {
    case 'available':
      return 'text-black text-green-900';
    case 'occupied':
      return 'text-black text-red-600';
    case 'maintenance':
      return 'text-gray-600 text-gray-400';
    default:
      return 'text-black';
  }
};
</script>

<style scoped>
/* เพิ่มสไตล์เฉพาะสำหรับคอมโพเนนต์นี้ถ้าจำเป็น */
</style>