import { Resend } from "resend";
import nodemailer from "nodemailer";

const resendKey = process.env.RESEND_API_KEY || "";
const resendFrom = process.env.RESEND_FROM || "Fasting Plan <noreply@yourdomain.com>";

// SMTP configuration (via env)
const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = Number(process.env.SMTP_PORT || (process.env.SMTP_SECURE ? 465 : 587));
const smtpSecure = (() => {
  const v = String(process.env.SMTP_SECURE ?? "").trim().toLowerCase();
  if (v === "true" || v === "1" || v === "yes" || v === "on") return true;
  if (v === "false" || v === "0" || v === "no" || v === "off") return false;
  // If not explicitly set, infer from port: 465 => secure
  return smtpPort === 465;
})();
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const smtpFrom = process.env.SMTP_FROM || resendFrom;

function hasSmtp(): boolean {
  return Boolean(smtpHost && smtpUser && smtpPass);
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

async function sendWithSMTP(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<{ sent: boolean; id?: string | null }> {
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });

    console.log("[email] SMTP sent", {
      ok: true,
      messageId: info?.messageId || null,
    });

    return { sent: true, id: info?.messageId || null };
  } catch (err: any) {
    console.error("[email] SMTP send error", {
      message: err?.message || String(err),
    });
    return { sent: false, id: null };
  }
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<{ sent: boolean; id?: string | null }> {
  if (!resendKey) {
    console.warn("[email] RESEND_API_KEY missing - skipping resend send");
    return { sent: false, id: null };
  }
  try {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from: resendFrom,
      to: [params.to],
      subject: params.subject,
      html: params.html || (params.text ? `<pre>${params.text}</pre>` : "<div/>"),
    });

    console.log("[email] Resend sent", {
      ok: Boolean(result?.data?.id),
      id: result?.data?.id || null,
    });

    return { sent: Boolean(result?.data?.id), id: result?.data?.id ?? null };
  } catch (err: any) {
    console.error("[email] Resend send error", {
      message: err?.message || String(err),
    });
    return { sent: false, id: null };
  }
}

/**
 * Generic email sender that prefers SMTP if configured, then falls back to Resend if available.
 */
export async function sendEmailRaw(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<{ sent: boolean; id?: string | null; via?: "smtp" | "resend" | "none" }> {
  // Try SMTP first
  if (hasSmtp()) {
    const smtpResult = await sendWithSMTP(params);
    if (smtpResult.sent) return { ...smtpResult, via: "smtp" };
    // If SMTP configured but failed, attempt Resend as a fallback
    if (resendKey) {
      const resendResult = await sendWithResend(params);
      return { ...resendResult, via: resendResult.sent ? "resend" : "none" };
    }
    return { ...smtpResult, via: "none" };
  }

  // Fallback to Resend if available
  if (resendKey) {
    const resendResult = await sendWithResend(params);
    return { ...resendResult, via: resendResult.sent ? "resend" : "none" };
  }

  console.warn("[email] No SMTP or Resend configured - skipping send");
  return { sent: false, id: null, via: "none" };
}

export async function sendPlanPreview(params: {
  to: string;
  insight?: string;
  sessionId?: string;
}): Promise<{ sent: boolean; id?: string | null }> {
  const { to, insight, sessionId } = params;

  const subject = "Your Personalized Fasting Insight";
  const site = getSiteUrl();
  const manageUrl = sessionId ? `${site}/?session=${encodeURIComponent(sessionId)}` : site;

  const html = `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0b0b0c; padding: 24px;">
    <h1 style="margin:0 0 12px; font-size: 20px;">Your personalized fasting insight</h1>
    <p style="margin: 0 0 12px;">Here is your free insight based on your assessment answers:</p>
    ${insight ? `<blockquote style="margin: 0 0 16px; padding: 12px 16px; border-left: 3px solid #56a156; background: #f0f7f0;">${insight}</blockquote>` : ""}
    <p style="margin: 0 0 16px;">
      Ready for your complete intermittent fasting plan — including your custom fasting window, fat-burning strategy, first-meal protocol, and weekly rhythm?
    </p>

    <p style="margin: 16px 0;">
      <a href="${manageUrl}" style="display: inline-block; text-decoration: none; padding: 10px 16px; background: #3d8c3d; color: #fff; border-radius: 6px;">
        View your fasting plan preview
      </a>
    </p>

    <p style="margin: 8px 0 0; font-size: 12px; color: #6b6b70;">
      You are receiving this email because you requested a plan preview. You can opt out anytime.
    </p>
  </div>
  `;

  try {
    const result = await sendEmailRaw({ to, subject, html });
    return { sent: result.sent, id: result.id ?? null };
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
  const { to, planHtml, sessionId, subject } = params;

  const site = getSiteUrl();
  const portalUrl = sessionId ? `${site}/?session=${encodeURIComponent(sessionId)}` : site;

  const wrappedHtml = `
  <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0b0b0c; padding: 24px;">
    <h1 style="margin:0 0 12px; font-size: 20px;">Your Complete Intermittent Fasting Plan</h1>
    <p style="margin: 0 0 16px;">Below is your personalized fasting plan. We’ve also saved it so you can view it anytime:</p>
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
    const result = await sendEmailRaw({
      to,
      subject: subject || "Your Complete Intermittent Fasting Plan",
      html: wrappedHtml,
    });
    return { sent: result.sent, id: result.id ?? null };
  } catch (err) {
    console.error("[email] sendFullPlan error", err);
    return { sent: false, id: null };
  }
}