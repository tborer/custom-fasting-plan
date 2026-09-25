import LegalPage from "@/components/legal/LegalPage";
import { PrivacyPolicyContent } from "@/components/legal/LegalContent";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" description="How we collect, use, and protect your information." path="/privacy">
      <PrivacyPolicyContent />
    </LegalPage>
  );
}
