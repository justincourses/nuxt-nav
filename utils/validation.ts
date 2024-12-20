export interface FormData {
  socialId: string;
  email: string;
  resourceUrl: string;
  description: string;
}

export interface FormErrors {
  email?: string;
  resourceUrl?: string;
  description?: string;
}

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // 验证邮箱
  if (!data.email) {
    errors.email = '请输入邮箱地址';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = '请输入有效的邮箱地址';
  }

  // 验证资源链接
  if (!data.resourceUrl) {
    errors.resourceUrl = '请输入资源链接';
  } else {
    try {
      new URL(data.resourceUrl);
    } catch {
      errors.resourceUrl = '请输入有效的URL';
    }
  }

  // 验证资源介绍
  if (!data.description) {
    errors.description = '请输入资源介绍';
  } else if (data.description.length < 10) {
    errors.description = '资源介绍至少需要10个字符';
  }

  return errors;
};
