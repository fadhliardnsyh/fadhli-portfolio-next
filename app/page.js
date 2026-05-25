'use client';
import Hero from './components/Hero/Hero';
import Approach from './components/Approach/Approach';
import Projects from './components/Projects/Projects';
import Testimonials from './components/Testimonials/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Approach />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Projects />
      <hr style={{ border: 'none', height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
      <Testimonials />
    </>
  );
}