<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        Success
      </h1>
      <h1
        class="top-5 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Booking
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-center w-full">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full border-2 border-black">
        <div class="flex flex-col gap-4 mb-6 items-center">
          <div>
            <label for="confirm" class="text-black text-sm font-bold mb-2"
              >**Confirm Booking Information**</label
            >
          </div>

          <div>
            <label for="tobefiled" class="text-black text-sm font-bold mb-2"
              >To be filled:</label
            >
          </div>

          <div>
            <label for="DDMMYYYY" class="text-black text-sm font-bold mb-2"
              >DD MM YYYY 00:00</label
            >
          </div>

          <div>
            <label for="numtopic" class="text-black text-sm font-bold mb-2"
              >Meetingroom | Topic</label
            >
          </div>

          <div>
            <label for="reserver" class="text-black text-sm font-bold mb-2"
              >Reserver</label
            >
          </div>

          <div>
            <label for="participants" class="text-black text-sm font-bold mb-2"
              >Participants</label
            >
          </div>

          <div>
            <label for="qr" class="text-red-600 text-sm font-bold mb-2"
              >*QR Code*</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Bookingconfirm",
});
</script>
