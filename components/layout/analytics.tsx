import Script from "next/script";
import { analyticsId } from "@/content/site";

/**
 * Google Analytics 4 loader. Renders nothing unless
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is configured, so no measurement ID is ever
 * hard-coded in the repository.
 */
export function Analytics() {
  if (!analyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
