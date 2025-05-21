"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface AppleNavProps {
  logo: string
  items: NavItem[]
}

export default function AppleNav({ logo, items }: AppleNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-black/5 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between h-12 px-4 md:px-6">
            <Link href="/" className="flex items-center">
              <Image
                src={logo || "/placeholder.svg?height=40&width=40"}
                alt="Logo"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
            </Link>

            <div className="hidden md:flex space-x-8">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`text-xs font-medium transition-colors ${
                    isScrolled ? "text-gray-800 hover:text-black" : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button aria-label="Search" className={`p-1 ${isScrolled ? "text-gray-800" : "text-white"}`}>
                <Search className="h-4 w-4" />
              </button>
              <button
                aria-label="Menu"
                className={`md:hidden p-1 ${isScrolled ? "text-gray-800" : "text-white"}`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-4">
              <button aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-8">
              <ul className="space-y-6">
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-medium text-gray-900 block py-2 border-b border-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
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
