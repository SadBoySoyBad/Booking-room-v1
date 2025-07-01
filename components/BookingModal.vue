<!-- <template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-gray-500/40 transition-all duration-150">
    <div class="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl w-full max-w-2xl relative">
      <h2 class="text-2xl font-bold mb-6 text-center">Reservation</h2>

      <button class="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150" @click="close">✕</button> -->

<!-- Form -->
<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> -->
<!-- Column 1 -->
<!-- <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">Name</label>
            <input v-model="form.name" type="text" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100" placeholder="Name">
          </div>

          <div>
            <label class="text-sm font-medium">Room</label>
            <select v-model="form.room" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100">
              <option value="">Select Room</option>
              <option value="A">Room A</option>
              <option value="B">Room B</option>
              <option value="C">Room C</option>
              <option value="D">Room D</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium">Participants (Email)</label>
            <input v-model="form.participants" type="email" placeholder="example@gmail.com" class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100">
          </div>

          <div>
            <label class="text-sm font-medium">Equipment</label>
            <div class="flex flex-col space-y-1 mt-1">
              <label><input v-model="form.equipment" type="checkbox" value="Projector"> Projector</label>
              <label><input v-model="form.equipment" type="checkbox" value="Whiteboard"> Whiteboard</label>
              <label><input v-model="form.equipment" type="checkbox" value="Microphone"> Microphone</label>
              <label><input v-model="form.equipment" type="checkbox" value="Speaker"> HDMI cable</label>
            </div>
          </div>
        </div> -->

<!-- Column 2 -->
<!-- <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">Date</label>
            <input v-model="form.selectedDate" type="date" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-white cursor-pointer">
          </div>

          <div class="flex space-x-2">
            <div class="flex-1">
              <label class="text-sm font-medium">Start</label>
              <input v-model="form.start" type="time" min="10:00" max="18:00" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 hover:bg-gray-100 cursor-pointer">
            </div>
            <div class="flex-1">
              <label class="text-sm font-medium">End</label>
              <input v-model="form.end" type="time" min="10:00" max="18:00" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 hover:bg-gray-100 cursor-pointer">
            </div>
          </div>

          <div class="mt-6">
            <button class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 active:scale-95 transition-all" @click="submit">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits, reactive } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  selectedDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  name: '',
  room: '',
  participants: '',
  selectedDate: props.selectedDate,
  start: '',
  end: '',
  equipment: []
})

function close() {
  emit('close')
}

function submit() {
  const [startHour, startMin] = form.start.split(':').map(Number)
  const [endHour, endMin] = form.end.split(':').map(Number)

  const startTime = startHour * 60 + startMin
  const endTime = endHour * 60 + endMin

  if (endTime <= startTime) {
    alert('End time must be later than start time.')
    return
  }

  if (form.name === '') {
    alert('Please fill in Name.')
    return
    }
  if (form.room === '') {
    alert('Please select Room.')
    return
  }
  if (form.selectedDate === '') {
    alert('Please select Date.')
    return
  }
  if (form.start === '') {
    alert('Please select Start time.')
    return
  }
  if (form.end === '') {
    alert('Please select End time.')
    return
  }

  emit('submit', {
    ...form,
    date: form.selectedDate,
    time: `${form.start} - ${form.end}`
  })
  close()
}

</script> -->













<!-- เริ่ม -->



<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">

    <div class="bg-white rounded-3xl shadow-2xl w-[1000px] p-9 flex flex-row gap-10 border border-gray-300 relative">
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150 font-bold"
        @click="close">✕</button>

      <!-- Left: Calendar & Time -->
      <div class="w-1/2 flex flex-col gap-4 ">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Reservation</h2>

        <!-- Calendar Header -->
        <div class="flex justify-between items-center mb-4 bg-gray-200 rounded-full px-1 py-1">
          <button
            class="bg-white rounded-full shadow-md p-2 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
            @click="prevMonth">
            ❮
          </button>
          <h2 class="text-xl font-bold">{{ months[currentMonth] }} {{ currentYear }}</h2>
          <button
            class="bg-white rounded-full shadow-md p-2 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
            @click="nextMonth">
            ❯
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-2">
          <div v-for="d in days" :key="d" class="w-10 h-10 font-semibold text-gray-500 flex items-center justify-center">{{ d }}</div>
          <div
              v-for="(day, idx) in calendarDays"
              :key="idx"
              class="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-150"
              :class="[
                day.day && selectedDate !== day.date ? 'hover:bg-red-100 rounded-full active:bg-red-600 active:scale-90' : '',
                day.day && selectedDate === day.date ? 'bg-red-500 text-white rounded-full' : '',
                day.isToday && selectedDate !== day.date ? 'bg-gray-200 text-gray-700 rounded-full' : '',
                !day.day ? 'pointer-events-none' : ''
              ]"
              @click="day.day && selectDate(day.date)">
              {{ day.day || '' }}
          </div>
        </div>

        <!-- Time Input -->
        <div class="flex items-center gap-2 mt-4 text-sm">
          <label class="font-medium text-gray-700">Time :</label>
          <input v-model="form.start" type="time" class="border px-2 py-1 rounded-md">
          <span>-</span>
          <input v-model="form.end" type="time" class="border px-2 py-1 rounded-md">
        </div>

        <!-- Start & End Date -->
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex items-center gap-2">
            <label class="text-gray-700 font-medium">Start :</label>
            <input type="date" class="border px-2 py-1 rounded-md flex-grow" :value="selectedDate">
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 font-medium">End :</label>
            <input type="date" class="border px-2 py-1 rounded-md flex-grow" :value="selectedDate">
          </div>
        </div>
      </div>

      <!-- Right: Form Info -->
      <div class="w-1/2 mt-16 flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2">
          <label class="w-24 font-medium">Name :</label>
          <input 
            v-model="form.name" type="text" class="border px-3 py-1 rounded-md flex-grow"
            placeholder="Name Surname">
        </div>
        <div class="flex items-center gap-2">
          <label class="w-24 font-medium">Email :</label>
          <input 
            v-model="form.email" type="email" class="border px-3 py-1 rounded-md flex-grow"
            placeholder="example@email.com">
        </div>
        <div class="flex items-center gap-2">
          <label class="w-24 font-medium">Phone :</label>
          <input 
            v-model="form.phone" type="text" class="border px-3 py-1 rounded-md flex-grow"
            placeholder="000-000-0000">
        </div>
        <div class="flex items-center gap-2">
          <label class="w-24 font-medium">Room :</label>
          <div class="flex gap-2">
            <button 
              v-for="room in ['Meeting 1', 'Meeting 2', 'Meeting 3', 'Meeting 4',]" :key="room" :class="[
              'px-4 py-1 rounded-full border text-xs font-semibold active:bg-red-100 active:scale-95 transition-all duration-150',
              form.room === room ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            ]" @click="form.room = room">
              {{ room }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <label class="w-24 font-medium">Participants :</label>
          <span class="bg-gray-100 border px-4 py-1 rounded-md">{{ form.participants.length }}</span>
        </div>
        <div v-for="(email, i) in form.participants" :key="i" class="flex items-center gap-2">
          <input
            v-model="form.participants[i]" type="email" class="border px-3 py-1 rounded-md flex-grow"
            placeholder="example@email.com">
          <button class="text-red-500" @click="form.participants.splice(i, 1)">&ndash;</button>
        </div>
        <button class="text-sm text-blue-500 hover:underline self-start mt-1" @click="form.participants.push('')">+ Add
          Email</button>

        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label class="font-medium mb-1">Requirements :</label>
            <label class="flex items-center gap-2">
              <input v-model="form.requirements" type="checkbox" value="Device, Cable">
              Device, Cable
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.requirements" type="checkbox" value="Projector">
              Projector
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.requirements" type="checkbox" value="Whiteboard">
              Whiteboard
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.requirements" type="checkbox" value="HDMI Cable">
              HDMI Cable
            </label>
          </div>

        </div>


        <div class="flex gap-4 pt-6">
          <button  
            class="flex-1 py-2 rounded-full text-white font-semibold bg-[#b5c887] hover:bg-[#a4ba75] active:scale-95 transition-all duration-150 active:bg-green-1000"
            @click="submit">
            Confirm
          </button>
          <button class="flex-1 py-2 rounded-full text-white font-semibold bg-red-300 hover:bg-red-400 active:scale-95 transition-all duration-150 active:bg-red-500" @click="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['close', 'submit'])
watch(() => props.visible, (val) => {
  if (val) selectedDate.value = null // ✅ รีเซ็ตเมื่อ popup แสดง
})

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref(null)

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const firstDayOfWeek = date.getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const daysArray = []

  const today = new Date()
  const isToday = (d) => {
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear()
  }

  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push({ day: null, date: null, isToday: false })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(currentYear.value, currentMonth.value, i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    daysArray.push({
      day: i,
      date: dateStr,
      isToday: isToday(d)
    })
  }

  return daysArray
})


const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else currentMonth.value--
}
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else currentMonth.value++
}
const selectDate = (date) => selectedDate.value = date

const form = ref({
  name: '',
  email: '',
  phone: '',
  room: '',
  start: '',
  end: '',
  requirements: [],
  participants: ['']
})

const submit = () => {
  const [startHour, startMin] = form.value.start.split(':').map(Number)
  const [endHour, endMin] = form.value.end.split(':').map(Number)

  const start = startHour * 60 + startMin
  const end = endHour * 60 + endMin

  if (end <= start) {
    alert('End time must be later than start time.')
    return
  }

  if (form.value.name === '') {
    alert('Please fill in Name.')
    return
  }

  if (form.value.room === '') {
    alert('Please select Room.')
    return
  }

  if (selectedDate.value === null) {
    alert('Please select Date.')
    return
  }

  if (form.value.start === '') {
    alert('Please select Start time.')
    return
  }

  if (form.value.end === '') {
    alert('Please select End time.')
    return
  }

  if (form.value.phone === '') {
    alert('Please fill in Phone')
    return
  }

  emit('submit', {
    ...form.value,
    date: selectedDate.value,
    time: `${form.value.start} - ${form.value.end}`
  })

  close()
}


const close = () => emit('close')
</script>
