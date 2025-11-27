"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="
      w-full mt-32 border-t border-white/10 dark:border-white/5 
      bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl
      shadow-[0_-4px_30px_rgba(0,0,0,0.1)]
    ">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* --- TOP ZONE --- */}
        <div className="flex flex-col md:flex-row justify-between gap-14">
          
          {/* LOGO */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600" />
              <h2 className="text-xl font-bold">E-Book Factory</h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Le générateur d’ebooks le plus rapide et le plus complet du marché.  
              Création instantanée, contenu sur-mesure, et droits de revente inclus.
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:w-2/3">

            {/* PRODUCT */}
            <div>
              <h3 className="font-semibold mb-3">Produit</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/create/title" className="hover:text-blue-500 transition">Créer un ebook</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-500 transition">Tarifs</Link></li>
                <li><Link href="/examples" className="hover:text-blue-500 transition">Exemples</Link></li>
                <li><Link href="/faq" className="hover:text-blue-500 transition">FAQ</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="font-semibold mb-3">Légal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/conditions" className="hover:text-blue-500 transition">Conditions</Link></li>
                <li><Link href="/confidentialite" className="hover:text-blue-500 transition">Confidentialité</Link></li>
                <li><Link href="/licence" className="hover:text-blue-500 transition">Licence de revente</Link></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="font-semibold mb-3">Ressources</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/blog" className="hover:text-blue-500 transition">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
                <li><Link href="/support" className="hover:text-blue-500 transition">Support</Link></li>
                <li><Link href="/guides" className="hover:text-blue-500 transition">Guides & ressources</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-12 pt-6 border-t border-white/10 dark:border-white/5 
                        flex flex-col md:flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} E-Book Factory — Tous droits réservés.</p>
          <p>Conçu avec ❤️ pour créateurs et entrepreneurs.</p>
        </div>

      </div>
    </footer>
  );
}
