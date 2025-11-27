"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full mt-32">
      {/* 🔥 BACKGROUND GRADIENT ANIMÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 
                      opacity-[0.25] blur-[90px] animate-gradient-flow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 text-white">
        
        {/* TOP FLEX */}
        <div className="flex flex-col md:flex-row justify-between gap-16">
          
          {/* LOGO */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-purple-800/40 animate-glow-pulse" />
              <h2 className="text-2xl font-bold tracking-tight">E-Book Factory</h2>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              Génère des ebooks professionnels en quelques secondes.  
              Contenu sur-mesure, droits de revente, design premium — tout inclus.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:w-2/3">
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Produit</h3>
              <ul className="space-y-2 text-white/70">
                <FooterLink href="/create/title">Créer un ebook</FooterLink>
                <FooterLink href="/pricing">Tarifs</FooterLink>
                <FooterLink href="/examples">Exemples</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Légal</h3>
              <ul className="space-y-2 text-white/70">
                <FooterLink href="/conditions">Conditions</FooterLink>
                <FooterLink href="/politique-confidentialite">Confidentialité</FooterLink>
                <FooterLink href="/mentions-legales">Mentions légales</FooterLink>
                <FooterLink href="/cookies">Cookies</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Ressources</h3>
              <ul className="space-y-2 text-white/70">
                <FooterLink href="/blog">Guides & ressources</FooterLink>
                <FooterLink href="/support">Support</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between text-sm text-white/60">
          <p>© {new Date().getFullYear()} E-Book Factory — Tous droits réservés.</p>
          <p>Conçu avec ❤️ pour créateurs et entrepreneurs.</p>
        </div>

      </div>
    </footer>
  );
}

/* 🔥 Composant lien animé */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="relative inline-block transition-all duration-300
                 hover:text-white hover:translate-x-[2px]
                 before:absolute before:-bottom-0.5 before:left-0
                 before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300
                 hover:before:w-full"
      >
        {children}
      </Link>
    </li>
  );
}
