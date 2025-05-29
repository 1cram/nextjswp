"use client"

import { motion } from "framer-motion"
import { Award, Clock, Users, Dumbbell, Heart, Zap } from "lucide-react"

interface Reason {
  icon: "award" | "clock" | "users" | "dumbbell" | "heart" | "zap"
  title: string
  description: string
}

interface WhyChooseUsProps {
  title: string
  subtitle?: string
  reasons: Reason[]
}

export default function WhyChooseUs({ title, subtitle, reasons }: WhyChooseUsProps) {
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

  const getIcon = (icon: string) => {
    switch (icon) {
      case "award":
        return <Award className="h-10 w-10 text-unika-yellow" />
      case "clock":
        return <Clock className="h-10 w-10 text-unika-yellow" />
      case "users":
        return <Users className="h-10 w-10 text-unika-yellow" />
      case "dumbbell":
        return <Dumbbell className="h-10 w-10 text-unika-yellow" />
      case "heart":
        return <Heart className="h-10 w-10 text-unika-yellow" />
      case "zap":
        return <Zap className="h-10 w-10 text-unika-yellow" />
      default:
        return null
    }
  }

  return (
    <section id="perche-sceglierci" className="py-20 bg-gradient-dark text-white">
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

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-unika-dark-lighter rounded-xl p-6 hover:bg-unika-dark-darker transition-colors"
            >
              <div className="mb-4">{getIcon(reason.icon)}</div>
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
