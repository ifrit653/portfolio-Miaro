import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu as MenuIcon } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Modal from "../ui/Modal";
import LanguageToggle from "./LanguageToggle";
import ContactModal from "./ContactModal";
import MobileMenu from "./MobileMenu";
import { NAV_ITEMS, SECTION_IDS, SITE } from "../../data/site";
import { scrollToSection } from "../../hooks/scrollToSection";
import { useScrolled } from "../../hooks/useScrolled";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Navbar.module.css";

const CLOSE_DELAY = 250; // let the drawer's exit animation (0.2s) finish first

export default function Navbar() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const headerRef = useRef(null);

  // Entrance animation
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-nav-animate]", {
        y: -16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: headerRef, dependencies: [reduced] }
  );

  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id, { reduced });
  };

  // From the drawer: close first, then scroll / open the contact modal
  const navigateFromMenu = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id, { reduced }), CLOSE_DELAY);
  };
  const contactFromMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setContactOpen(true), CLOSE_DELAY);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <Container className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={goTo("hero")}
            data-nav-animate
          >
            {SITE.brand}
          </a>

          <nav
            className={styles.nav}
            aria-label={t("nav.primary")}
            data-nav-animate
          >
            <ul className={styles.links}>
              {NAV_ITEMS.map(({ id, labelKey }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={styles.link}
                    aria-current={active === id ? "true" : undefined}
                    onClick={goTo(id)}
                  >
                    {t(labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions} data-nav-animate>
            <Button
              variant="red"
              className={styles.contact}
              onClick={() => setContactOpen(true)}
            >
              {t("nav.contact")}
            </Button>
            <LanguageToggle className={styles.lang} />
            <IconButton
              label={t("nav.openMenu")}
              className={styles.burger}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon size={22} />
            </IconButton>
          </div>
        </Container>
      </header>

      <Modal
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title={t("nav.menu")}
        hideTitle
        variant="fullscreen"
      >
        <MobileMenu
          active={active}
          onNavigate={navigateFromMenu}
          onContact={contactFromMenu}
        />
      </Modal>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
