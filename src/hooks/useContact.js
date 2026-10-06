import { useContext } from "react";
import { ContactContext } from "../components/layout/contactContext";

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}