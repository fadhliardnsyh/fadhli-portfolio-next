"use client";

import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ContactModal from "../ContactModal/ContactModal";

export default function NavbarWrapper() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener("openContactModal", open);
    return () => window.removeEventListener("openContactModal", open);
  }, []);

  return (
    <>
      <Navbar onConnectClick={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
