<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Analytics Content (placeholder)</h2>
    <p>This is where your analytics graphs and data will go.</p>
    </div>
</template>

<script setup>
// กำหนดให้หน้านี้ใช้ AdminLayout.vue
definePageMeta({
  layout: 'admin-layout',
});

// กำหนด Title ของหน้า
useHead({
  title: "Analytics Admin",
});

// คุณสามารถเพิ่ม script setup สำหรับ logic ของหน้า Analytics ได้ที่นี่
</script>

<style scoped>
/* สไตล์สำหรับหน้า Analytics */
</style>