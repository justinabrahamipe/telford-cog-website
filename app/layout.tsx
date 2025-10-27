import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { FacebookSDK } from '../src/components/FacebookSDK';
import '../src/reset.css';
import '../src/index.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mahanaim COG Telford',
  description: 'Mahanaim Church of God Telford',
  icons: {
    icon: [
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Arsenal:400,400i,700,700i&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <FacebookSDK />
      </body>
    </html>
  );
}
