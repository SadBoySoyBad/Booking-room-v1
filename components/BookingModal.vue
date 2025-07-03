<template>
  <div class="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 gap-4 sm:gap-6 custom-grid-layout">
    <div class="col-span-1 border border-gray-300 rounded-xl p-3 sm:p-4 bg-white shadow min-h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] overflow-y-auto">
      <div class="flex justify-between items-center mb-3 sm:mb-4 bg-gray-200 rounded-full">
        <button
          class="bg-white rounded-full shadow-md p-1 w-6 h-6 sm:w-8 sm:h-8 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
          @click="prevMonth"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 class="text-base sm:text-xl font-bold">{{ months[month] }} {{ year }}</h2>

        <button
          class="bg-white rounded-full shadow-md p-1 w-6 h-6 sm:w-8 sm:h-8 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
          @click="nextMonth"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-7 gap-0.5 sm:gap-1 text-center justify-center">
        <div v-for="d in days" :key="d" class="font-semibold text-gray-500 mb-1 sm:mb-2 m-0.5 text-xs sm:text-base flex justify-center">{{ d }}</div>
        <div
          v-for="(day, idx) in calendarDays"
          :key="idx"
          class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer transition-all duration-150 text-xs sm:text-base"
          :class="[
            day.day && selectedDate !== day.date ? 'hover:bg-red-100 rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
            selectedDate === day.date ? 'bg-red-500 text-white rounded-full active:bg-red-600 active:scale-90 transition-all duration-100' : '',
            isToday(day.date) && day.day && selectedDate !== day.date ? 'bg-gray-200 rounded-full' : '', // Apply gray background for today only if not selected and valid day
          ]"
          @click="day.day && selectDate(day.date)"
        >
          {{ day.day || '' }}
        </div>
      </div>
      <div class="p-2 sm:p-3 flex flex-wrap justify-center items-center mt-3 sm:mt-4">
        <button class="bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full active:bg-blue-600 active:scale-95 transition-all duration-100 cursor-pointer text-sm sm:text-base mb-2 sm:mb-0"
          @click="openModal">Booking room</button> <NuxtLink to="/history" class="ml-0 sm:ml-2">
          <button class="bg-gray-300 hover:bg-gray-400 hover:shadow-lg text-gray-700 font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full active:bg-gray-500 active:scale-95 transition-all duration-100 cursor-pointer text-sm sm:text-base">History</button>
        </NuxtLink>
      </div>

      <div class="mt-4 sm:mt-6">
        <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Booking details</h3>
        <ul>
          <li
            v-for="meeting in meetingsOnSelectedDate"
            :key="meeting.id"
            class="text-xs sm:text-sm border-b py-1.5 sm:py-2"
          >
            <div>
              <span class="font-semibold">{{ meeting.time }}</span>
              <span> - </span>
              <span>{{ isUserRelated(meeting) ? meeting.topic + ' @ Room ' + meeting.room : 'Room ' + meeting.room + ' - Reserved' }}</span>
            </div>
          </li>
          <li v-if="meetingsOnSelectedDate.length === 0" class="text-center text-gray-500 text-xs sm:text-sm py-2">No bookings for this date.</li>
        </ul>
      </div>
    </div>

    <div class="col-span-1 custom-col-span-2-layout border border-gray-300 rounded-xl p-3 sm:p-6 bg-white shadow min-h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] overflow-y-auto">
      <h2 class="text-base sm:text-xl font-bold mb-3 sm:mb-4">Meetings on {{ selectedDate }}</h2>
      <div class="relative h-full border-l border-gray-300">
        <div v-for="h in 24" :key="h" class="h-10 sm:h-12 flex items-center text-xs sm:text-sm text-gray-500 pl-2 sm:pl-4 border-b border-gray-200 meeting-timeline-hourly-line">
          <span class="w-12 sm:w-16 inline-block text-right pr-2 sm:pr-4">{{ h.toString().padStart(2, '0') }}:00</span>
        </div>

        <div
          v-for="meeting in meetingsOnSelectedDate"
          :key="meeting.id"
          class="absolute left-14 sm:left-20 right-2 sm:right-4 text-xs rounded px-1.5 py-0.5 sm:px-2 sm:py-1 shadow-md transition-transform duration-150"
          :class="isUserRelated(meeting) ? 'bg-blue-500 text-white hover:scale-[1.01]' : 'bg-gray-200 text-gray-600'"
          :style="getMeetingStyle(meeting.time)"
        >
          <div class="font-bold text-xs sm:text-sm">
            {{ isUserRelated(meeting) ? meeting.topic : 'Room ' + meeting.room }}
          </div>
          <div class="text-xxs sm:text-xs">
            {{ meeting.time }} <span v-if="!isUserRelated(meeting)"> - Reserved</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BookingModal
    :visible="showModal"
    :selected-date="selectedDate"
    @close="handleCloseModal"
    @submit="handleBookingSubmit"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BookingModal from '../components/BookingModal.vue'

const showModal = ref(false)

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())
const selectedDate = ref(today.toISOString().split('T')[0])
const currentUser = ref('')
const isLoggedIn = ref(false)

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const allMeetings = ref([
  {
    id: 1,
    date: '2025-06-28',
    room: 'A',
    topic: 'Morning Brief',
    time: '08:00 - 09:30',
    user: 'test@gmail.com',
    participants: []
  },
  {
    id: 2,
    date: '2025-06-28',
    room: 'B',
    topic: 'Design Review',
    time: '14:00 - 15:00',
    user: 'test@gmail.com',
    participants: []
  },
  {
    id: 3,
    date: '2025-06-26',
    room: 'D',
    topic: 'Project Kickoff',
    time: '10:00 - 12:00',
    user: 'test@gmail.com',
    participants: []
  },
  {
    id: 4,
    date: '2025-06-26',
    room: 'C',
    topic: 'Weekly Sync',
    time: '13:00 - 14:30',
    user: 'test@gmail.com',
    participants: []
  },
  
])

const hourlyLineRenderedHeight = ref(48); 

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

const meetingsOnSelectedDate = computed(() => {
  return allMeetings.value.filter(m => m.date === selectedDate.value)
})

function isUserRelated(meeting) {
  return isLoggedIn.value && (meeting.user === currentUser.value || meeting.participants.includes(currentUser.value))
}

function selectDate(dateStr) {
  selectedDate.value = dateStr
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

function isToday(dateStr) {
  const todayStr = today.toISOString().split('T')[0]
  return todayStr === dateStr
}

function getMeetingStyle(time) {
  const [start, end] = time.split(' - ')
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  
  const pixelsPerMinute = hourlyLineRenderedHeight.value / 60;

  const top = (startH * 60 + startM) * pixelsPerMinute;
  const height = (endH * 60 + endM - (startH * 60 + startM)) * pixelsPerMinute;
  
  return `top: ${top}px; height: ${height}px;`;
}

function updateHourlyLineHeight() {
    const hourlyLineElement = document.querySelector('.meeting-timeline-hourly-line');
    if (hourlyLineElement) {
        hourlyLineRenderedHeight.value = hourlyLineElement.offsetHeight;
    }
}

onMounted(() => {
  if (import.meta.client) {
    updateHourlyLineHeight();
    window.addEventListener('resize', updateHourlyLineHeight);

    const guest = localStorage.getItem('guest')
    currentUser.value = guest || ''
    isLoggedIn.value = !!guest
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateHourlyLineHeight);
  }
});

// เปลี่ยน @click="showModal = true" ในปุ่ม Booking room เป็น @click="openModal"
function openModal() {
  showModal.value = true;
  console.log('Booking.vue: ปุ่ม "Booking room" ถูกคลิก! showModal.value เปลี่ยนเป็น:', showModal.value);
}

function handleBookingSubmit(newBooking){
  allMeetings.value.push({
    id: allMeetings.value.length + 1,
    date: newBooking.date,
    room: newBooking.room,
    topic: newBooking.topic || 'Untitled Meeting',
    time: newBooking.time,
    user: currentUser.value,
    participants: newBooking.participants.filter(p => p.trim()),
  });
  console.log("Booking.vue: New booking added:", newBooking);
  console.log("Booking.vue: All meetings:", allMeetings.value);
  showModal.value = false; // ปิด Modal หลังจาก Submit
  console.log("Booking.vue: หลัง Submit, showModal.value เปลี่ยนเป็น:", showModal.value);
}

const handleCloseModal = () => {
    showModal.value = false;
    console.log("Booking.vue: Received 'close' event from BookingModal. showModal set to FALSE.");
}
</script>

<style scoped>
/* Custom CSS for Grid Layout (to bypass Tailwind generation issue) */
/* This will make the main container a 3-column grid on medium screens and above */
@media (min-width: 768px) { /* This corresponds to Tailwind's 'md' breakpoint */
  .custom-grid-layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  /* This will make the timeline column span 2 units */
  .custom-col-span-2-layout {
    grid-column: span 2 / span 2;
  }
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>