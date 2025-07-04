<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-2 sm:p-4">
    <div
      class="bg-white rounded-3xl shadow-2xl max-w-[90vw] lg:max-w-[1000px] p-4 sm:p-6 md:p-8 relative overflow-y-auto max-h-[95vh] modal-root-container"
    >
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150 font-bold text-lg"
        @click="close"
      >
        ✕
      </button>
      <!-- Left: Calendar & Time -->
      <div class="modal-content-wrapper">
        <div class="flex flex-col gap-3 sm:gap-4">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
            Reservation
          </h2>
          <!-- Calendar Header -->
          <div
            class="flex justify-between items-center mb-3 bg-gray-200 rounded-full px-1 py-1"
          >
            <button
              class="bg-white rounded-full shadow-md p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
              @click="prevMonth"
            >
              ❮
            </button>
            <h2 class="text-base sm:text-lg font-bold">
              {{ months[currentMonth] }} {{ currentYear }}
            </h2>
            <button
              class="bg-white rounded-full shadow-md p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-300 active:scale-95 transition-all duration-100"
              @click="nextMonth"
            >
              ❯
            </button>
          </div>
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-2 sm:gap-1 text-center">
            <div
              v-for="d in days"
              :key="d"
              class="font-semibold text-gray-500 mb-1 text-xs sm:text-sm flex items-center justify-center h-10 w-10 sm:h-8"
            >
              {{ d }}
            </div>
            <div
              v-for="(day, idx) in calendarDays"
              :key="idx"
              class="day-cell-wrapper w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-150 text-xs sm:text-sm"
              :class="[
                day.day && selectedDateProp !== day.date
                  ? 'hover:bg-red-100 rounded-full active:bg-red-600 active:scale-90'
                  : '',
                day.day && selectedDateProp === day.date
                  ? 'bg-red-500 text-white rounded-full'
                  : '',
                day.isToday && selectedDateProp !== day.date && day.day
                  ? 'bg-gray-200 text-gray-700 rounded-full'
                  : '',
                !day.day ? 'pointer-events-none' : '',
              ]"
              @click="day.day && selectDate(day.date)"
            >
              {{ day.day || '' }}
            </div>
          </div>
          <!-- Time Input -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3 text-sm">
            <label class="font-medium text-gray-700 whitespace-nowrap">Time :</label>
            <div class="flex gap-2 w-full">
              <input
                v-model="form.start"
                type="time"
                class="border px-2 py-1 rounded-md cursor-pointer flex-grow min-w-0"
              >
              <span>-</span>
              <input
                v-model="form.end"
                type="time"
                class="border px-2 py-1 rounded-md cursor-pointer flex-grow min-w-0"
              >
            </div>
          </div>
          <!-- Start & End Date -->
          <div class="flex flex-col gap-2 text-sm">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label class="text-gray-700 font-medium whitespace-nowrap">Start :</label>
              <input
                type="date"
                class="border px-2 py-1 rounded-md flex-grow cursor-pointer w-full"
                :value="selectedDateProp"
                readonly
              >
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label class="text-gray-700 font-medium whitespace-nowrap">End :</label>
              <input
                type="date"
                class="border px-2 py-1 rounded-md flex-grow cursor-pointer w-full"
                :value="selectedDateProp"
                readonly
              >
            </div>
          </div>
        </div>
        <!-- Right: Form Info -->
        <div class="mt-0 md:mt-16 flex flex-col gap-2 text-sm">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label class="w-auto sm:w-24 font-medium whitespace-nowrap">Name :</label>
            <input
              v-model="form.name"
              type="text"
              class="border px-3 py-1 rounded-md flex-grow w-full"
              placeholder="Name Surname"
            >
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label class="w-auto sm:w-24 font-medium whitespace-nowrap">Email :</label>
            <input
              v-model="form.email"
              type="email"
              class="border px-3 py-1 rounded-md flex-grow w-full"
              placeholder="example@email.com"
            >
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label class="w-auto sm:w-24 font-medium whitespace-nowrap">Phone :</label>
            <input
              v-model="form.phone"
              type="text"
              class="border px-3 py-1 rounded-md flex-grow w-full"
              placeholder="000-000-0000"
            >
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label class="w-auto sm:w-24 font-medium whitespace-nowrap">Room :</label>
            <div class="flex flex-wrap gap-2 flex-grow">
              <button
                v-for="room in ['Meeting 1', 'Meeting 2', 'Meeting 3', 'Meeting 4']"
                :key="room"
                :class="[
                  'px-3 py-1 rounded-full border text-xs font-semibold active:bg-red-100 active:scale-95 transition-all duration-150 cursor-pointer ',
                  form.room === room ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="form.room = room"
              >
                {{ room }}
              </button>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label class="w-auto sm:w-24 font-medium whitespace-nowrap">Participants :</label>
            <span class="bg-gray-100 border px-4 py-1 rounded-md">{{
              form.participants.length
            }}</span>
          </div>
          <div
            v-for="(email, i) in form.participants"
            :key="i"
            class="flex items-center gap-2"
          >
            <input
              v-model="form.participants[i]"
              type="email"
              class="border px-3 py-1 rounded-md flex-grow min-w-0"
              placeholder="example@email.com"
            >
            <button class="text-red-500 cursor-pointer hover:text-red-600 transition-all duration-150" @click="form.participants.splice(i, 1)">
              &ndash;
            </button>
          </div>
          <button
            class="text-sm text-blue-500 hover:underline self-start mt-1 cursor-pointer transition-all duration-150"
            @click="form.participants.push('')"
          >
            + Add Email
          </button>

          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
              <label class="font-medium mb-1">Requirements :</label>
              <label class="flex items-center gap-2">
                <input v-model="form.requirements" type="checkbox" value="Device, Cable" >
                Device, Cable
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.requirements" type="checkbox" value="Projector" >
                Projector
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.requirements" type="checkbox" value="Whiteboard" >
                Whiteboard
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.requirements" type="checkbox" value="HDMI Cable" >
                HDMI Cable
              </label>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              class="flex-1 py-2 rounded-full text-white font-semibold bg-[#b5c887] hover:bg-[#a4ba75] active:scale-95 transition-all duration-150 active:bg-green-1000 cursor-pointer"
              @click="submit"
            >
              Confirm
            </button>
            <button
              class="flex-1 py-2 rounded-full text-white font-semibold bg-red-300 hover:bg-red-400 active:scale-95 transition-all duration-150 active:bg-red-500 cursor-pointer"
              @click="close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  
   // รับค่า selectedDate จากคอมโพเนนต์แม่
})

const emit = defineEmits(['close', 'submit'])

watch(() => props.visible, (val) => {
  // console.log('BookingModal: prop "visible" เปลี่ยนเป็น:', val); // Debug: ตรวจสอบ prop visible

  if (val) {
    // กำหนดวันที่ในฟอร์มให้ตรงกับ selectedDate จาก prop หรือวันปัจจุบัน
    if (props.selectedDate) {
      form.value.date = props.selectedDate;
    } else {
      form.value.date = new Date().toISOString().split('T')[0];
    }
    
    // ตั้งค่าปฏิทินใน Modal ให้ตรงกับเดือน/ปีของวันที่ที่เลือก
    const dateToDisplay = new Date(form.value.date);
    currentMonth.value = dateToDisplay.getMonth();
    currentYear.value = dateToDisplay.getFullYear();

    // รีเซ็ตฟอร์มอื่นๆ เมื่อ Modal เปิด เพื่อให้เป็นค่าเริ่มต้นทุกครั้ง
    form.value.name = '';
    form.value.email = '';
    form.value.phone = '';
    form.value.room = '';
    form.value.start = '';
    form.value.end = '';
    form.value.requirements = [];
    form.value.participants = [''];
    form.value.topic = ''; // รีเซ็ต topic ด้วย
  }
}, { immediate: true }); // immediate: true เพื่อให้ watch ทำงานทันทีที่คอมโพเนนต์ถูก mount หาก visible เป็น true ตั้งแต่แรก


const today = new Date() // ใช้สำหรับเปรียบเทียบว่าวันนั้นคือวันนี้หรือไม่
const currentMonth = ref(today.getMonth()) // เดือนที่แสดงในปฏิทินของ Modal
const currentYear = ref(today.getFullYear()) // ปีที่แสดงในปฏิทินของ Modal

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const calendarDays = computed(() => {
  const result = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay() // 0=อาทิตย์, 1=จันทร์...
  const lastDate = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  // วันที่ว่างก่อนวันแรกของเดือน เพื่อจัดตำแหน่งให้ตรงกับวันในสัปดาห์
  for (let i = 0; i < firstDay; i++) {
    result.push({ day: null, date: null, isToday: false })
  }

  // วันที่ในเดือน
  for (let d = 1; d <= lastDate; d++) {
    const mm = String(currentMonth.value + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    const dateStr = `${currentYear.value}-${mm}-${dd}`
    result.push({ day: d, date: dateStr, isToday: isCurrentDay(dateStr) })
  }

  return result
})

// ตรวจสอบว่าวันที่ที่ส่งมาเป็นวันเดียวกับวันนี้หรือไม่
function isCurrentDay(dateStr) {
  if (!dateStr) return false;
  const checkDate = new Date(dateStr);
  return checkDate.getDate() === today.getDate() &&
         checkDate.getMonth() === today.getMonth() &&
         checkDate.getFullYear() === today.getFullYear()
}

// เลื่อนไปเดือนก่อนหน้า
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

// เลื่อนไปเดือนถัดไป
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// เมื่อคลิกเลือกวันที่ในปฏิทินของ Modal
const selectDate = (date) => {
  form.value.date = date; // อัปเดตวันที่ใน form.value
}

const form = ref({
  name: '',
  email: '',
  phone: '',
  room: '',
  start: '',
  end: '',
  requirements: [],
  participants: [''],
  topic: '', // เพิ่ม field topic
  date: '' // เพิ่ม field 'date' เพื่อเก็บวันที่ที่เลือกใน Modal
})

const submit = () => {
  const [startHour, startMin] = form.value.start.split(':').map(Number)
  const [endHour, endMin] = form.value.end.split(':').map(Number)

  const start = startHour * 60 + startMin
  const end = endHour * 60 + endMin

  // การตรวจสอบข้อมูล (ใช้ภาษาไทย)
  if (end <= start) {
    alert('เวลาสิ้นสุดต้องหลังจากเวลาเริ่มต้น');
    return
  }
  if (form.value.name === '') {
    alert('กรุณากรอกชื่อ');
    return
  }
  if (form.value.room === '') {
    alert('กรุณาเลือกห้อง');
    return
  }
  if (form.value.date === '') {
    alert('กรุณาเลือกวันที่');
    return
  }
  if (form.value.start === '') {
    alert('กรุณาเลือกเวลาเริ่มต้น');
    return
  }
  if (form.value.end === '') {
    alert('กรุณาเลือกเวลาสิ้นสุด');
    return
  }
  if (form.value.phone === '') {
    alert('กรุณากรอกเบอร์โทรศัพท์');
    return
  }

  // กำหนดหัวข้อการประชุมเริ่มต้นหากไม่ได้กรอก
  if (form.value.topic === '') {
    form.value.topic = 'Untitled Meeting';
  }

  // Emit Event พร้อมข้อมูลฟอร์ม
  emit('submit', {
    ...form.value,
    time: `${form.value.start} - ${form.value.end}`
  })

  close() // ปิด Modal และรีเซ็ตฟอร์ม
}

const close = () => {
  // รีเซ็ตฟอร์มเมื่อปิด Modal
  form.value = {
    name: '',
    email: '',
    phone: '',
    room: '',
    start: '',
    end: '',
    requirements: [],
    participants: [''],
    topic: '',
    date: ''
  };
  emit('close');
}
</script>

<style scoped>
/* Ensure the scoped styles are properly processed by Vue/Nuxt */

/* Main content wrapper within the modal */
.modal-content-wrapper {
  display: flex; /* Default to flex for column stacking on small screens */
  flex-direction: column; /* Stack columns vertically by default */
  gap: 1rem; /* Adjust gap for smaller screens */
}

/* On medium screens and up, switch to a two-column grid layout */
@media (min-width: 768px) { /* This corresponds to Tailwind's 'md' breakpoint */
  .modal-content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal columns */
    gap: 2rem; /* Match md:gap-8 (2 * 0.5rem = 1rem; 4 * 0.5rem = 2rem) */
  }
  /* Since we are using grid directly, we don't need md:w-1/2 on children */
}

/* Optional: If you want to refine spacing for very small screens */
@media (max-width: 639px) { /* Below sm breakpoint */
  .modal-root-container {
    padding: 0.75rem; /* Even smaller padding on very small screens */
  }
  .modal-content-wrapper {
    gap: 0.75rem; /* Smaller gap */
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