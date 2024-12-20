import { validateForm, type FormData } from '~/utils/validation';

export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody<FormData>(event);

    // 使用共享的验证逻辑
    const errors = validateForm(body);

    // 如果有错误，返回 400 状态码
    if (Object.keys(errors).length > 0) {
      return createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: errors
      });
    }

    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: 这里可以添加实际的数据存储逻辑
    console.log('Received form submission:', body);

    // 返回成功响应
    return {
      success: true,
      message: '提交成功！感谢您的推荐'
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '提交失败，请稍后重试'
    });
  }
});
