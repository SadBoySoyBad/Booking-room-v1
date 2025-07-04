<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="relative w-32 h-32 mb-4">
      <div
        class="absolute inset-0 rounded-full bg-gray-200"
        style="
          background: conic-gradient(
            #f9a8d4 0% 65%,
            #e2e8f0 65% 100%
          ); /* Approximation */
        "
      ></div>
      <div
        class="absolute inset-4 rounded-full bg-white flex items-center justify-center text-lg font-bold"
      >
        1000
      </div>
    </div>
    <div class="text-lg font-semibold mb-2">Total Events</div>
    <ul class="text-sm text-gray-700">
      <li>Guests: 650</li>
      <li>Users: 250</li>
      <li>Admin: 100</li>
    </ul>
  </div>
</template>

<script setup></script>