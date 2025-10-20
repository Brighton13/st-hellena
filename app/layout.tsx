import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'St. Helena Parish - Faith, Hope, and Love',
  description: 'Welcome to St. Helena Parish. Join us in worship, fellowship, and service as we grow together in faith.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
