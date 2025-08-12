import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const noto_sans_devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-devanagari',
});

export const metadata: Metadata = {
  title: 'गणपती देणगी | Ganpati Donations',
  description: 'श्री गणेशाय नमः - गणपती बाप्पाच्या देणगीसाठी योगदान द्या',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr">
      <body className={`${inter.variable} ${noto_sans_devanagari.variable}`}>
        {children}
      </body>
    </html>
  );
}