"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ClassSchedule {
  id: string
  time: string
  name: string
  trainer: string
  duration: string
  level: "Principiante" | "Intermedio" | "Avanzato" | "Tutti i livelli"
  spots: number
  maxSpots: number
}

interface DaySchedule {
  day: string
  classes: ClassSchedule[]
}

interface ScheduleSectionProps {
  title: string
  subtitle?: string
  schedule: DaySchedule[]
}

export default function ScheduleSection({ title, subtitle, schedule }: ScheduleSectionProps) {
  const [activeDay, setActiveDay] = useState(0)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzato":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getAvailabilityColor = (spots: number, maxSpots: number) => {
    const percentage = (spots / maxSpots) * 100
    if (percentage <= 20) return "text-red-600"
    if (percentage <= 50) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <section id="orari-corsi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
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
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {schedule.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeDay === index
                    ? "bg-unika-yellow text-unika-dark"
                    : "bg-gray-200 text-unika-dark-lighter hover:bg-gray-300"
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Orario
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Corso
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Istruttore
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Durata
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Livello
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-unika-dark uppercase tracking-wider"
                  >
                    Disponibilità
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    <span className="sr-only">Prenota</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule[activeDay].classes.length > 0 ? (
                  schedule[activeDay].classes.map((classItem) => (
                    <tr key={classItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-unika-dark">
                        {classItem.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-unika-dark">{classItem.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-unika-dark-lighter">
                        {classItem.trainer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-unika-dark-lighter">
                        {classItem.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelColor(
                            classItem.level,
                          )}`}
                        >
                          {classItem.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={getAvailabilityColor(classItem.spots, classItem.maxSpots)}>
                          {classItem.spots} posti disponibili
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/prenota/${classItem.id}`}>
                          <Button
                            size="sm"
                            className="bg-unika-yellow hover:bg-unika-yellow-hover text-unika-dark"
                            disabled={classItem.spots === 0}
                          >
                            {classItem.spots > 0 ? "Prenota" : "Completo"}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-unika-dark-lighter">
                      Nessun corso programmato per questo giorno.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-unika-dark-lighter mb-4">
            Gli orari possono subire variazioni. Ti consigliamo di verificare sempre la disponibilità.
          </p>
          <Link href="/prenota">
            <Button className="bg-unika-dark hover:bg-unika-dark-lighter text-white">
              Visualizza calendario completo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
