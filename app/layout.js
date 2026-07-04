import { Poppins, Fraunces, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import NavbarWrapper from './components/NavbarWrapper/NavbarWrapper';
import Atmosphere from './components/Atmosphere/Atmosphere';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
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
  title: 'Fadhli Ardiansyah, UI/UX Designer',
  description: 'Portfolio of Fadhli Ardiansyah, UI/UX Designer based in Indonesia.',
  icons: {
    icon: '/assets/logo.svg',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${fraunces.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll />
        <Atmosphere />
        <CustomCursor />
        <NavbarWrapper />
        <Preloader />
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`
            window.__emailjsInit = () => {
              if (window.emailjs && !window.__emailjsReady) {
                window.emailjs.init('nlyPz-J_9llBOMIOn');
                window.__emailjsReady = true;
              }
            };
            if (window.emailjs) window.__emailjsInit();
            else {
              const check = setInterval(() => {
                if (window.emailjs) { window.__emailjsInit(); clearInterval(check); }
              }, 50);
              setTimeout(() => clearInterval(check), 8000);
            }
          `}
        </Script>
        {children}
        <Footer />
      </body>
    </html>
  );
}