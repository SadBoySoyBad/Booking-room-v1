<template>
  <div class="grid grid-cols-2 gap-8 p-10">
    <!-- ด้านซ้าย: สถานะห้อง -->
    <div class="p-5 border rounded">
      <h2 class="font-bold text-lg m-5">Room Status</h2>
      <div
        v-for="room in rooms"
        :key="room.name"
        :class="[
          'rounded-full text-center py-4 font-bold m-5',
          room.status === 'AVAILABLE'
            ? ' border-green-600 border-2 text-green-600 bg-green-50'
            : room.status === 'OCCUPIED'
            ? ' border-red-600 border-2 text-red-600 bg-red-50'
            : 'bg-gray-200 border-1 text-gray-600'
        ]"
      >
        <p class="text-black text-2xl">{{ room.name }}</p>
        <p class="font-bold">{{ room.status }}</p>
      </div>
    </div>

    <!-- ด้านขวา: ปฏิทิน + รายละเอียด -->
    <div class="p-5 border rounded justify-center items-center">
      <!-- ปฏิทิน -->
      <div class="border rounded p-4">
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

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-2 text-center justify-center">
          <div v-for="d in days" :key="d" class="font-semibold text-gray-500 mb-2 m-1 flex">{{ d }}</div>
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
      </div>

      <!-- Meeting Details -->
      <div class="border rounded p-4 mt-4">
        <h3 class="font-bold text-lg mb-2">Meeting Details</h3>

        <div v-if="isLoggedIn">
          <!-- ผู้มีสิทธิ์ -->
          <div v-if="filteredMeetings.length > 0">
            <div
              v-for="meeting in filteredMeetings"
              :key="meeting.id"
              class="mb-2 border border-gray-300 rounded p-2 bg-green-50"
            >
              <p><strong>Topic:</strong> {{ meeting.topic }}</p>
              <p><strong>Room:</strong> {{ meeting.room }}</p>
              <p><strong>Time:</strong> {{ meeting.time }}</p>
              <p><strong>User:</strong> {{ meeting.user }}</p>
            </div>
          </div>
          <div v-else class="text-gray-500 italic mb-2">No meetings for this date.</div>

          <!-- ไม่มีสิทธิ์ -->
          <div v-if="unauthorizedMeetings.length > 0">
            <div
              v-for="meeting in unauthorizedMeetings"
              :key="meeting.id"
              class="mb-2 border border-gray-200 rounded p-2 text-gray-500 italic bg-gray-100"
            >
              {{ meeting.room }} - OCCUPIED
            </div>
          </div>
        </div>

        <div v-else class="text-gray-500 italic">Please login to see details.</div>
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
    date: '2025-06-26',
    room: 'Room A',
    topic: 'Project Kickoff',
    time: '10:00-11:00',
    user: 'test@gmail.com',
    participants: ['a@example.com', 'b@example.com']
  },
  {
    id: 2,
    date: '2025-06-26',
    room: 'Room B',
    topic: 'Weekly Sync',
    time: '13:00-14:00',
    user: 'test@gmail.com',
    participants: []
  },
  {
    id: 3,
    date: '2025-06-27',
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
  return allMeetings.filter(
    m =>
      m.date === selectedDate.value &&
      (m.user === currentUser.value || m.participants.includes(currentUser.value))
  )
})

const unauthorizedMeetings = computed(() => {
  return allMeetings.filter(
    m =>
      m.date === selectedDate.value &&
      !(m.user === currentUser.value || m.participants.includes(currentUser.value))
  )
})

// Check login and get user only on client
onMounted(() => {
  if (import.meta.client) {
    const guest = localStorage.getItem('guest')
    currentUser.value = guest || ''
    isLoggedIn.value = !!guest
  }
})
</script>
