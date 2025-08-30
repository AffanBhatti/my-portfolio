// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust weights as you like
});

export const metadata: Metadata = {
  title: "Affan Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Apply the font to the whole app */}
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
