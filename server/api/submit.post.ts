/**
 * POST /api/submit
 *
 * Handles form submission for learning resource recommendations.
 *
 * @description
 * This endpoint processes form submissions for learning resource recommendations.
 * It validates the input data, sends an email notification, and returns appropriate responses.
 *
 * @example
 * ```ts
 * // Request body structure (FormData)
 * {
 *   email: string;       // Required - Submitter's email
 *   resourceUrl: string; // Required - URL of the learning resource
 *   description: string; // Required - Description of the resource
 *   socialId?: string;   // Optional - Social media handle
 * }
 *
 * // Success Response (200)
 * {
 *   success: true,
 *   message: string
 * }
 *
 * // Validation Error Response (400)
 * {
 *   statusCode: 400,
 *   statusMessage: 'Validation Error',
 *   data: Record<string, string> // Field-specific error messages
 * }
 *
 * // Server Error Response (500)
 * {
 *   statusCode: 500,
 *   statusMessage: 'Internal Server Error',
 *   message: string
 * }
 * ```
 *
 * @requires NUXT_RESEND_FROM_EMAIL - Environment variable for sender email
 * @requires NUXT_RESEND_TO_EMAIL - Environment variable for recipient email
 */

import { validateForm, type FormData } from '~/utils/validation';
import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  try {
    // 验证环境变量
    const resendApiKey = process.env.NUXT_RESEND_API_KEY;
    const fromEmail = process.env.NUXT_RESEND_FROM_EMAIL;
    const toEmail = process.env.NUXT_RESEND_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.error('Missing required environment variables:', {
        hasApiKey: !!resendApiKey,
        hasFromEmail: !!fromEmail,
        hasToEmail: !!toEmail
      });
      throw new Error('Missing required environment configuration');
    }

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

    // 直接初始化 Resend 实例
    const resend = new Resend(resendApiKey);

    try {
      // 发送邮件通知
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: "新的学习资源推荐",
        text: `
新的学习资源推荐：

提交者邮箱：${body.email}
资源链接：${body.resourceUrl}
资源介绍：${body.description}
社交媒体：${body.socialId || "未提供"}
        `.trim(),
      });
    } catch (emailError: any) {
      console.error('Failed to send email:', {
        error: emailError.message,
        code: emailError.statusCode,
        details: emailError.details
      });
      throw new Error('Failed to send email notification');
    }

    // 返回成功响应
    return {
      success: true,
      message: '提交成功！感谢您的推荐'
    };
  } catch (error: any) {
    console.error('Error processing form submission:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: '提交失败，请稍后重试'
    });
  }
});
