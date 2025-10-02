import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import HelpLink from "@/components/HelpLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

export default function PlanCancel() {
  const title = "Checkout canceled | Hair Plan";
  const description = "You canceled checkout. You can resume anytime to unlock your full plan.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://example.com/plan/cancel" />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />

        <main className="mx-auto max-w-3xl w-full px-4 py-16 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Checkout canceled</CardTitle>
              <CardDescription>
                No charge was made. You can return to your insight and resume whenever you’re ready.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button className="px-6">Return home</Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                Have questions before purchasing? Reach out and we’ll help.
              </p>
            </CardContent>
          </Card>
        </main>
        <footer className="border-t">
          <div className="mx-auto max-w-3xl w-full px-4 py-10 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p>© 2025 Custom Hair Plan by Agile Rant. All rights reserved.</p>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary">Privacy</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                      <DialogDescription>How we collect, use, and protect your information.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>Custom Hair Plan by Agile Rant (“we”, “us”) respects your privacy. This policy explains what we collect when you use our site, why we collect it, and how we handle it.</p>
                      <p><span className="font-medium text-foreground">Information we collect:</span> assessment answers, email address, technical data (like IP address and device info), and payment confirmations from our provider (Stripe). We do not store full card numbers.</p>
                      <p><span className="font-medium text-foreground">How we use it:</span> to provide your insight and full plan, process payments, send emails you request (like plan delivery and receipts), improve the service, and keep the platform secure.</p>
                      <p><span className="font-medium text-foreground">Sharing:</span> we share data with processors we use to operate the service (e.g., hosting, email, analytics, payments). We don’t sell your personal information.</p>
                      <p><span className="font-medium text-foreground">Retention:</span> we keep data as long as needed to provide the service and for legitimate business or legal reasons, then delete or anonymize it.</p>
                      <p><span className="font-medium text-foreground">Your choices:</span> you can request access or deletion of your data. You can unsubscribe from emails at any time via the link provided.</p>
                      <p><span className="font-medium text-foreground">Security:</span> we use reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure.</p>
                      <p><span className="font-medium text-foreground">Children:</span> the service isn’t intended for individuals under 18.</p>
                      <p><span className="font-medium text-foreground">Contact:</span> use the Help link in the footer or email ar@agilerant.info.</p>
                      <p className="text-xs">Effective: {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary">Terms</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                      <DialogDescription>Your agreement to use our service.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>By using Custom Hair Plan by Agile Rant (“Service”), you agree to these Terms. If you don’t agree, please don’t use the Service.</p>
                      <p><span className="font-medium text-foreground">Use of Service:</span> You may use the Service for personal, non‑commercial purposes and must comply with applicable laws.</p>
                      <p><span className="font-medium text-foreground">No medical advice:</span> Content is for educational purposes only and does not constitute medical advice. Consult your clinician before making changes.</p>
                      <p><span className="font-medium text-foreground">Payments:</span> Payments are processed by Stripe. Access to the full plan is delivered upon successful payment. Taxes may apply.</p>
                      <p><span className="font-medium text-foreground">Accounts and communications:</span> You agree to provide accurate information and consent to receive emails related to plan delivery and important updates. You can unsubscribe from marketing at any time.</p>
                      <p><span className="font-medium text-foreground">Intellectual property:</span> The Service and content are owned by Agile Rant or its licensors. You may not copy, modify, or resell without permission.</p>
                      <p><span className="font-medium text-foreground">Prohibited conduct:</span> Don’t misuse the Service, attempt to access others’ data, or interfere with operation or security.</p>
                      <p><span className="font-medium text-foreground">Disclaimers:</span> The Service is provided “as is” without warranties. We do not guarantee outcomes, results, or uninterrupted availability.</p>
                      <p><span className="font-medium text-foreground">Limitation of liability:</span> To the fullest extent permitted by law, Agile Rant and its affiliates are not liable for indirect, incidental, or consequential damages.</p>
                      <p><span className="font-medium text-foreground">Governing law:</span> These Terms are governed by the laws of the jurisdiction where Agile Rant operates, without regard to conflict of law principles.</p>
                      <p><span className="font-medium text-foreground">Changes:</span> We may update these Terms. Material changes will be indicated by updating the Effective date.</p>
                      <p><span className="font-medium text-foreground">Contact:</span> use the Help link in the footer or email ar@agilerant.info.</p>
                      <p className="text-xs">Effective: {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <HelpLink page="Plan Cancel" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}