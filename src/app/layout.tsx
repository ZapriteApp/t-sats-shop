import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Font Awesome's CSS is imported in globals.css, so stop it injecting styles at runtime.
config.autoAddCss = false;

// Ubuntu isn't a variable font, so load each weight the site uses (it has no 600: use font-bold).
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-ubuntu" });

export const metadata: Metadata = {
  metadataBase: new URL("https://t-sats.com"),
  title: "T-sats Shop — a Zaprite Pay demo",
  description: "Buy a (pretend) t-shirt for $0.21 in bitcoin and see how checking out with Zaprite Pay works.",
  openGraph: {
    title: "T-sats Shop — a Zaprite Pay demo",
    description: "Buy a (pretend) t-shirt for $0.21 in bitcoin.",
    url: "https://t-sats.com",
    siteName: "T-sats Shop",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        {/* Vercel Web Analytics and Speed Insights (collect only when deployed on Vercel). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
