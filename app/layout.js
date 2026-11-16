import "./globals.css";
import AppProviders from "@/components/AppProviders";
import LoveBackground from "@/components/LoveBackground";
import MusicPlayer from "@/components/MusicPlayer";

export const metadata = {
  title: "A Little Story for Mr Hamza & Nuri",
  description:
    "A soft, animated little story created with love by Mr Hamza for Nuri.",
  applicationName: "A Little Story for Mr Hamza & Nuri",
  authors: [{ name: "Mr Hamza" }],
  keywords: ["Nuri", "Mr Hamza", "a little story", "love letter"],
  openGraph: {
    title: "A Little Story for Mr Hamza & Nuri",
    description:
      "A soft, animated little story created with love by Mr Hamza for Nuri.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffe8f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen antialiased">
        {/* Google Fonts are loaded at runtime with safe fallbacks, so the build
            never depends on network access. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Quicksand:wght@400;500;600;700&display=swap"
        />

        <AppProviders>
          <LoveBackground />
          <MusicPlayer />
          <main className="relative z-10">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
