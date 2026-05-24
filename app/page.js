'use client';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Approach from './components/Approach/Approach';
import Projects from './components/Projects/Projects';
import Testimonials from './components/Testimonials/Testimonials';
import ContactModal from './components/ContactModal/ContactModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />
      <Hero onConnectClick={() => setModalOpen(true)} />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Approach />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Projects />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Testimonials />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}