"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
}

interface MainNavbarProps {
  logo?: string
  logoText?: string
  showSearch?: boolean
}

export default function MainNavbar({
  logo = "/placeholder.svg?height=40&width=40",
  logoText = "UNIKA",
  showSearch = true,
}: MainNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  // Definizione degli elementi di navigazione
  const navItems: NavItem[] = [
    { label: "CHI SIAMO", href: "/#chi-siamo" },
    { label: "CORSI", href: "/#corsi" },
    { label: "ORARI", href: "/#orari" },
    { label: "TEAM", href: "/trainers" },
    { label: "BLOG", href: "/#blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "CONTATTI", href: "/#contatti" },
    { label: "PRENOTA", href: "/#prenota" },
  ]

  // Gestione dello scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Gestione dell'hash per i link attivi (solo lato client)
  useEffect(() => {
    const handleHashChange = () => {
      // Forza un re-render quando cambia l'hash
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Blocca lo scroll quando il menu mobile è aperto
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen, isSearchOpen])

  // Gestione della ricerca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearchOpen(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Verifica se un link è attivo
  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      // Per i link interni alla home page, sono attivi solo se siamo nella home
      // Non possiamo accedere a window.location durante il server-side rendering
      return pathname === "/"
    } else if (href === "/") {
      return pathname === "/"
    } else {
      // Per i link esterni, controlla se il pathname inizia con l'href
      return pathname.startsWith(href)
    }
  }

  // Gestione dei click sui link per gestire correttamente i link interni e esterni
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Se è un link interno alla home page
    if (href.startsWith("/#")) {
      // Se siamo già nella home page, scorriamo alla sezione
      if (pathname === "/") {
        e.preventDefault()
        const targetId = href.substring(2)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
          window.history.pushState({}, "", href.substring(1))
        }
      }
      // Altrimenti, lasciamo che il link funzioni normalmente (navigherà alla home e poi alla sezione)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-unika-dark shadow-md" : "bg-black/50 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between h-16 px-4 md:px-6">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 hexagon bg-unika-dark">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-unika-yellow font-bold text-xl">{logoText.charAt(0)}</span>
                </div>
              </div>
              <span className="ml-2 text-white font-semibold hidden sm:block">{logoText}</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors ${
                    item.label === "PRENOTA"
                      ? `bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover px-4 py-2 rounded-full`
                      : isActive(item.href)
                        ? "text-white font-bold border-b-2 border-white"
                        : "text-white hover:opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {showSearch && (
                <button aria-label="Search" className="p-1 text-white" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </button>
              )}
              <button aria-label="Menu" className="lg:hidden p-1 text-white" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-unika-dark z-50 overflow-hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-end p-4">
              <button aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-8">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`text-2xl font-medium block py-2 border-b border-gray-700 ${
                        item.label === "PRENOTA"
                          ? "text-unika-yellow"
                          : isActive(item.href)
                            ? "text-white font-bold"
                            : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay di ricerca */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-start pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-3xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Cerca nel sito</h2>
                <button
                  aria-label="Close search"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-white hover:text-unika-yellow"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cosa stai cercando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white text-white text-xl py-2 px-4 focus:outline-none focus:border-unika-yellow"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-white hover:text-unika-yellow"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                </div>
              </form>

              <div className="mt-8 text-gray-400">
                <p>Suggerimenti:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Pilates", "EMS", "Orari", "Corsi", "Personal Training"].map((term, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-unika-dark-lighter"
                      onClick={() => {
                        setSearchQuery(term)
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
