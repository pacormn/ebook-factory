"use client";

import Link from "next/link";
import { Mail, ExternalLink, Instagram, Twitter, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">

      {/* GRADIENT BACKGROUND ANIMATED */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 animate-gradient-x opacity-90"></div>

      {/* DECORATIVE GLOW */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-[110px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-white z-10">

        {/* TOP SECTION */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            E-Book Factory
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Crée des ebooks professionnels en quelques minutes.  
            Ressources prêtes à vendre. Licence incluse.
          </p>
        </div>

        {/* GRID LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Produit</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="footer-link">Accueil</Link></li>
              <li><Link href="/create/title" className="footer-link">Créer un ebook</Link></li>
              <li><Link href="/pricing" className="footer-link">Tarifs</Link></li>
              <li><Link href="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal-center" className="footer-link">Centre juridique</Link></li>
              <li><Link href="/conditions" className="footer-link">CGU</Link></li>
              <li><Link href="/conditions-vente" className="footer-link">CGV</Link></li>
              <li><Link href="/politique-confidentialite" className="footer-link">Confidentialité (RGPD)</Link></li>
              <li><Link href="/cookies" className="footer-link">Cookies</Link></li>
              <li><Link href="/mentions-legales" className="footer-link">Mentions légales</Link></li>
              <li><Link href="/licence" className="footer-link">Licence de revente</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Ressources</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="footer-link">Support</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/affiliation" className="footer-link">Programme d’affiliation</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 footer-link">
                <Mail size={16} /> contact@ebook-factory.fr
              </li>
              <li className="flex items-center gap-2 footer-link">
                <Instagram size={16} /> @ebookfactory
              </li>
              <li className="flex items-center gap-2 footer-link">
                <Twitter size={16} /> @ebookfactory
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/20 my-12"></div>

        {/* FINAL ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} E-Book Factory. Tous droits réservés.</p>

          <Link
            href="/create/title"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 active:scale-95"
          >
            Créer mon ebook <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>

    </footer>
  );
}
