<template>
  <div class="font-[sans-serif] text-[#333]">

    <div class="mt-12">
      <div
        class="grid grid-cols-1 sm:grid-cols-3 items-start gap-8 sm:gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div class="sm:col-span-1">
          <h1 class="text-slate-800 text-3xl font-extrabold">推荐学习资源</h1>
          <p class="text-sm text-slate-500 mt-4">
            发现了优质的学习资源？分享给大家吧！我们会认真审核每一条推荐，让更多人受益。
          </p>

          <div class="mt-12">
            <h2 class="text-slate-800 text-base font-bold">联系方式</h2>
            <ul class="mt-4">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                    viewBox="0 0 479.058 479.058">
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000" />
                  </svg>
                </div>
                <a href="mailto:i@zhaikr.com" class="text-[#007bff] text-sm ml-4">
                  <small class="block">邮箱</small>
                  <strong>i@zhaikr.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-12">
            <h2 class="text-slate-800 text-base font-bold">社交媒体</h2>
            <ul class="flex mt-4 space-x-4">
              <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="https://x.com/interjc" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff' viewBox="0 0 24 24">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form class="sm:col-span-2 space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <input type='email' placeholder='邮箱地址 *' v-model="form.email"
              :class="[
                'w-full text-slate-800 rounded-md py-2.5 px-4 border-slate-300 border text-sm outline-blue-500',
                errors.email ? 'border-red-500' : ''
              ]"
              required />
            <span v-if="errors.email" class="text-red-500 text-xs block">{{ errors.email }}</span>
          </div>
          <div class="space-y-1">
            <input type='url' placeholder='资源链接 *' v-model="form.resourceUrl"
              :class="[
                'w-full text-slate-800 rounded-md py-2.5 px-4 border-slate-300 border text-sm outline-blue-500',
                errors.resourceUrl ? 'border-red-500' : ''
              ]"
              required />
            <span v-if="errors.resourceUrl" class="text-red-500 text-xs block">{{ errors.resourceUrl }}</span>
          </div>
          <div class="space-y-1">
            <textarea placeholder='资源介绍 *' rows="6" v-model="form.description"
              :class="[
                'w-full text-slate-800 rounded-md px-4 border-slate-300 border text-sm pt-2.5 outline-blue-500',
                errors.description ? 'border-red-500' : ''
              ]"
              required></textarea>
            <span v-if="errors.description" class="text-red-500 text-xs block">{{ errors.description }}</span>
          </div>
          <input type='text' placeholder='社交媒体 ID' v-model="form.socialId"
            class="w-full text-slate-800 rounded-md py-2.5 px-4 border-slate-300 border text-sm outline-blue-500" />
          <button type='submit' :class="[
              'text-white rounded-md text-sm px-4 py-3 w-full !mt-6 flex items-center justify-center',
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            ]" :disabled="isSubmitting">
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isSubmitting ? '提交中...' : '提交推荐' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validateForm, type FormData, type FormErrors } from '~/utils/validation';
import { useToast } from '~/composables/useToast';

definePageMeta({
  layout: "submit",
});

usePageTitle('推荐资源', '推荐优质的Web开发学习资源');

interface SubmitResponse {
  success: boolean;
  message: string;
}

const form = ref<FormData>({
  socialId: '',
  email: '',
  resourceUrl: '',
  description: ''
});

const errors = ref<FormErrors>({});
const isSubmitting = ref(false);
const { showToast } = useToast();

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    // 前端验证
    errors.value = validateForm(form.value);
    if (Object.keys(errors.value).length > 0) {
      showToast('请检查表单填写是否正确', 'warning');
      return;
    }

    const response = await $fetch<SubmitResponse>('/api/submit', {
      method: 'POST',
      body: form.value
    });

    if (response.success) {
      showToast(response.message || '提交成功！感谢您的推荐', 'success');
      // 重置表单
      form.value = {
        socialId: '',
        email: '',
        resourceUrl: '',
        description: ''
      };
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    if (error.statusCode === 400 && error.data) {
      // 处理验证错误
      errors.value = error.data;
      showToast('请检查表单填写是否正确', 'warning');
    } else if (error.statusCode === 500) {
      // 处理其他错误
      showToast('服务器错误，请稍后重试', 'error');
    } else {
      // 处理其他类型的错误
      showToast(error.message || '提交失败，请稍后重试', 'error');
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
