import './globals.css';
import { Inter } from 'next/font/google';
import ProvidersWrapper from './ProvidersWrapper';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Brew Machina',
  description: 'Brew Machina goated shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProvidersWrapper>
        <body className={inter.className}>{children}</body>
      </ProvidersWrapper>
    </html>
  );
}
