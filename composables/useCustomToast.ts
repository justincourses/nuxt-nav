import { ref } from 'vue';

interface ToastRef {
  addToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

const toastRef = ref<ToastRef>();

export const useCustomToast = () => {
  const setToastRef = (ref: ToastRef) => {
    toastRef.value = ref;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    toastRef.value?.addToast(message, type);
  };

  return {
    setToastRef,
    showToast
  };
};
