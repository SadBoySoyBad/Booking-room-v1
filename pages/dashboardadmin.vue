<template>
  <div class="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-6 mt-8">
      <h1
        class="text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest"
      >
        Overall
      </h1>

      <h1
        class="top-2 text-[3rem] font-bold text-black relative z-10 text-center leading-none"
      >
        Dashboard
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-start w-full px-4 mb-8">
      <div class="bg-white p-8 shadow-lg max-w-6xl w-full rounded-lg border-2 border-black">
        <div class="grid grid-cols-2 gap-6 items-stretch">
          <div class="p-4 border-2 border-black flex flex-col justify-between">
            <RoomStatusCard />
          </div>

          <div class="relative">
            <div class="p-4 border-2 border-black flex flex-col h-full">
              <h3 class="text-xl font-bold mb-4 text-center">Requests approval</h3>
              <p class="text-sm text-gray-600 mb-4 text-center">Take action to accept / deny guests' request</p>
              <RequestsApprovalTable :requestsData="requestsApprovalData" />
            </div>
            <button @click="openRequestsApprovalPopup" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 bg-white/50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
            </button>
          </div>

          <div class="p-4 border-2 border-black flex flex-col">
            <!-- <h3 class="text-xl font-bold mb-4 text-center">Add Admin Form</h3>
            <p class="text-sm text-gray-600 mb-4 text-center">Insert required information below</p> -->
            <AddAdminForm />
          </div>

          <div class="relative">
            <div class="p-4 border-2 border-black flex flex-col h-full">
              <h3 class="text-xl font-bold mb-4 text-center">Activity Log</h3>
              <p class="text-sm text-gray-600 mb-4 text-center">View all actions done here</p>
              <ActivityLogTable :activityLogData="activityLogData" />
            </div>
            <button @click="openActivityLogPopup" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 bg-white/50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <BookingModal
      :visible="showRequestsApprovalModal"
      title="Requests Approval (POP-UP)"
      confirm-button-text="Close"
      type="custom-content"
      :full-screen="true"
      @close="showRequestsApprovalModal = false"
    >
        <template v-if="showRequestsApprovalModal">
            <RequestsApprovalTable :requestsData="requestsApprovalData" :isModal="true" />
        </template>
    </BookingModal>

    <BookingModal
      :visible="showActivityLogModal"
      title="Activity Log (POP-UP)"
      confirm-button-text="Close"
      type="custom-content"
      :full-screen="true"
      @close="showActivityLogModal = false"
    >
        <template v-if="showActivityLogModal">
            <ActivityLogTable :activityLogData="activityLogData" :isModal="true" />
        </template>
    </BookingModal>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import RoomStatusCard from '../components/dashboard/RoomStatusCard.vue';
import RequestsApprovalTable from '../components/dashboard/RequestsApprovalTable.vue';
import AddAdminForm from '../components/dashboard/AddAdminForm.vue';
import ActivityLogTable from '../components/dashboard/ActivityLogTable.vue';
import BookingModal from '../components/BookingModal.vue';

useHead({
  title: "Dashboard Admin",
});

const requestsApprovalData = ref([
  { id: 1, date: '01 Jun 2025', name: 'User 1', reqDate: '05 Jun 2025', reqRoom: 'Room A', reqTime: '09:00 - 10:00', status: 'pending' },
  { id: 2, date: '02 Jun 2025', name: 'User 2', reqDate: '06 Jun 2025', reqRoom: 'Room B', reqTime: '14:00 - 15:00', status: 'pending' },
  { id: 3, date: '03 Jun 2025', name: 'User 3', reqDate: '07 Jun 2025', reqRoom: 'Room C', reqTime: '10:30 - 11:30', status: 'pending' },
]);

const activityLogData = ref([
  { date: 'DD MM YY', time: '00:00', name: 'User1', role: 'User', action: 'Log In', actionType: 'login' },
  { date: 'DD MM YY', time: '00:00', name: 'User1', role: 'User', action: 'Log Out', actionType: 'logout' },
  { date: 'DD MM YY', time: '00:00', name: 'Guest1', role: 'Guest', action: 'Request', actionType: 'request' },
  { date: 'DD MM YY', time: '00:00', name: 'User', role: 'User', action: 'Reserved', actionType: 'reserved' },
  { date: 'DD MM YY', time: '00:00', name: 'Admin1', role: 'Admin', action: 'Add', actionType: 'add' },
  { date: 'DD MM YY', time: '00:00', name: 'Admin1', role: 'Admin', action: 'Edited', actionType: 'edited' },
]);

const showRequestsApprovalModal = ref(false);
const openRequestsApprovalPopup = () => {
    showRequestsApprovalModal.value = true;
};

const showActivityLogModal = ref(false);
const openActivityLogPopup = () => {
    showActivityLogModal.value = true;
};
</script>

<style scoped>
/* คุณสามารถเพิ่มหรือปรับแต่ง CSS เพิ่มเติมที่นี่ได้ */
</style>