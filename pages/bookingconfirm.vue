<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-6xl sm:text-7xl md:text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest whitespace-nowrap"
      >
        SUCCESSFUL
      </h1>
      <h1
        class="top-2 text-4xl sm:text-5xl md:text-[3rem] font-bold text-black relative z-10 text-center leading-none mt-4 sm:mt-0"
      >
        Booking
      </h1>
    </div>

    <div
      class="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-4xl border-2 border-black/10 flex flex-col items-center"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b-2 border-gray-300 text-center w-full">Topic 01</h2>

      <div class="flex flex-col gap-4 sm:gap-6 md:gap-8 items-start w-full booking-content-layout"> 
        <div class="flex-shrink-0 w-full booking-blueprint-width flex justify-center items-center">
          <div
            class="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-[180px] sm:h-[220px] md:h-[250px] border-2 border-gray-400 flex items-center justify-center relative overflow-hidden"
          >
            <span class="text-gray-600 font-bold text-sm sm:text-base md:text-lg text-center leading-tight">Meeting Room Blueprint</span>
          </div>
        </div>

        <div class="flex-grow w-full booking-details-width text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg flex flex-col justify-between h-full pb-2 no-scrollbar">
          <div class="space-y-1 mb-2 sm:mb-3 min-w-fit">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Date :</div>
              <div class="text-right">Day, DD MM</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Time :</div>
              <div class="text-right">00:00 - 00:00</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Meeting Room :</div>
              <div class="text-right">Room 1</div>
            </div>
          </div>

          <div class="space-y-1 mb-2 sm:mb-3 min-w-fit">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Requirements :</div>
              <ul class="list-disc text-right pl-4 text-xs sm:text-sm md:text-base"> 
                <li>Device</li>
                <li>Cable</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>

          <div class="space-y-1 mb-2 sm:mb-3 min-w-fit">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Booked for :</div>
              <div class="text-right">Name Surname</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Phone :</div>
              <div class="text-right">+00 012-345-6789</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Email :</div>
              <div class="text-right">example@email.com</div>
            </div>
          </div>

          <div class="space-y-1 min-w-fit">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold mr-2 whitespace-nowrap">Participant's Email :</div>
              <ul class="list-disc text-right pl-4 text-xs sm:text-sm md:text-base">
                <li>example1@email.com</li>
                <li>example2@email.com</li>
                <li>example3@email.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 flex justify-center w-full">
        <button
          @click="backToDashboard"
          class="w-full max-w-sm py-2 sm:py-3 rounded-full text-white font-semibold text-base sm:text-lg bg-[#b5c887] hover:bg-[#a4ba75] transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
useHead({
  title: "Bookingconfirm",
});

const router = useRouter();

const backToDashboard = () => {
  router.push('/dashboardadmin');
};
</script>

<style scoped>
/* Custom CSS for Responsive Layout (to bypass Tailwind generation issue) */
@media (min-width: 768px) { /* This corresponds to Tailwind's 'md' breakpoint */
  .booking-content-layout {
    flex-direction: row; /* Make content arrange in a row */
  }
  .booking-blueprint-width {
    width: 50%; /* Blueprint takes 50% width */
  }
  .booking-details-width {
    width: 50%; /* Details take 50% width */
    overflow-x: auto; /* Allow horizontal scroll for details if content overflows */
  }
}


/* Optional: Hide scrollbar for a cleaner look, while still allowing scroll */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>