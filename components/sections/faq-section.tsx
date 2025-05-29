"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  subtitle?: string
  faqs: FAQItem[]
}

export default function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-dark text-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-unika-dark-lighter rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-unika-yellow transition-transform ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
