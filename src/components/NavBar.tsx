import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "../lib/i18n";

export function NavBar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/generations", label: t.nav.generations },
    { to: "/admin", label: t.nav.admin },
    { to: "/readme", label: t.nav.readme },
    { to: "/join", label: t.nav.join },
  ];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <a href="/" className="inline-flex items-center gap-2 font-display font-bold text-base tracking-tight text-foreground hover:text-accent transition-colors">
            <span className="text-accent font-extrabold">5F</span>
            <span className="hidden sm:inline text-sm font-semibold opacity-80">Five Fail Family</span>
          </a>
        </div>

        <ul className="hidden items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                inactiveProps={{
                  className: "text-foreground hover:bg-secondary",
                }}
                className="rounded-lg px-3 py-1.5 transition"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div ref={ref} className="relative md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-card shadow-sm"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl bg-popover shadow-lg">
                <ul className="py-1 font-mono text-xs font-semibold uppercase">
                  {links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-accent text-accent-foreground" }}
                        inactiveProps={{
                          className: "text-foreground hover:bg-secondary",
                        }}
                        className="block px-4 py-2.5 transition"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
