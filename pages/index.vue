<template>
  <div class="grid grid-cols-1 gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-10 custom-main-grid">
    <div class="p-2 border rounded sm:p-3 md:p-5">
      <h2 class="font-bold text-base m-1 sm:text-lg sm:m-2 md:text-lg md:m-5">Room Status</h2>
      <div
        v-for="room in rooms"
        :key="room.name"
        :class="[
          'rounded-full text-center py-1 sm:py-2 md:py-4 font-bold m-1 sm:m-2 md:m-5',
          room.status === 'AVAILABLE'
            ? 'border-green-600 border-2 text-green-600 bg-green-50'
            : room.status === 'OCCUPIED'
            ? 'border-red-600 border-2 text-red-600 bg-red-50'
            : 'bg-gray-200 border-1 text-gray-600'
        ]"
      >
        <p class="text-black text-lg sm:text-xl md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{{ room.name }}</p>
        <p class="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">{{ room.status }}</p>
      </div>
    </div>

    <div class="p-2 border rounded justify-center items-center sm:p-3 md:p-5">
      <div class="border rounded p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
        <div class="flex justify-between items-center mb-1 sm:mb-2 md:mb-4 bg-gray-200 rounded-full">
          <button
            class="bg-white rounded-full shadow-md p-0.5 w-6 h-6 m-0.5 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100 sm:w-7 sm:h-7 sm:p-1 md:w-8 md:h-8 md:p-2"
            @click="prevMonth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-600 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h2 class="text-sm sm:text-base md:text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ months[month] }} {{ year }}</h2>
          <button
            class="bg-white rounded-full shadow-md p-0.5 w-6 h-6 m-0.5 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100 sm:w-7 sm:h-7 sm:p-1 md:w-8 md:h-8 md:p-2"
            @click="nextMonth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-600 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-0.5 text-center justify-center text-xs sm:gap-1 sm:text-sm md:gap-2 md:text-base">
          <div v-for="d in days" :key="d" class="font-semibold text-gray-500 mb-0.5 m-0.5 text-xs sm:text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ d }}</div>
          <div
            v-for="(day, idx) in calendarDays"
            :key="idx"
            class="w-7 h-7 flex items-center justify-center cursor-pointer transition-all duration-150 text-xs sm:w-8 sm:h-8 sm:text-sm md:w-10 md:h-10 md:text-base"
            :class="[
              day.day && selectedDate !== day.date ? 'hover:bg-red-100 rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
              selectedDate === day.date ? 'bg-red-500 text-white rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
              isToday(day.date) ? 'bg-gray-200 rounded-full' : '',
            ]"
            @click="day.day && selectDate(day.date)"
          >
            {{ day.day || '' }}
          </div>
        </div>
      </div>

      <div class="border rounded p-2 sm:p-3 md:p-4 mt-2 sm:mt-3 md:mt-4">
        <h3 class="font-bold text-base sm:text-lg mb-1 sm:mb-2">Meeting Details</h3>

        <div v-if="isLoggedIn">
          <div v-if="filteredMeetings.length > 0">
            <div
              v-for="meeting in filteredMeetings"
              :key="meeting.id"
              class="mb-1 border border-gray-300 rounded p-1 sm:p-2 text-xs sm:text-sm md:text-base bg-green-50"
            >
              <p class="whitespace-nowrap overflow-hidden text-ellipsis"><strong>Topic:</strong> {{ meeting.topic }}</p>
              <p class="whitespace-nowrap overflow-hidden text-ellipsis"><strong>Room:</strong> {{ meeting.room }}</p>
              <p class="whitespace-nowrap overflow-hidden text-ellipsis"><strong>Time:</strong> {{ meeting.time }}</p>
              <p class="whitespace-nowrap overflow-hidden text-ellipsis"><strong>User:</strong> {{ meeting.user }}</p>
            </div>
          </div>
          <div v-else class="text-gray-500 italic mb-1 text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">No meetings for this date.</div>

          <div v-if="unauthorizedMeetings.length > 0">
            <div
              v-for="meeting in unauthorizedMeetings"
              :key="meeting.id"
              class="mb-1 border border-gray-200 rounded p-1 sm:p-2 text-gray-500 italic bg-gray-100 text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ meeting.room }} - OCCUPIED
            </div>
          </div>
        </div>

        <div v-else class="text-gray-500 italic text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">Please login to see details.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())
const selectedDate = ref(today.toISOString().split('T')[0])
const isLoggedIn = ref(false)
const currentUser = ref('')

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const rooms = [
  { name: 'Room A', status: 'AVAILABLE' },
  { name: 'Room B', status: 'OCCUPIED' },
  { name: 'Room C', status: 'AVAILABLE' },
  { name: 'Room D', status: 'MAINTENANCE' }
]

const allMeetings = [
  {
    id: 1,
    date: '2025-07-02',
    room: 'Room A',
    topic: 'Project Kickoff',
    time: '10:00-11:00',
    user: 'test@gmail.com',
    participants: ['a@example.com', 'b@example.com']
  },
  {
    id: 2,
    date: '2025-07-02',
    room: 'Room B',
    topic: 'Weekly Sync',
    time: '13:00-14:00',
    user: 'test@gmail.com',
    participants: []
  },
  {
    id: 3,
    date: '2025-07-03',
    room: 'Room A',
    topic: 'Project Follow-up',
    time: '10:00-12:00',
    user: 'test@gmail.com',
    participants: ['a@example.com', 'b@example.com']
  }
]

const calendarDays = computed(() => {
  const result = []
  const firstDay = new Date(year.value, month.value, 1).getDay()
  const lastDate = new Date(year.value, month.value + 1, 0).getDate()

  for (let i = 0; i < firstDay; i++) result.push({ day: null, date: null })

  for (let d = 1; d <= lastDate; d++) {
    const mm = String(month.value + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    const dateStr = `${year.value}-${mm}-${dd}`
    result.push({ day: d, date: dateStr })
  }

  return result
})

function isToday(dateStr) {
  const todayStr = new Date().toISOString().split('T')[0]
  return dateStr === todayStr
}

function selectDate(dateStr) {
  selectedDate.value = dateStr
  console.log('Selected Date:', selectedDate.value)
}

function prevMonth() {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}

function nextMonth() {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

const filteredMeetings = computed(() => {
  const storedGuest = localStorage.getItem('guest');
  let currentEmail = '';
  if (storedGuest) {
    try {
      const guestData = JSON.parse(storedGuest);
      if (guestData && guestData.type === 'microsoft') {
        currentEmail = 'microsoft@example.com';
      } else if (guestData && guestData.name) {
        currentEmail = guestData.email || guestData.name;
      }
    } catch (e) {
      console.error("Error parsing guest data from localStorage:", e);
    }
  }

  return allMeetings.filter(
    m =>
      m.date === selectedDate.value &&
      (m.user === currentEmail || m.participants.includes(currentEmail))
  )
})

const unauthorizedMeetings = computed(() => {
  const storedGuest = localStorage.getItem('guest');
  let currentEmail = '';
  if (storedGuest) {
    try {
      const guestData = JSON.parse(storedGuest);
      if (guestData && guestData.type === 'microsoft') {
        currentEmail = 'microsoft@example.com';
      } else if (guestData && guestData.name) {
        currentEmail = guestData.email || guestData.name;
      }
    } catch (e) {
      console.error("Error parsing guest data from localStorage:", e);
    }
  }

  return allMeetings.filter(
    m =>
      m.date === selectedDate.value &&
      !(m.user === currentEmail || m.participants.includes(currentEmail))
  )
})

onMounted(() => {
  if (import.meta.client) {
    const guest = localStorage.getItem('guest');
    if (guest) {
      isLoggedIn.value = true;
      try {
        const guestData = JSON.parse(guest);
        if (guestData.type === 'microsoft') {
          currentUser.value = 'microsoft@example.com';
        } else if (guestData.name) {
          currentUser.value = guestData.email || guestData.name;
        }
      } catch (e) {
        console.error("Error parsing guest data on mount:", e);
        isLoggedIn.value = false;
      }
    } else {
      isLoggedIn.value = false;
    }
  }
})
</script>

<style scoped>
/* Custom CSS for 2-column layout on medium screens and above */
/* This will make the main container a 2-column grid on medium screens and above */
@media (min-width: 768px) { /* This corresponds to Tailwind's 'md' breakpoint */
  /* Target .custom-main-grid directly and use !important to force override .grid-cols-1 */
  .custom-main-grid { /* Removed .grid for simpler selector, added !important */
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important; 
  }
}
</style>