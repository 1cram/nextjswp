"use client"

import { motion } from "framer-motion"
import FlipCard from "./flip-card"

interface Course {
  title: string
  description: string
  imageSrc: string
  link?: string
  level?: string
  benefits?: string[]
}

interface CoursesGridProps {
  title: string
  subtitle: string
  courses: Course[]
  backgroundColor?: string
  textColor?: string
}

export default function CoursesGrid({
  title,
  subtitle,
  courses,
  backgroundColor = "#f5f5f7",
  textColor = "#1d1d1f",
}: CoursesGridProps) {
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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="py-24 md:py-32" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl opacity-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course, index) => (
            <motion.div key={index} variants={item}>
              <FlipCard
                title={course.title}
                description={course.description}
                imageSrc={course.imageSrc}
                link={course.link}
                tags={course.level ? [course.level] : []}
                features={course.benefits?.slice(0, 3) || []}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
