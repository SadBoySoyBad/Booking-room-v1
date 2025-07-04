<template>
  <div class="w-full h-48 flex items-end justify-around space-x-2">
    <div
      v-for="(data, index) in monthlyData"
      :key="index"
      class="flex flex-col items-center justify-end"
    >
      <div
        class="bg-blue-500 w-8 rounded-t-sm transition-all duration-300"
        :class="{ 'bg-blue-500': data.month === 'Apr', 'bg-gray-300': data.month !== 'Apr' }"
        :style="{ height: (data.value / 100) * 100 + '%' }"
      ></div>
      <span class="text-xs mt-1">{{ data.month }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const monthlyData = ref([
  { month: "Jan", value: 60 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 100 }, // Highlighted in the image
  { month: "May", value: 50 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 90 },
]);
</script>