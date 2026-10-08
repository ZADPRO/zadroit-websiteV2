import { notificationEmails } from "../data/websiteData";

export const ADMIN_EMAIL = notificationEmails[0] || "indumathi.r@zadroit.com";

export interface EmailPayload {
  subject: string;
  senderName?: string;
  senderEmail?: string;
  phone?: string;
  formType: string;
  data: Record<string, any>;
  recipients?: string[];
}

/**
 * Dispatches form submission details directly to all configured Zadroit notification email IDs
 * completely in the background without opening the user's mail client.
 *
 * Reads recipient emails dynamically from websiteData.json (under "notificationEmails").
 * Adding or updating email IDs in websiteData.json will automatically dispatch submissions to all of them.
 */
export async function sendEmailToAdmin(payload: EmailPayload): Promise<boolean> {
  const targetEmails =
    payload.recipients && payload.recipients.length > 0
      ? payload.recipients
      : notificationEmails && notificationEmails.length > 0
      ? notificationEmails
      : ["indumathi.r@zadroit.com", "Vijay.loganathan@zadroit.com"];

  // Deduplicate and filter valid emails
  const validEmails = Array.from(
    new Set(
      targetEmails
        .map((e) => e?.trim())
        .filter((e): e is string => Boolean(e && e.includes("@")))
    )
  );

  if (validEmails.length === 0) {
    console.warn("No valid recipient emails configured in websiteData.json");
    return false;
  }

  const postData = {
    _subject: payload.subject,
    _template: "table",
    _captcha: "false",
    _cc: validEmails.slice(1).join(","),
    form_type: payload.formType,
    full_name: payload.senderName || "Not provided",
    email: payload.senderEmail || "Not provided",
    phone: payload.phone || "Not provided",
    ...payload.data,
    timestamp: new Date().toISOString(),
  };

  try {
    // Send form submission to all configured recipient emails in parallel
    const requests = validEmails.map((email) =>
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postData),
      })
    );

    const results = await Promise.allSettled(requests);
    const hasSuccess = results.some(
      (res) => res.status === "fulfilled" && res.value.ok
    );

    return hasSuccess;
  } catch (error) {
    console.warn("Background email dispatch:", error);
    return true;
  }
}
