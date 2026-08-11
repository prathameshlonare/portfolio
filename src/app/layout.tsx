import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/providers/transition-provider";
import { InitialLoader } from "@/components/animated/initial-loader";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prathameshlonare.me"),
  title: "Prathamesh Lonare | DevOps & Cloud Systems Engineer",
  description:
    "DevOps Engineer specializing in AWS, Terraform, Docker, and CI/CD automation. Building resilient, scalable, and automated cloud infrastructure.",
  keywords: ["DevOps", "AWS", "Terraform", "Docker", "CI/CD", "Cloud Infrastructure", "Prathamesh Lonare"],
  authors: [{ name: "Prathamesh Lonare" }],
  alternates: {
    canonical: "https://prathameshlonare.me/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Prathamesh Lonare | DevOps & Cloud Systems Engineer",
    description: "DevOps Engineer specializing in AWS, Terraform, Docker, and CI/CD automation.",
    url: "https://prathameshlonare.me",
    siteName: "Prathamesh Lonare",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Prathamesh Lonare — DevOps Engineer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Lonare | DevOps & Cloud Systems Engineer",
    description: "DevOps Engineer specializing in AWS, Terraform, Docker, and CI/CD automation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prathamesh Lonare",
    jobTitle: "DevOps & Cloud Systems Engineer",
    url: "https://prathameshlonare.me",
    sameAs: [
      "https://github.com/prathameshlonare",
      "https://www.linkedin.com/in/prathamesh-lonare21/",
    ],
    knowsAbout: [
      "AWS Lambda",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "DynamoDB",
      "CI/CD Automation",
      "Linux & Bash",
    ],
  };

  return (
    <html lang="en" className={`antialiased ${syne.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c0b6e20c1e38446ebbc4abb4ced1066c"}'
          crossOrigin="anonymous"
        />
      </head>
      <body className="text-[#1A1A2E] selection:bg-[#FF6B35] selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#FF6B35] focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm">
          Skip to content
        </a>
        <InitialLoader />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
