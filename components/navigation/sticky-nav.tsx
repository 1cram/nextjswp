"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface StickyNavProps {
  logo: string
  items: NavItem[]
}

export default function StickyNav({ logo, items }: StickyNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Gestione dello scroll e dell'attivazione delle sezioni
  useEffect(() => {
    const handleScroll = () => {
      // Imposta isScrolled a true se lo scroll è maggiore di 10px
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Rileva la sezione attiva
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100 // offset per considerare l'altezza del menu

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Blocca lo scroll quando il menu mobile è aperto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Funzione per lo scroll fluido alle ancore
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Se è un link esterno o non inizia con #, naviga normalmente
    if (!href.startsWith("#")) {
      window.location.href = href
      return
    }

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Chiudi il menu mobile se aperto
      setIsMobileMenuOpen(false)

      // Scroll fluido alla sezione
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Aggiorna l'URL senza ricaricare la pagina
      window.history.pushState({}, "", href)
      setActiveSection(targetId)
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
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center"
            >
              <div className="relative h-10 w-10 hexagon bg-unika-dark">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-unika-yellow font-bold text-xl">U</span>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-sm font-medium transition-colors ${
                    item.label === "PRENOTA"
                      ? `bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover px-4 py-2 rounded-full`
                      : isScrolled
                        ? activeSection === item.href.substring(1)
                          ? "text-unika-yellow font-bold"
                          : "text-white hover:text-unika-yellow"
                        : activeSection === item.href.substring(1)
                          ? "text-unika-yellow font-bold"
                          : "text-white hover:text-unika-yellow"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button aria-label="Menu" className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
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
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`text-2xl font-medium block py-2 border-b border-gray-700 ${
                        item.label === "PRENOTA" ? "text-unika-yellow" : "text-white"
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
    </>
  )
}
