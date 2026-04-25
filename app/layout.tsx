import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContractConsel | AI-Powered Legal Technology",
  description:
    "Redefining how legal work gets done. AI-powered contract review, drafting, document review, legal documentation, and eDiscovery for law firms and businesses.",
  keywords: [
    "AI legal technology",
    "contract review AI",
    "legal document automation",
    "eDiscovery AI",
    "contract drafting",
    "ContractConsel",
  ],
  openGraph: {
    title: "ContractConsel | AI-Powered Legal Technology",
    description:
      "Intelligent technology that empowers lawyers to operate at peak accuracy.",
    siteName: "ContractConsel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContractConsel | AI-Powered Legal Technology",
    description:
      "Intelligent technology that empowers lawyers to operate at peak accuracy.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
