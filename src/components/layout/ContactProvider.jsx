import { useCallback, useMemo, useState } from "react";
import { ContactContext } from "./contactContext";
import ContactModal from "./ContactModal";

export default function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal open={open} onOpenChange={setOpen} />
    </ContactContext.Provider>
  );
}
