import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM || "Hair Plan <noreply@yourdomain.com>";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

export async function sendPlanPreview(params: {
  to: string;
  insight?: string;
  sessionId?: string;
}): Promise<{ sent: boolean; id?: string | null }> {
  if (!resendKey) {
    console.warn("[email] RESEND_API_KEY missing - skipping send");
    return { sent: false, id: null };
  }

  const resend = new Resend(resendKey);
  const { to, insight, sessionId } = params;

  const subject = "Your Hair Plan Preview";
  const site = getSiteUrl();
  const manageUrl =
    sessionId ? `${site}/?session=${encodeURIComponent(sessionId)}` : site;

  const html = `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0b0b0c; padding: 24px;">
    <h1 style="margin:0 0 12px; font-size: 20px;">Your personalized insight</h1>
    <p style="margin: 0 0 12px;">Here is your free insight based on your answers:</p>
    ${insight ? `<blockquote style="margin: 0 0 16px; padding: 12px 16px; border-left: 3px solid #111; background: #f6f6f7;">${insight}</blockquote>` : ""}
    <p style="margin: 0 0 16px;">
      Ready for the complete, personalized plan (dosages, timing, stack, and topical pairings)?
    </p>

    <p style="margin: 16px 0;">
      <a href="${manageUrl}" style="display: inline-block; text-decoration: none; padding: 10px 16px; background: #111; color: #fff; border-radius: 6px;">
        View your plan preview
      </a>
    </p>

    <p style="margin: 8px 0 0; font-size: 12px; color: #6b6b70;">
      You are receiving this email because you requested a plan preview. You can opt out anytime.
    </p>
  </div>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
    });
    return { sent: Boolean(result?.data?.id), id: result?.data?.id ?? null };
  } catch (err) {
    console.error("[email] sendPlanPreview error", err);
    return { sent: false, id: null };
  }
}

export async function sendFullPlan(params: {
  to: string;
  planHtml: string;
  sessionId?: string;
  subject?: string;
}): Promise<{ sent: boolean; id?: string | null }> {
  if (!resendKey) {
    console.warn("[email] RESEND_API_KEY missing - skipping full plan send");
    return { sent: false, id: null };
  }

  const resend = new Resend(resendKey);
  const { to, planHtml, sessionId, subject } = params;

  const site = getSiteUrl();
  const portalUrl =
    sessionId ? `${site}/?session=${encodeURIComponent(sessionId)}` : site;

  const wrappedHtml = `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0b0b0c; padding: 24px;">
    <h1 style="margin:0 0 12px; font-size: 20px;">Your Complete Hair Plan</h1>
    <p style="margin: 0 0 16px;">Below is your personalized plan. We’ve also saved it so you can view it anytime:</p>
    <p style="margin: 8px 0 16px;">
      <a href="${portalUrl}" style="display: inline-block; text-decoration: none; padding: 10px 16px; background: #111; color: #fff; border-radius: 6px;">
        View your plan online
      </a>
    </p>
    <div style="border: 1px solid #e6e6e7; border-radius: 10px; padding: 16px; background:#fff;">
      ${planHtml}
    </div>
    <p style="margin: 16px 0 0; font-size: 12px; color: #6b6b70;">
      If you have questions, just reply to this email.
    </p>
  </div>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: subject || "Your Complete Hair Plan",
      html: wrappedHtml,
    });
    return { sent: Boolean(result?.data?.id), id: result?.data?.id ?? null };
  } catch (err) {
    console.error("[email] sendFullPlan error", err);
    return { sent: false, id: null };
  }
}