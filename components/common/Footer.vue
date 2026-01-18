<template>
  <footer class="my-20">
    <div class="common-social-links flex space-x-4 items-center justify-center mb-2">
      <a title="关注 X@interjc" href="https://x.com/interjc" target="_blank" rel="noopener noreferrer"
        class="text-2xl text-slate-500 hover:text-gray-600 transition-colors duration-300">
        <Icon name="mdi:twitter" />
      </a>
      <a title="其他联系方式" href="https://justincourse.com/contact" target="_blank" rel="noopener noreferrer"
        class="text-2xl text-slate-500 hover:text-gray-600 transition-colors duration-300">
        <Icon name="mdi:wechat" />
      </a>
      <a title="立即加入课程" href="https://justincourse.com/pricing"
        target="_blank" rel="noopener noreferrer"
        class="text-2xl text-slate-500 hover:text-gray-600 transition-colors duration-300">
        <Icon name="mdi:school" />
      </a>
      <!-- <a title="Affiliate Program 推介计划" href="https://s.zhaikr.com/c-aff" target="_blank" rel="noopener noreferrer"
        class="text-2xl text-slate-500 hover:text-gray-600 transition-colors duration-300">
        <Icon name="mdi:account-cash" />
      </a> -->
    </div>
    <p class="text-center text-sm text-slate-500">
      Copyright © {{ new Date().getFullYear() }} <a target="_blank" href="https://interjc.net">Justin</a>
      All rights reserved.
    </p>
  </footer>
</template>
