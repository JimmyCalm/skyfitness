import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "SkyFitnessPro",
  description: "Фитнес-приложение",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}