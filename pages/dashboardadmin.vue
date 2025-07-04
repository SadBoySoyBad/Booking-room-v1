<template>
  <div>
    <div class="p-2 sm:p-4 lg:p-6 w-full h-full">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div
          class="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-2"
        >
          <div class="grid grid-cols-2 gap-4">
            <RoomStatusCard
              room-name="Meeting 1"
              status="Available"
              time="HH:MM - HH:MM"
              topic="Meeting Topic"
              user="Name Surname (ROLE)"
            />
            <RoomStatusCard
              room-name="Meeting 2"
              status="Occupied"
              time="HH:MM - HH:MM"
              topic="Project Discussion"
              user="Name Surname (ROLE)"
            />
            <RoomStatusCard
              room-name="Meeting 3"
              status="Maintenance"
              time="XX:XX - XX:XX"
              topic="Maintenance"
              user="Name Surname (ROLE)"
            />
            <RoomStatusCard
              room-name="Meeting 4"
              status="Maintenance"
              time="XX:XX - XX:XX"
              topic="Maintenance"
              user="Name Surname (ROLE)"
            />
          </div>
        </div>

        <div
          class="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-1 lg:col-span-1 flex flex-col"
        >
          <h3 class="text-lg font-bold mb-2 text-center">Monthly Attendance</h3>
          <MonthlyAttendanceGraph />
        </div>

        <div
          class="col-span-1 md:col-span-1 lg:col-span-1 grid grid-rows-2 gap-4"
        >
          <div class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <ClockWidget />
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <TotalEventsChart />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-md col-span-1">
          <h3 class="text-lg font-bold mb-2 text-center">Recent Activities</h3>
          <RecentActivitiesTable :activity-log-data="activityLogData" />
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md col-span-1">
          <h3 class="text-lg font-bold mb-2 text-center">Statistic</h3>
          <StatisticTable :statistic-data="statisticData" />
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

// This is crucial for Nuxt Layouts!
// It tells Nuxt to use 'admin-layout' (from layouts/AdminLayout.vue) for this page.
definePageMeta({
  layout: 'admin-layout',
});

// Components used in this page
import RoomStatusCard from "../components/dashboard/RoomStatusCard.vue";
import MonthlyAttendanceGraph from "../components/dashboard/MonthlyAttendanceGraph.vue";
import ClockWidget from "../components/dashboard/ClockWidget.vue";
import TotalEventsChart from "../components/dashboard/TotalEventsChart.vue";
import RecentActivitiesTable from "../components/dashboard/RecentActivitiesTable.vue";
import StatisticTable from "../components/dashboard/StatisticTable.vue";

// Components that might be used in modals or adapted
import RequestsApprovalTable from "../components/dashboard/RequestsApprovalTable.vue";
import ActivityLogTable from "../components/dashboard/ActivityLogTable.vue"; 

import Adminpopup from "~/components/Adminpopup.vue";

// Set the page title
useHead({
  title: "Dashboard Admin",
});

// Mock Data for Requests Approval Table
const requestsApprovalData = ref([
  { id: 1, date: "01 Jun 2025", name: "User 1", reqDate: "05 Jun 2025", reqRoom: "Room A", reqTime: "09:00 - 10:00", status: "pending" },
  { id: 2, date: "02 Jun 2025", name: "User 2", reqDate: "06 Jun 2025", reqRoom: "Room B", reqTime: "14:00 - 15:00", status: "pending" },
  { id: 3, date: "03 Jun 2025", name: "User 3", reqDate: "07 Jun 2025", reqRoom: "Room C", reqTime: "10:30 - 11:30", status: "pending" },
]);

// Mock Data for Activity Log Table
const activityLogData = ref([
  { time: "10:00", name: "Example01", role: "User", action: "Reserved", actionType: "reserved" },
  { time: "00:00:00", name: "Example02", role: "Guest", action: "Request", actionType: "request" },
  { time: "00:00:00", name: "Example03", role: "Admin", action: "Approved", actionType: "approved" },
]);

// Mock Data for Statistic Table
const statisticData = ref([
  { district: "District A", total: "1000", company: "Company X", totalEvents: "500" },
  { district: "District B", total: "800", company: "Company Y", totalEvents: "400" },
  { district: "District C", total: "1200", company: "Company Z", totalEvents: "600" },
]);

// State and functions for Modals
const showRequestsApprovalModal = ref(false);
const openRequestsApprovalPopup = () => { showRequestsApprovalModal.value = true; };

const showActivityLogModal = ref(false);
const openActivityLogPopup = () => { showActivityLogModal.value = true; };

// Function to handle request updates (when Approve/Deny)
const handleUpdateRequests = ({ action, id }) => {
  console.log(`Action: ${action} for Request ID: ${id} received in DashboardAdmin`);
  requestsApprovalData.value = requestsApprovalData.value.filter( (req) => req.id !== id );
};
</script>

<style scoped>
/* No custom styles needed, Tailwind CSS handles most responsiveness */
</style>