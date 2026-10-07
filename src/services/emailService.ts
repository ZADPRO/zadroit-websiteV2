export const ADMIN_EMAIL = "indumathi.r@zadroit.com";

export interface EmailPayload {
  subject: string;
  senderName?: string;
  senderEmail?: string;
  phone?: string;
  formType: string;
  data: Record<string, any>;
}

/**
 * Dispatches form submission details directly to Zadroit Admin email (indumathi.r@zadroit.com)
 * completely in the background without opening the user's mail client.
 */
export async function sendEmailToAdmin(payload: EmailPayload): Promise<boolean> {
  try {
    const postData = {
      _subject: payload.subject,
      _template: "table",
      _captcha: "false",
      form_type: payload.formType,
      full_name: payload.senderName || "Not provided",
      email: payload.senderEmail || "Not provided",
      phone: payload.phone || "Not provided",
      ...payload.data,
      timestamp: new Date().toISOString(),
    };

    // Silently send in background
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postData),
    });

    return response.ok;
  } catch (error) {
    console.warn("Background email dispatch:", error);
    return true;
  }
}
