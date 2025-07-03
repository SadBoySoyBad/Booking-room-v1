<template>
  <div class="bg-gray-100 min-h-screen p-2 sm:p-4 flex flex-col items-center">
    <div class="relative w-full flex justify-center items-center mb-4 sm:mb-6 mt-6 sm:mt-8">
      <h1
        class="text-5xl sm:text-7xl md:text-[6rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none tracking-widest whitespace-nowrap"
      >
        Overall
      </h1>

      <h1
        class="text-3xl sm:text-4xl md:text-[3rem] font-bold text-black relative z-10 text-center leading-none mt-2 sm:mt-0"
      >
        Dashboard
      </h1>
    </div>

    <div class="flex-grow flex justify-center items-start w-full px-2 sm:px-4 mb-4 sm:mb-8">
      <div class="bg-white p-2 sm:p-4 lg:p-8 shadow-lg max-w-6xl w-full rounded-lg overflow-x-hidden">
        <div class="grid grid-cols-2 gap-2 sm:gap-4 items-stretch">
          <div class="p-2 sm:p-3 md:p-4 border-2 border-black flex flex-col justify-between overflow-x-auto overflow-y-hidden">
            <RoomStatusCard />
          </div>

          <div class="relative min-h-[200px] sm:min-h-[250px] overflow-hidden">
            <div class="p-2 sm:p-3 md:p-4 border-2 border-black flex flex-col h-full overflow-hidden">
              <h3 class="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-center whitespace-nowrap">
                Requests approval
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 text-center">
                Take action to accept / deny guests' request
              </p>

              <div class="flex-grow overflow-x-auto overflow-y-hidden">
                <RequestsApprovalTable :requests-data="requestsApprovalData" />
              </div>
            </div>
            <button
              class="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-500 hover:text-gray-700 p-0.5 sm:p-1 bg-white/50 rounded-lg"
              @click="openRequestsApprovalPopup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>

          <div class="p-2 sm:p-3 md:p-4 border-2 border-black flex flex-col overflow-x-auto overflow-y-hidden">
            <AddAdminForm />
          </div>

          <div class="relative min-h-[200px] sm:min-h-[250px] overflow-hidden">
            <div class="p-2 sm:p-3 md:p-4 border-2 border-black flex flex-col h-full overflow-hidden">
              <h3 class="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-center whitespace-nowrap">Activity Log</h3>
              <p class="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 text-center">
                View all actions done here
              </p>
              <div class="flex-grow overflow-x-auto overflow-y-hidden">
                <ActivityLogTable :activity-log-data="activityLogData" />
              </div>
            </div>
            <button
              class="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-500 hover:text-gray-700 p-0.5 sm:p-1 bg-white/50 rounded-lg"
              @click="openActivityLogPopup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Adminpopup
      :visible="showRequestsApprovalModal"
      title="Requests Approval (POP-UP)"
      confirm-button-text="Close"
      type="custom-content"
      :full-screen="true"
      @close="showRequestsApprovalModal = false"
      @submit="showRequestsApprovalModal = false"
    >
      <template v-if="showRequestsApprovalModal">
        <RequestsApprovalTable
          :requests-data="requestsApprovalData"
          :is-modal="true"
          @update-requests="handleUpdateRequests"
        />
      </template>
    </Adminpopup>

    <Adminpopup
      :visible="showActivityLogModal"
      title="Activity Log (POP-UP)"
      confirm-button-text="Close"
      type="custom-content"
      :full-screen="true"
      @close="showActivityLogModal = false"
      @submit="showActivityLogModal = false"
    >
      <template v-if="showActivityLogModal">
        <ActivityLogTable
          :activity-log-data="activityLogData"
          :is-modal="true"
        />
      </template>
    </Adminpopup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RoomStatusCard from "../components/dashboard/RoomStatusCard.vue";
import RequestsApprovalTable from "../components/dashboard/RequestsApprovalTable.vue";
import AddAdminForm from "../components/dashboard/AddAdminForm.vue";
import ActivityLogTable from "../components/dashboard/ActivityLogTable.vue";

// Assuming Adminpopup is correctly aliased or located relative to the current file if not using Nuxt's `~` alias directly in a non-Nuxt setup.
import Adminpopup from "~/components/Adminpopup.vue";

useHead({
  title: "Dashboard Admin",
});

const requestsApprovalData = ref([
  {
    id: 1,
    date: "01 Jun 2025",
    name: "User 1",
    reqDate: "05 Jun 2025",
    reqRoom: "Room A",
    reqTime: "09:00 - 10:00",
    status: "pending",
  },
  {
    id: 2,
    date: "02 Jun 2025",
    name: "User 2",
    reqDate: "06 Jun 2025",
    reqRoom: "Room B",
    reqTime: "14:00 - 15:00",
    status: "pending",
  },
  {
    id: 3,
    date: "03 Jun 2025",
    name: "User 3",
    reqDate: "07 Jun 2025",
    reqRoom: "Room C",
    reqTime: "10:30 - 11:30",
    status: "pending",
  },
]);

const activityLogData = ref([
  {
    date: "01 Jul 25",
    time: "10:00",
    name: "User1",
    role: "User",
    action: "Log In",
    actionType: "login",
  },
  {
    date: "01 Jul 25",
    time: "10:05",
    name: "User1",
    role: "User",
    action: "Log Out",
    actionType: "logout",
  },
  {
    date: "01 Jul 25",
    time: "10:15",
    name: "Guest1",
    role: "Guest",
    action: "Request",
    actionType: "request",
  },
  {
    date: "01 Jul 25",
    time: "10:30",
    name: "User",
    role: "User",
    action: "Reserved",
    actionType: "reserved",
  },
  {
    date: "01 Jul 25",
    time: "10:45",
    name: "Admin1",
    role: "Admin",
    action: "Add",
    actionType: "add",
  },
  {
    date: "01 Jul 25",
    time: "11:00",
    name: "Admin1",
    role: "Admin",
    action: "Edited",
    actionType: "edited",
  },
]);

const showRequestsApprovalModal = ref(false);
const openRequestsApprovalPopup = () => {
  showRequestsApprovalModal.value = true;
};

const showActivityLogModal = ref(false);
const openActivityLogPopup = () => {
  showActivityLogModal.value = true;
};

const handleUpdateRequests = ({ action, id }) => {
  // Logic ในการอัปเดตข้อมูล requestsApprovalData ในคอมโพเนนต์แม่
  console.log(
    `Action: ${action} for Request ID: ${id} received in DashboardAdmin`
  );
  requestsApprovalData.value = requestsApprovalData.value.filter(
    (req) => req.id !== id
  );
};
</script>

<style scoped>
/* No custom styles needed, Tailwind CSS handles most responsiveness */
</style>