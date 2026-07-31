import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu } from "lucide-react";
import { siteSections } from "@/lib/sections";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = siteSections.filter((section) => section.id !== "contact");

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8"
    >
      <div className="text-lg font-bold tracking-tight text-white mix-blend-difference drop-shadow-sm">
        {/*Portfolio*/}
      </div>

      <div className="hidden lg:flex items-center gap-0.5 bg-secondary/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border">
        {navItems.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="px-3.5 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-background/60 uppercase tracking-wider whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => scrollTo("contact")}
          className="bg-accent text-foreground px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5 sm:text-sm"
        >
          CONTACTEZ MOI !
        </button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Ouvrir le menu de navigation"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/80 backdrop-blur-sm border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-4/5 flex-col gap-1 border-l border-border bg-background sm:max-w-xs">
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

            <nav className="mt-10 flex flex-col gap-1" aria-label="Navigation principale">
              {siteSections.map((section) => (
                <SheetClose asChild key={section.id}>
                  <button
                    onClick={() => scrollTo(section.id)}
                    className="rounded-xl px-4 py-3 text-left text-base font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {section.label}
                  </button>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
