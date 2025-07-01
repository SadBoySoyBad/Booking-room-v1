<!-- <script setup>
import { ref, computed, watch } from 'vue';

// --- useHead logic ---
// ตรวจสอบให้แน่ใจว่า 'useHead' สามารถใช้งานได้ในโปรเจกต์ของคุณ
// หากใช้ Nuxt 3, 'useHead' เป็น composable ที่ถูก import มาให้โดยอัตโนมัติ
// หากคุณใช้ Vue 3 บริสุทธิ์หรือ Vite, คุณอาจต้องติดตั้งและ import จากไลบรารีอื่น เช่น @vueuse/head
// ตัวอย่าง: import { useHead } from '@vueuse/head'; // (ถ้าจำเป็น)
useHead({
  title: "Bookingconfirm",
});

// --- Data Properties ---
const today = new Date();
const currentMonth = ref(today.getMonth()); // 0-11
const currentYear = ref(today.getFullYear());
const selectedDate = ref(null); // Format 'YYYY-MM-DD'

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// --- Computed Properties ---
const currentMonthName = computed(() => {
  return months[currentMonth.value];
});

const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1);
  const firstDayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

  const daysArray = [];

  // Add blank placeholders for days before the 1st of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push({ day: null, date: null });
  }

  // Add actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, i);
    daysArray.push({
      day: i,
      date: dayDate.toISOString().slice(0, 10) //YYYY-MM-DD
    });
  }
  return daysArray;
});

// --- Methods ---
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const isToday = (dateString) => {
  if (!dateString) return false;
  const todayString = today.toISOString().slice(0, 10);
  return dateString === todayString;
};

const selectDate = (date) => {
  selectedDate.value = date;
};

</script>

<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        Success
      </h1>
      <h1
        class="top-2 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Booking
      </h1>
    </div>

    <div
      class="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-6xl flex flex-row gap-10"
    >
      <div class="w-1/2 flex flex-col gap-6">
        <h2 class="text-3xl font-bold text-gray-800">Details</h2>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div class="flex justify-between items-center mb-4 bg-gray-200 rounded-full">
            <button
              class="bg-white rounded-full shadow-md p-2 w-8 h-8 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
              @click="prevMonth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h2 class="text-xl font-bold">{{ currentMonthName }} {{ currentYear }}</h2>

            <button
              class="bg-white rounded-full shadow-md p-2 w-8 h-8 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
              @click="nextMonth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-7 gap-2 text-center justify-center">
            <div v-for="d in days" :key="d" class="font-semibold text-gray-500 mb-2 m-1 flex justify-center">{{ d }}</div>
            
            <div
              v-for="(day, idx) in calendarDays"
              :key="idx"
              class="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-150"
              :class="[
                day.day && selectedDate !== day.date ? 'hover:bg-red-100 rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
                selectedDate === day.date ? 'bg-red-500 text-white rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
                isToday(day.date) ? 'bg-gray-200 rounded-full' : '',
                !day.day ? 'pointer-events-none' : '' // Disable clicks on blank days
              ]"
              @click="day.day && selectDate(day.date)"
            >
              {{ day.day || '' }}
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <label class="text-gray-700 font-medium whitespace-nowrap">Time :</label>
            <input type="time" class="border border-gray-300 rounded-md p-2 w-24 text-center" value="12:00" />
            <span class="text-gray-700 font-medium">-</span>
            <input type="time" class="border border-gray-300 rounded-md p-2 w-24 text-center" value="13:00" />
          </div>
          <div class="flex items-center gap-4">
            <label class="text-gray-700 font-medium whitespace-nowrap">Start :</label>
            <input type="text" class="border border-gray-300 rounded-md p-2 flex-grow" placeholder="YYYY-MM-DD" :value="selectedDate" />
          </div>
          <div class="flex items-center gap-4">
            <label class="text-gray-700 font-medium whitespace-nowrap">End :</label>
            <input type="text" class="border border-gray-300 rounded-md p-2 flex-grow" placeholder="YYYY-MM-DD" :value="selectedDate" />
          </div>
        </div>
      </div>

      <div class="w-1/2 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Name :</label>
          <input type="text" class="border border-gray-300 rounded-md p-2 flex-grow" value="Name Surname" />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Email :</label>
          <input type="email" class="border border-gray-300 rounded-md p-2 flex-grow" value="example@email.com" />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Phone :</label>
          <input type="text" class="border border-gray-300 rounded-md p-2 flex-grow" value="+00 012-345-6789" />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Room :</label>
          <div class="flex gap-2">
            <button class="border border-gray-300 rounded-full p-2 px-4 text-gray-700 hover:bg-gray-100">Room 1</button>
            <button class="border border-gray-300 rounded-full p-2 px-4 text-gray-700 hover:bg-gray-100">Room 2</button>
            <button class="bg-red-500 text-white rounded-full p-2 px-4 shadow-md">Room 3</button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Participants :</label>
          <span class="border border-gray-300 rounded-md p-2 px-4 bg-gray-100 font-medium">00</span>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Participant's Email :</label>
          <input type="email" class="border border-gray-300 rounded-md p-2 flex-grow" value="example1@email.com" />
        </div>
        <div class="flex items-center gap-2">
          <input type="email" class="border border-gray-300 rounded-md p-2 flex-grow" value="example2@email.com" />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-700 font-medium whitespace-nowrap">Requirements :</label>
          <select class="border border-gray-300 rounded-md p-2 flex-grow">
            <option>Device, Cable</option>
            <option>Projector</option>
            <option>Whiteboard</option>
          </select>
        </div>
        <div class="pt-6">
          <button class="w-full py-3 rounded-full text-white font-semibold text-lg bg-[#b5c887] hover:bg-[#a4ba75] transition-all duration-300">
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<!-- <template>
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
</script> --> 
<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        SUCCESSFUL
      </h1>
      <h1
        class="top-2 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Booking
      </h1>
    </div>

    <div
      class="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-4xl border-2 border-black/10 flex flex-col items-center"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-300 text-center w-full">Topic 01</h2>

      <div class="flex flex-row gap-8 items-start w-full"> 
        <div class="flex-shrink-0 w-1/2 flex justify-center items-center">
          <div
            class="w-full max-w-[300px] h-[250px] border-2 border-gray-400 flex items-center justify-center relative"
          >
            <span class="text-gray-600 font-bold text-lg">Meeting Room Blueprint</span>
            </div>
        </div>

        <div class="flex-grow w-1/2 text-gray-800 text-lg flex flex-col justify-between h-full">
          <div class="space-y-1.5 mb-4">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Date :</div>
              <div class="text-right">Day, DD MM</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Time :</div>
              <div class="text-right">00:00 - 00:00</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Meeting Room :</div>
              <div class="text-right">Room 1</div>
            </div>
          </div>

          <div class="space-y-1.5 mb-4">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Requirements :</div>
              <ul class="list-disc text-right pl-4"> 
                <li>Device</li>
                <li>Cable</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>

          <div class="space-y-1.5 mb-4">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Booked for :</div>
              <div class="text-right">Name Surname</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Phone :</div>
              <div class="text-right">+00 012-345-6789</div>
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Email :</div>
              <div class="text-right">example@email.com</div>
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="flex items-start justify-between w-full">
              <div class="font-bold whitespace-nowrap mr-2">Participant's Email :</div>
              <ul class="list-disc text-right pl-4"> <li>example1@email.com</li>
                <li>example2@email.com</li>
                <li>example3@email.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center w-full">
        <button
          @click="backToDashboard"
          class="w-full max-w-sm py-3 rounded-full text-white font-semibold text-lg bg-[#b5c887] hover:bg-[#a4ba75] transition-all duration-300"
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
/* คุณสามารถเพิ่มหรือปรับแต่ง CSS เพิ่มเติมที่นี่ได้ */
</style>