"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: PricingFeature[]
  popular?: boolean
  cta: string
  ctaLink: string
}

interface PricingSectionProps {
  title: string
  subtitle?: string
  plans: PricingPlan[]
}

export default function PricingSection({ title, subtitle, plans }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="abbonamenti" className="py-20 bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-unika-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-lg text-unika-dark-lighter max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <div className="flex justify-center mt-8">
            <div className="bg-white p-1 rounded-full shadow-sm inline-flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "monthly"
                    ? "bg-unika-yellow text-unika-dark"
                    : "bg-transparent text-unika-dark-lighter"
                }`}
              >
                Mensile
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === "annual"
                    ? "bg-unika-yellow text-unika-dark"
                    : "bg-transparent text-unika-dark-lighter"
                }`}
              >
                Annuale <span className="text-xs font-bold">-15%</span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={item}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? "border-2 border-unika-yellow relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-unika-yellow text-unika-dark text-xs font-bold px-4 py-1 rounded-bl-lg">
                    Più popolare
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-unika-dark mb-2">{plan.name}</h3>
                <p className="text-unika-dark-lighter mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-unika-dark">
                    €{billingPeriod === "annual" ? Math.round(plan.price * 0.85) : plan.price}
                  </span>
                  <span className="text-unika-dark-lighter">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`${feature.included ? "text-unika-dark" : "text-unika-dark-lighter line-through"}`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.ctaLink}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-unika-yellow hover:bg-unika-yellow-hover text-unika-dark"
                        : "bg-unika-dark hover:bg-unika-dark-lighter text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-unika-dark-lighter">
            Tutti gli abbonamenti includono l'iscrizione annuale. Per maggiori informazioni contattaci.
          </p>
        </div>
      </div>
    </section>
  )
}
