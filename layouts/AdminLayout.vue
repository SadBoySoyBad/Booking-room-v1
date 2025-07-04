<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-white text-gray-700 flex flex-col p-4 shadow-lg"> 
      <div class="mb-8 flex items-center justify-center space-x-2"> 
        <img src="/logo.png" alt="arrangemeet logo" class="h-8 w-auto" /> 
        <h1 class="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">arrangemeet.</h1> 
      </div>
      <nav class="flex-grow">
        <ul>
          <li class="mb-2">
            <NuxtLink
              to="/admin/dashboard"
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2" 
              style="margin-left: -1rem; padding-left: 1rem;" 
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
              to="/admin/analytics" 
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2"
              style="margin-left: -1rem; padding-left: 1rem;"
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
              Analytics 
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/requests"
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2"
              style="margin-left: -1rem; padding-left: 1rem;"
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
                >99</span
              >
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/manage-accounts" 
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2"
              style="margin-left: -1rem; padding-left: 1rem;"
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
              Manage Accounts
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink
              to="/admin/activities" 
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2"
              style="margin-left: -1rem; padding-left: 1rem;"
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
              Activities
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
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="bg-purple-100 text-purple-800 border-l-4 border-purple-600 font-semibold -ml-4 pl-4 py-2"
              style="margin-left: -1rem; padding-left: 1rem;"
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
      </aside>

    <div class="flex-grow flex flex-col">
      <header class="bg-purple-50 p-4 shadow-md flex items-center justify-between">
        <nav class="text-lg font-bold flex-shrink-0 flex items-center space-x-1">
            <span class="text-gray-700">Admin</span> 
            <span class="text-gray-700"> > </span>
            <span class="text-purple-700">{{ currentBreadcrumbPageName }}</span> </nav>
        
        <nav class="flex items-center space-x-4 ml-auto">
          <button @click="openLetterBox" class="text-gray-600 hover:text-gray-800 p-2 rounded-full bg-purple-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.928-3.416A2 2 0 0113 6.305V7h2V6.305a2 2 0 012.072-1.721L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0L12 15M3 8l9 7 9-7" />
            </svg>
          </button>
          
          <NuxtLink to="/booking" class="text-purple-800 bg-purple-100 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors">
            Reservation
          </NuxtLink>
          
          <div class="relative">
            <span
              class="text-purple-800 px-4 py-2 rounded-full bg-purple-100 flex items-center cursor-pointer"
              @click="toggleAdminDropdown"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Admin01
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 transition-transform duration-200"
                :class="{'rotate-180': isAdminDropdownOpen}"
                fill="none"
                viewBox="0 0 24 24" 
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            
            <div v-if="isAdminDropdownOpen" class="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 overflow-hidden">
              <NuxtLink to="/history" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"> History
              </NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                Log Out
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main class="flex-grow p-4 overflow-auto">
        <slot></slot>
      </main>
    </div>
  </div>

  <LetterBoxPopup 
    :isVisible="isLetterBoxPopupVisible" 
    @close-letter-box="isLetterBoxPopupVisible = false"
  />
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'; 
import { useRoute, useRouter } from "vue-router";
import LetterBoxPopup from "~/components/LetterBoxPopup.vue"; 

const router = useRouter();
const route = useRoute(); 

const isAdminDropdownOpen = ref(false);
const isLetterBoxPopupVisible = ref(false); 

const toggleAdminDropdown = () => {
  isAdminDropdownOpen.value = !isAdminDropdownOpen.value;
};

const openLetterBox = () => { 
  isLetterBoxPopupVisible.value = true;
};

// Logic สำหรับ Breadcrumb Dynamic Page Name
const currentBreadcrumbPageName = computed(() => {
  const pathParts = route.path.split('/');
  let lastPart = pathParts.pop();
  if (!lastPart && pathParts.length > 0) { 
    lastPart = pathParts.pop();
  }
  if (lastPart) {
    lastPart = lastPart.replace(/-/g, ' '); 
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1); 
  }
  return '';
});


// Close dropdown and popup when clicking outside
if (process.client) {
  const handleClickOutside = (event) => {
    if (isAdminDropdownOpen.value && !event.target.closest('.relative')) { 
      isAdminDropdownOpen.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
}

const logout = () => {
  localStorage.removeItem("adminToken"); 
  localStorage.removeItem("adminUser"); 
  router.push("/"); 
};
</script>

<style scoped>
/* No specific styles needed here, Tailwind CSS handles layout */
</style>