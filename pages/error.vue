<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="relative p-12 text-center max-w-xl w-full ">
      <h1
        class="absolute top-35 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold text-red-300 opacity-50 z-0 tracking-widest pointer-events-none"
      >
        ERROR
      </h1>

      <p class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-8 relative z-10 mt-16 top-6">
        SOMETHING WENT WRONG!
      </p>

      <button
        class="bg-gradient-to-r from-rose-500 to-rose-700 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:from-rose-600 hover:to-rose-800 transition duration-300 relative z-10"
        @click="goToDashboard"
      >
        RETURN TO DASHBOARD
      </button>



      
    </div>
  </div>
</template>

<script setup>
// If you are using Vue 3 with Composition API, you might have a router
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDashboard = () => {
  // Replace '/dashboard' with the actual path to your dashboard
  router.push('/dashboard');
};
</script>

<style scoped>
/* Optional: If you need to fine-tune font sizes or other properties not easily achievable with Tailwind */
/* For example, if you want a specific font that's not a default Tailwind font */
/*
.text-\[8rem\] {
    font-size: 8rem;
}
*/
</style>