<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-gray-500/40 transition-all duration-150">
    <div class="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl w-full max-w-2xl relative">
      <h2 class="text-2xl font-bold mb-6 text-center">Reservation</h2>

      <button class="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150" @click="close">✕</button>

      <!-- Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Column 1 -->
        <div class="space-y-4">
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
        </div>

        <!-- Column 2 -->
        <div class="space-y-4">
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

</script>
