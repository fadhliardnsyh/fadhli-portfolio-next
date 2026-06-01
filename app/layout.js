import { Poppins, Fraunces, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import NavbarWrapper from './components/NavbarWrapper/NavbarWrapper';
import Atmosphere from './components/Atmosphere/Atmosphere';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
export const metadata = {
  title: 'Fadhli Ardiansyah — UI/UX Designer',
  description: 'Portfolio of Fadhli Ardiansyah, UI/UX Designer based in Indonesia.',
  icons: {
    icon: '/assets/logo.svg',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Atmosphere />
        <CustomCursor />
        <NavbarWrapper />
        <Preloader />
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="beforeInteractive"
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`emailjs.init('nlyPz-J_9llBOMIOn');`}
        </Script>
        {children}
        <Footer />
      </body>
    </html>
  );
}