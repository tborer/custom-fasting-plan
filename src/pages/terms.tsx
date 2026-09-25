import LegalPage from "@/components/legal/LegalPage";
import { TermsOfServiceContent } from "@/components/legal/LegalContent";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" description="Your agreement to use our service." path="/terms">
      <TermsOfServiceContent />
    </LegalPage>
  );
}
