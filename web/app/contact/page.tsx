import type { Metadata } from "next";
import { ContactSection } from "../components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Devin Fitch. Open to junior developer roles, collaboration, and interesting projects.",
};

export default function ContactPage() {
  return <ContactSection />;
}
