import localFont from 'next/font/local';
import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    template: "%s / The Achievers Focus",
    default: "Welcome / The Achievers Focus",
  },
  description:
    "The Achievers Focus is an easy-to-use exam generator that helps educators and trainers create, manage, and grade tests effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
