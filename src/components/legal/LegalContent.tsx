// Single source for the Privacy Policy and Terms of Service text, used by the
// /privacy and /terms pages. Bump LEGAL_EFFECTIVE_DATE whenever either changes.
import { resetConsent } from "@/lib/consent";

export const LEGAL_EFFECTIVE_DATE = "2026-09-25";

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-foreground">{children}</span>
);

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>Custom Fasting Plan by Agile Rant (“we”, “us”) respects your privacy. This policy explains what we collect when you use our site, why we collect it, and how we handle it.</p>
      <p><Label>Information we collect:</Label> assessment answers, email address, technical data (like IP address and device info), and payment confirmations from our provider (Stripe). We do not store full card numbers.</p>
      <p><Label>How we use it:</Label> to provide your insight and full plan, process payments, send emails you request (like plan delivery and receipts), improve the service, and keep the platform secure.</p>
      <p><Label>Sharing:</Label> we share data with processors we use to operate the service (e.g., hosting, email, analytics, payments). We don’t sell your personal information.</p>
      <p><Label>Cookies and analytics:</Label> with your consent, we use Google Analytics cookies to measure how the site is used (pages visited, assessment and checkout steps). We don’t use advertising cookies. If you decline, analytics cookies aren’t set.{" "}
        <button type="button" onClick={resetConsent} className="underline underline-offset-2 hover:text-primary">Change cookie preferences</button>
      </p>
      <p><Label>Retention:</Label> we keep data as long as needed to provide the service and for legitimate business or legal reasons, then delete or anonymize it.</p>
      <p><Label>Your choices:</Label> you can request access or deletion of your data. You can unsubscribe from emails at any time via the link provided.</p>
      <p><Label>Security:</Label> we use reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure.</p>
      <p><Label>Children:</Label> the service isn’t intended for individuals under 18.</p>
      <p><Label>Contact:</Label> use the Help link in the footer or email ar@agilerant.info.</p>
      <p className="text-xs">Effective: {LEGAL_EFFECTIVE_DATE}</p>
    </div>
  );
}

export function TermsOfServiceContent() {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>By using Custom Fasting Plan by Agile Rant (“Service”), you agree to these Terms. If you don’t agree, please don’t use the Service.</p>
      <p><Label>Use of Service:</Label> You may use the Service for personal, non‑commercial purposes and must comply with applicable laws.</p>
      <p><Label>No medical advice:</Label> Content is for educational purposes only and does not constitute medical advice. Consult your clinician before making changes, especially if you have diabetes, are pregnant, or take medications.</p>
      <p><Label>Payments:</Label> Payments are processed by Stripe. Access to the full plan is delivered upon successful payment. Taxes may apply.</p>
      <p><Label>30-day money-back guarantee:</Label> If you’re not satisfied with your full plan, contact us at ar@agilerant.info within 30 days of purchase using the email address you purchased with, and we’ll refund your payment in full to the original payment method.</p>
      <p><Label>Accounts and communications:</Label> You agree to provide accurate information and consent to receive emails related to plan delivery and important updates. You can unsubscribe from marketing at any time.</p>
      <p><Label>Intellectual property:</Label> The Service and content are owned by Agile Rant or its licensors. You may not copy, modify, or resell without permission.</p>
      <p><Label>Prohibited conduct:</Label> Don’t misuse the Service, attempt to access others’ data, or interfere with operation or security.</p>
      <p><Label>Disclaimers:</Label> The Service is provided “as is” without warranties. We do not guarantee outcomes, results, or uninterrupted availability.</p>
      <p><Label>Limitation of liability:</Label> To the fullest extent permitted by law, Agile Rant and its affiliates are not liable for indirect, incidental, or consequential damages.</p>
      <p><Label>Governing law:</Label> These Terms are governed by the laws of the jurisdiction where Agile Rant operates, without regard to conflict of law principles.</p>
      <p><Label>Changes:</Label> We may update these Terms. Material changes will be indicated by updating the Effective date.</p>
      <p><Label>Contact:</Label> use the Help link in the footer or email ar@agilerant.info.</p>
      <p className="text-xs">Effective: {LEGAL_EFFECTIVE_DATE}</p>
    </div>
  );
}
