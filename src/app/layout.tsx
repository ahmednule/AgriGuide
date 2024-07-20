import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import { Toaster } from "react-hot-toast";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the Font Awesome styles manually
import "@fortawesome/fontawesome-svg-core/styles.css";

// Get the configuration object
import { config } from "@fortawesome/fontawesome-svg-core";

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriGuide",
  description:
    "Revolutionize farming with our AI app for identifying and managing crop pests and diseases, providing tailored treatment recommendations and expert support for increased yields and sustainability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
