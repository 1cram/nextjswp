"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
  rating: number
}

interface TestimonialsProps {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ title, subtitle, testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length, current])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-20 bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-10"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-unika-dark-lighter hover:bg-unika-dark-darker transition-colors"
              aria-label="Testimonianza precedente"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          </div>

          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 md:translate-x-16 z-10"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-unika-dark-lighter hover:bg-unika-dark-darker transition-colors"
              aria-label="Testimonianza successiva"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="relative h-[400px] md:h-[300px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[current].image || "/placeholder.svg?height=200&width=200"}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -left-2 text-unika-yellow">
                      <Quote className="h-10 w-10" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg md:text-xl italic mb-6">{testimonials[current].quote}</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-unika-yellow">{testimonials[current].name}</h3>
                        <p className="text-gray-300">{testimonials[current].role}</p>
                      </div>
                      <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-2xl">
                            {i < testimonials[current].rating ? (
                              <span className="text-unika-yellow">★</span>
                            ) : (
                              <span className="text-gray-600">★</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                  setAutoplay(false)
                }}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === current ? "bg-unika-yellow" : "bg-gray-600"
                }`}
                aria-label={`Vai alla testimonianza ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
