// tailwind.config.js
module.exports = {
  // >>>>> ส่วน 'content' ต้องแน่ใจว่าถูกต้อง <<<<<
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './{pages,layouts,components,plugins,composables,app}.vue', 
    './nuxt.config.{ts,js}',
    // ถ้าคุณมีไฟล์ JS/TS/HTML ที่ใช้ Tailwind Classes ด้วย
    // ก็สามารถเพิ่ม path เหล่านั้นได้ เช่น './src/**/*.{js,ts,vue,html}'
  ],
  // >>>>> สิ้นสุดส่วน 'content' <<<<<

  theme: {
    extend: {
      // ต้องแน่ใจว่าไม่มี screens: { ... } ตรงนี้
      // เพราะถ้ามี มันจะไป Override ค่าเริ่มต้นของ Tailwind
    },
  },

  // >>>>> นี่คือการตั้งค่าที่สำคัญ เพื่อให้ Tailwind สร้าง Responsive Variants <<<<<
  // ส่วน variants นี้ควรจะทำให้ responsive classes ทำงานได้
  // แม้ว่าจะถูก deprecate ใน v3+ แต่บางครั้งจำเป็นสำหรับการแก้ปัญหา
  variants: {
    extend: {
      // เปิดใช้งาน responsive variants สำหรับคุณสมบัติหลักๆ
      backgroundColor: ['responsive'],
      textColor: ['responsive'],
      display: ['responsive'],
      gridTemplateColumns: ['responsive'],
      gridColumn: ['responsive'], // สำหรับ col-span
      // เพิ่มอื่นๆ หากต้องการ เช่น margin, padding
      margin: ['responsive'],
      padding: ['responsive'],
    },
  },
  // >>>>> สิ้นสุดส่วน variants <<<<<

  // >>>>> ส่วน safelist นี้ก็สำคัญมากเช่นกัน <<<<<
  // เพื่อบังคับให้ Tailwind รวม class เหล่านี้เข้ามาเสมอ ไม่ว่า PurgeCSS จะเจอหรือไม่
  safelist: [
    'grid-cols-1',
    'md:grid-cols-3',
    'md:col-span-2',
    'md:text-red-500', // เพื่อทดสอบต่อไป
    // หากมี Class ไหนที่คุณสงสัยว่าไม่โผล่มาอีก ก็เพิ่มที่นี่
  ],
  // >>>>> สิ้นสุดส่วน safelist <<<<<

  plugins: [],
};