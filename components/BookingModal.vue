<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
    <div :class="{ 'w-full h-full max-w-full max-h-full rounded-none': fullScreen, 'max-w-5xl': !fullScreen && type === 'booking' }"
         class="bg-white rounded-3xl shadow-2xl w-[1000px] p-9 flex flex-row gap-10 border border-gray-300 relative">
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer transition-all duration-150 font-bold"
        @click="close">✕</button>

      <template v-if="type === 'custom-content' || type === 'confirm'">
        <div class="flex flex-col flex-grow w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">{{ title }}</h2>
            <p v-if="type === 'confirm'" class="text-center text-lg mb-6">{{ confirmationMessage }}</p>
            <div class="flex-grow overflow-y-auto pr-2">
                <slot />
            </div>
            <div class="flex justify-center mt-6 gap-4">
                <button
                    class="flex-1 py-2 rounded-full text-white font-semibold bg-[#b5c887] hover:bg-[#a4ba75] active:scale-95 transition-all duration-150"
                    @click="confirmActionOrClose">
                    {{ confirmButtonText }}
                </button>
                <button v-if="type === 'confirm'"
                        class="flex-1 py-2 rounded-full text-white font-semibold bg-red-300 hover:bg-red-400 active:scale-95 transition-all duration-150"
                        @click="cancel">
                    Cancel
                </button>
            </div>
        </div>
      </template>

      <template v-else-if="type === 'admin'">
        <div class="space-y-4 w-full">
          <h2 class="text-2xl font-bold mb-6 text-center">{{ title }}</h2>
          <div>
            <label class="text-sm font-medium">Name</label>
            <input v-model="form.name" type="text" required class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100" placeholder="Name Surname">
          </div>

          <div>
            <label class="text-sm font-medium">Phone</label>
            <input v-model="form.phone" type="tel" placeholder="+00 012-345-6789" class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100">
          </div>

          <div>
            <label class="text-sm font-medium">Email</label>
            <input v-model="form.email" type="email" placeholder="example@email.com" class="w-full rounded-md border border-gray-300 px-3 py-2 mt-1 bg-gray-100">
          </div>
          <div class="mt-6">
            <button class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 active:scale-95 transition-all" @click="submitForm">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </template>

      <template v-else-if="type === 'booking'">
        <div class="w-1/2 flex flex-col gap-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h2>

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

          <div class="flex items-center gap-2 mt-4 text-sm">
            <label class="font-medium text-gray-700">Time :</label>
            <input v-model="form.start" type="time" class="border px-2 py-1 rounded-md">
            <span>-</span>
            <input v-model="form.end" type="time" class="border px-2 py-1 rounded-md">
          </div>

          <div class="flex flex-col gap-2 text-sm">
            <div class="flex items-center gap-2">
              <label class="text-gray-700 font-medium">Start Date :</label>
              <input type="date" class="border px-2 py-1 rounded-md flex-grow" :value="selectedDate" readonly>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-gray-700 font-medium">End Date :</label>
              <input type="date" class="border px-2 py-1 rounded-md flex-grow" :value="selectedDate" readonly>
            </div>
          </div>
        </div>

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
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="room in ['Meeting 1', 'Meeting 2', 'Meeting 3', 'Meeting 4']" :key="room" :class="[
                'px-4 py-1 rounded-full border text-xs font-semibold active:bg-red-100 active:scale-95 transition-all duration-150',
                form.room === room ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              ]" @click="form.room = room">
                {{ room }}
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label class="w-24 font-medium">Participants :</label>
            <span class="bg-gray-100 border px-4 py-1 rounded-md">{{ form.participants.filter(p => p !== '').length }}</span>
          </div>
          <div v-for="(email, i) in form.participants" :key="i" class="flex items-center gap-2">
            <input
              v-model="form.participants[i]" type="email" class="border px-3 py-1 rounded-md flex-grow"
              placeholder="example@email.com">
            <button v-if="form.participants.length > 1" class="text-red-500" @click="form.participants.splice(i, 1)">&ndash;</button>
          </div>
          <button class="text-sm text-blue-500 hover:underline self-start mt-1" @click="form.participants.push('')">+ Add Email</button>

          <div class="flex flex-col gap-2">
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

          <div class="flex gap-4 pt-6">
            <button
              class="flex-1 py-2 rounded-full text-white font-semibold bg-[#b5c887] hover:bg-[#a4ba75] active:scale-95 transition-all duration-150"
              @click="submitForm">
              {{ confirmButtonText }}
            </button>
            <button class="flex-1 py-2 rounded-full text-white font-semibold bg-red-300 hover:bg-red-400 active:scale-95 transition-all duration-150" @click="close">
              Cancel
            </button>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, ref, computed } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Reservation'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm Booking'
  },
  initialData: {
    type: Object,
    default: null
  },
  type: { // เพิ่ม type prop เพื่อควบคุมเนื้อหาที่แสดง
    type: String,
    default: 'booking', // 'booking', 'admin', 'confirm', 'custom-content'
    validator: (value) => ['booking', 'admin', 'confirm', 'custom-content'].includes(value)
  },
  fullScreen: { // เพิ่ม prop สำหรับ Full Screen Modal
    type: Boolean,
    default: false
  },
  confirmationMessage: { // สำหรับ type="confirm"
    type: String,
    default: 'Are you sure?'
  }
});

const emit = defineEmits(['close', 'submit', 'confirm', 'cancel']);

// Calendar Logic
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref(null);

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1);
  const firstDayOfWeek = date.getDay();
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const daysArray = [];

  const today = new Date();
  const isToday = (d) => {
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  };

  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push({ day: null, date: null, isToday: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(currentYear.value, currentMonth.value, i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    daysArray.push({
      day: i,
      date: dateStr,
      isToday: isToday(d)
    });
  }
  return daysArray;
});

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
const selectDate = (date) => {
  selectedDate.value = date;
};

const form = reactive({
  name: '',
  email: '',
  phone: '',
  room: '',
  start: '',
  end: '',
  requirements: [],
  participants: ['']
});

watch(() => props.visible, (val) => {
  if (val) {
    resetForm();
    const now = new Date();
    currentMonth.value = now.getMonth();
    currentYear.value = now.getFullYear();
  }
});

watch(() => props.initialData, (newData) => {
  if (props.visible && newData) {
    form.name = newData.name || '';
    form.email = newData.email || '';
    form.phone = newData.phone || '';
    form.room = newData.room || '';
    form.requirements = newData.requirements ? [...newData.requirements] : [];
    form.participants = newData.participants ? [...newData.participants] : [''];

    if (newData.date) {
      selectedDate.value = newData.date;
      const [year, month, day] = newData.date.split('-').map(Number);
      currentYear.value = year;
      currentMonth.value = month - 1;
    } else {
      selectedDate.value = null;
    }

    if (newData.time) {
      const [start, end] = newData.time.split(' - ');
      form.start = start || '';
      form.end = end || '';
    } else {
      form.start = '';
      form.end = '';
    }
  } else if (props.visible && !newData) {
      resetForm();
  }
}, { immediate: true });


function resetForm() {
  Object.assign(form, {
    name: '', email: '', phone: '', room: '',
    start: '', end: '', requirements: [], participants: ['']
  });
  selectedDate.value = null;
}

function close() {
  emit('close');
}

// Function สำหรับปุ่ม Confirm/Submit ใน BookingModal
const confirmActionOrClose = () => {
  if (props.type === 'confirm') {
    emit('confirm');
  } else if (props.type === 'custom-content') {
    // สำหรับ custom content, ปุ่ม confirmButtonText อาจจะหมายถึง "Close"
    // ถ้าคุณต้องการให้มีการ submit data จาก custom content ให้เปลี่ยน emit('close') เป็น emit('submit')
    emit('close');
  } else {
    submitForm(); // สำหรับ booking/admin form
  }
};

function submitForm() {
  // Logic การตรวจสอบและส่งฟอร์ม (เหมือนเดิม)
  if (props.type === 'admin') {
    if (!form.name || !form.email) {
      alert('Please fill in Name and Email.');
      return;
    }
    emit('submit', { name: form.name, phone: form.phone, email: form.email });
  } else if (props.type === 'booking') {
    const [startHour, startMin] = form.start.split(':').map(Number);
    const [endHour, endMin] = form.end.split(':').map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    if (endTime <= startTime) {
      alert('End time must be later than start time.');
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.room || !selectedDate.value || !form.start || !form.end) {
      alert('Please fill in all required fields (Name, Email, Phone, Room, Date, Start Time, End Time).');
      return;
    }

    emit('submit', {
      ...form,
      date: selectedDate.value,
      time: `${form.start} - ${form.end}`,
      participants: form.participants.filter(p => p !== '')
    });
  }
  close();
}

// สำหรับ type="confirm"
function confirm() {
    emit('confirm');
    close();
}

function cancel() {
    emit('cancel');
    close();
}
</script>

<style scoped>
/* คุณสามารถเพิ่มหรือปรับแต่ง CSS เพิ่มเติมที่นี่ได้ */
</style>