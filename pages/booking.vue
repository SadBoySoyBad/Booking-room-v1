<template>
  <div class="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">
    <!-- Sidebar Calendar -->
    <div class="col-span-1 border border-gray-300 rounded-xl p-4 bg-white shadow h-[calc(100vh-100px)] overflow-y-auto">
      <div class="flex justify-between items-center mb-4 bg-gray-200 rounded-full">
        <button
          class="bg-white rounded-full shadow-md p-2 w-8 h-8 m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
          @click="prevMonth"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 class="text-xl font-bold">{{ months[month] }} {{ year }}</h2>

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
          ]"
          @click="day.day && selectDate(day.date)"
        >
          {{ day.day || '' }}
        </div>
      </div>
      <!-- button -->
      <div class="p-3 justify-center items-center flex mt-4">
        <button class="bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded-full active:bg-blue-600 active:scale-95 transition-all duration-100 cursor-pointer" @click="showModal = true">Booking room</button>
        <button class="bg-gray-300 hover:bg-gray-400 hover:shadow-lg text-gray-700 font-bold py-2 px-4 rounded-full ml-2 active:bg-gray-500 active:scale-95 transition-all duration-100 cursor-pointer">History</button>
      </div>

      <!-- แสดงรายการจอง -->
      <div class="mt-6">
        <h3 class="font-semibold text-lg mb-2">Booking details</h3>
        <ul>
          <li
            v-for="meeting in meetingsOnSelectedDate"
            :key="meeting.id"
            class="text-sm border-b py-2"
          >
            <div>
              <span class="font-semibold">{{ meeting.time }}</span>
              <span> - </span>
              <span>{{ isUserRelated(meeting) ? meeting.topic + ' @ Room ' + meeting.room : 'Room ' + meeting.room + ' - Reserved' }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Side: Meeting Timeline -->
    <div class="col-span-2 border border-gray-300 rounded-xl p-6 bg-white shadow h-[calc(100vh-100px)] overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Meetings on {{ selectedDate }}</h2>
      <div class="relative h-full border-l border-gray-300">
        <div v-for="h in 24" :key="h" class="h-12 flex items-center text-sm text-gray-500 pl-4 border-b border-gray-200">
          <span class="w-16 inline-block text-right pr-4">{{ h.toString().padStart(2, '0') }}:00</span>
        </div>

        <div
          v-for="meeting in meetingsOnSelectedDate"
          :key="meeting.id"
          class="absolute left-20 right-4 text-sm rounded px-2 py-1 shadow-md transition-transform duration-150"
          :class="isUserRelated(meeting) ? 'bg-blue-500 text-white hover:scale-[1.01]' : 'bg-gray-200 text-gray-600'"
          :style="getMeetingStyle(meeting.time)"
        >
          <div class="font-bold">
            {{ isUserRelated(meeting) ? meeting.topic : 'Room ' + meeting.room }}
          </div>
          <div class="text-xs">
            {{ meeting.time }} <span v-if="!isUserRelated(meeting)"> - Reserved</span>
          </div>
        </div>
      </div>
    </div>
  <!-- Pop up -->
    <BookingModal
      :visible="showModal"
      :selected-date="selectedDate"
      @close="showModal = false"
      @submit="handleBookingSubmit"
    />
  </div>


</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

const allMeetings = [
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

const meetingsOnSelectedDate = computed(() => {
  return allMeetings.filter(m => m.date === selectedDate.value)
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
  const top = startH * 48 + startM * 0.8
  const height = (endH * 60 + endM - (startH * 60 + startM)) * 0.8
  return `top: ${top}px; height: ${height}px`
}

onMounted(() => {
  if (import.meta.client) {
    const guest = localStorage.getItem('guest')
    currentUser.value = guest || ''
    isLoggedIn.value = !!guest
  }
})

function handleBookingSubmit(newBooking){
  allMeetings.push({
    // id: allMeetings.length + 1,
    // ...newBooking,
    // user: currentUser.value,
    // participants: []
    id: allMeetings.length + 1,
    date: newBooking.date,
    room: newBooking.room,
    topic: newBooking.topic,
    time: newBooking.time,
    user: currentUser.value,
    participants: []
  })
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>
