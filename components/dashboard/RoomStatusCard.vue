<template>
  <div
    class="rounded-lg p-3 text-center border-2"
    :class="getStatusClass(status)"
  >
    <div
      class="text-sm font-semibold mb-1 rounded-full px-2 py-0.5 inline-block"
      :class="getAvailabilityClass(status)"
    >
      {{ roomName }}
    </div>
    <div class="text-xs text-gray-700">{{ time }}</div>
    <div class="text-sm font-medium mt-1">{{ topic }}</div>
    <div class="text-xs text-gray-600">{{ user }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  roomName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    validator: (value) =>
      ["Available", "Occupied", "Maintenance"].includes(value),
  },
  time: {
    type: String,
    default: "XX:XX - XX:XX",
  },
  topic: {
    type: String,
    default: "",
  },
  user: {
    type: String,
    default: "",
  },
});

const getStatusClass = (status) => {
  switch (status) {
    case "Available":
      return "border-green-500 bg-green-50";
    case "Occupied":
      return "border-red-500 bg-red-50";
    case "Maintenance":
      return "border-gray-400 bg-gray-50";
    default:
      return "border-gray-300 bg-white";
  }
};

const getAvailabilityClass = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-500 text-white";
    case "Occupied":
      return "bg-red-500 text-white";
    case "Maintenance":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-300 text-gray-800";
  }
};
</script>

<style scoped>
/* ไม่มีโค้ด CSS หรือ Tailwind directives ที่ไม่จำเป็น หรือโค้ด JavaScript ในนี้ */
/* ถ้าต้องการเพิ่ม custom CSS ให้ใส่ที่นี่ */
</style>