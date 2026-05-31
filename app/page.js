'use client';
import Hero from './components/Hero/Hero';
import Approach from './components/Approach/Approach';
import Projects from './components/Projects/Projects';
import Companies from './components/Companies/Companies';

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <Projects />
      <Companies />
    </>
  );
}