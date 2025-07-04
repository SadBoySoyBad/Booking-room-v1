<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-purple-800 text-white flex flex-col p-4 shadow-lg">
      <div class="mb-8 text-xl font-bold text-center">arrangemeet.</div>
      <nav class="flex-grow">
        <ul>
          <li class="mb-2">
            <NuxtLink
              to="/admin/dashboard"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1H11m-4 0a1 1 0 001 1h2m-4-2h4"
                />
              </svg>
              Dashboard
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/statistic"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              Statistic
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/requests"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Requests
              <span
                class="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                >30</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/manage"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.823 2.306 2.306a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.823 3.313-2.306 2.306a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.823-2.306-2.306a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.823-3.313 2.306-2.306a1.724 1.724 0 002.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Manage
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/activity"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Activity
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/settings"
              class="flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors"
              active-class="bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.823 2.306 2.306a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.823 3.313-2.306 2.306a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.823-2.306-2.306a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.823-3.313 2.306-2.306a1.724 1.724 0 002.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="mt-auto">
        <button
          @click="logout"
          class="flex items-center justify-center w-full p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log Out
        </button>
      </div>
    </aside>

    <div class="flex-grow flex flex-col">
      <header class="bg-white p-4 shadow-md flex items-center justify-between">
        <div class="text-xl font-bold flex-shrink-0">arrangemeet.</div>
        <nav class="flex items-center space-x-4 ml-auto">
          <button class="text-gray-600 hover:text-gray-800 p-2 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.928-3.416A2 2 0 0113 6.305V7h2V6.305a2 2 0 012.072-1.721L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0L12 15M3 8l9 7 9-7" />
            </svg>
          </button>
          
          <button class="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full bg-gray-100">History</button>
          
          <button class="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full bg-gray-100">Reservation</button>
          
          <span class="text-gray-800 px-4 py-2 rounded-full bg-gray-100">
            Welcome, Admin01
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </nav>
      </header>

      <main class="flex-grow p-4 overflow-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("adminToken"); // หรือ key ที่ใช้เก็บ admin token ของคุณ
  localStorage.removeItem("adminUser"); // หรือ key อื่นๆ ที่เกี่ยวข้อง
  router.push("/"); // เปลี่ยนเส้นทางไปหน้า Home ('/')
};
</script>

<style scoped>
/* No specific styles needed here, Tailwind CSS handles layout */
</style>