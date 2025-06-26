<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        Overall
      </h1>

      <h1
        class="top-5 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Dashboard
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-center w-full">
      <div
        class="bg-white p-8 shadow-lg max-w-4xl w-full border-2 border-black"
      >
        <div class="grid grid-cols-2 gap-4 mb-6 items-stretch">
          <!-- box1 start -->
          <div
            name="box1"
            class="p-8 h-full w-full border-2 border-black flex flex-col space-y-4"
          >
            <div class="flex items-center justify-between w-full">
              <div
                name="room 1"
                class="bg-white hover:bg-green-400 border-2 border-green-800 rounded-full py-4 px-8 text-center"
                style="min-width: 150px; max-width: 200px"
              >
                <div class="text-black text-lg font-bold">Room 1</div>
                <div class="text-green-900 text-sm">AVAILABLE</div>
              </div>

              <div
                name="detail-entry-1"
                class="text-black text-lg font-bold text-left ml-8"
              >
                <div class="leading-tight">XX:XX - XX:XX,</div>
                <div class="leading-tight">Meeting Topic</div>
                <div class="inline-block pb-1 leading-tight">
                  Name Surname (ROLE)
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between w-full">
              <div
                name="room 2"
                class="bg-white border-2 hover:bg-red-300 border-red-600 rounded-full py-4 px-8 text-center"
                style="min-width: 150px; max-width: 200px"
              >
                <div class="text-black text-lg font-bold">Room 2</div>
                <div class="text-red-600 text-sm">OCCUPIED</div>
              </div>

              <div
                name="detail-entry-2"
                class="text-black text-lg font-bold text-left ml-8"
              >
                <div class="leading-tight">XX:XX - XX:XX,</div>
                <div class="leading-tight">Meeting Topic</div>
                <div class="inline-block pb-1 leading-tight">
                  Name Surname (ROLE)
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between w-full">
              <div
                name="room 3"
                class="bg-gray-200 border-2 border-gray-400 rounded-full py-4 px-8 text-center"
                style="min-width: 150px; max-width: 200px"
              >
                <div class="text-gray-600 text-lg font-bold">Room 3</div>
                <div class="text-gray-400 text-sm">MAINTENANCE</div>
              </div>

              <div
                name="detail-entry-3"
                class="text-black text-lg font-bold text-left ml-8"
              >
                <div class="leading-tight">XX:XX - XX:XX,</div>
                <div class="leading-tight">Meeting Topic</div>
                <div class="inline-block pb-1 leading-tight">
                  Name Surname (ROLE)
                </div>
              </div>
            </div>
          </div>
          <!-- box1 ended -->
          <!-- box2 start -->
          <div name="box2" class="p-8 h-full w-full border-2 border-black">
            <div
              name="main-table-container"
              class="w-full max-w-full mx-auto p-4 rounded-lg shadow-md"
            >
              <!-- หัวตาราง -->
              <div
                class="grid grid-cols-[1fr_1.5fr_2fr_1fr] gap-x-6 pb-3 border-b border-gray-400 mb-2"
              >
                <div class="font-bold text-gray-800 text-sm md:text-base">
                  Date
                </div>
                <div class="font-bold text-gray-800 text-sm md:text-base">
                  Name
                </div>
                <div class="font-bold text-gray-800 text-sm md:text-base">
                  Requests
                </div>
                <div
                  class="font-bold text-gray-800 text-sm md:text-base text-center"
                >
                  Approve
                </div>
              </div>

              <div name="table-body" class="space-y-2 divide-y divide-gray-200">
                <!-- Row -->
                <div
                  class="grid grid-cols-[1fr_1.5fr_2fr_1fr] gap-x-6 items-center py-3"
                >
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    DD Month YYYY
                  </div>
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    Name Surname
                  </div>
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    Room X
                  </div>
                  <div class="flex flex-col items-center space-y-2">
                    <button
                      class="bg-green-500 hover:bg-green-600 text-white font-bold py-0.5 px-3 rounded-full text-xs w-[70px] text-center"
                    >
                      Approve
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-3 rounded-full text-xs w-[70px] text-center"
                    >
                      Deny
                    </button>
                  </div>
                </div>

                <!-- Row 2 -->
                <div
                  class="grid grid-cols-[1fr_1.5fr_2fr_1fr] gap-x-6 items-center py-3"
                >
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    DD Month YYYY
                  </div>
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    Name Surname
                  </div>
                  <div class="text-gray-700 text-sm md:text-base break-words">
                    Room X
                  </div>
                  <div class="flex flex-col items-center space-y-2">
                    <button
                      class="bg-green-500 hover:bg-green-600 text-white font-bold py-0.5 px-3 rounded-full text-xs w-[70px] text-center"
                    >
                      Approve
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-3 rounded-full text-xs w-[70px] text-center"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- box2 ended -->
          <!-- box3 start -->
          <div
            name="box3"
            class="p-8 h-full w-full border-2 border-black text-center"
          >
            <div>
              <label for="history" class="text-black text-sm font-bold mb-2"
                >History</label
              >
            </div>

            <div>
              <label for="tobefilled" class="text-black text-sm font-bold mb-2"
                >To be filled:</label
              >
            </div>

            <div>
              <label for="summary" class="text-black text-sm font-bold mb-2"
                >Summary of Activities occurred (Type,Date,Booking info)</label
              >
            </div>

            <div>
              <label for="click" class="text-red-600 text-sm font-bold mb-2"
                >**Click to EXPAND as a POP-UP window for full info to
                edit**</label
              >
            </div>
          </div>
          <!-- box3 ended -->
          <!-- box4 start -->
          <div
            name="box4"
            class="p-8 h-full w-full border-2 border-black text-center"
          >
            <div>
              <label for="add" class="text-black text-sm font-bold mb-2"
                >Add Admin (Single Sign On)</label
              >
            </div>

            <div>
              <label for="tobefilled" class="text-black text-sm font-bold mb-2"
                >To be filled:</label
              >
            </div>

            <div>
              <label for="insert" class="text-black text-sm font-bold mb-2"
                >Insert"Admin"role form</label
              >
            </div>

            <div>
              <label for="click" class="text-red-600 text-sm font-bold mb-2"
                >**Click to EXPAND as a POP-UP window for full info to
                edit**</label
              >
            </div>
          </div>
          <!-- box4 ended -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "DashboardAdmin",
});
</script>

<style scoped>
/* Tailwind CSS classes should handle most styling, but you can add custom here if needed */
</style>
