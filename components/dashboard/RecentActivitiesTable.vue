<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Time
          </th>
          <th
            scope="col"
            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in activityLogData" :key="index">
          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
            {{ item.time }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
            {{ item.name }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
            {{ item.role }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
            <span
              :class="getActionBadgeClass(item.actionType)"
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            >
              {{ item.action }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  activityLogData: {
    type: Array,
    required: true,
  },
});

const getActionBadgeClass = (actionType) => {
  switch (actionType) {
    case "login":
      return "bg-green-100 text-green-800";
    case "logout":
      return "bg-yellow-100 text-yellow-800";
    case "request":
      return "bg-blue-100 text-blue-800";
    case "reserved":
      return "bg-purple-100 text-purple-800";
    case "add":
      return "bg-blue-100 text-blue-800";
    case "edited":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>