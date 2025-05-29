import type { Metadata } from "next"
import { getAllTrainers } from "@/lib/wordpress"
import TrainersClientPage from "./TrainersClientPage"

export const metadata: Metadata = {
  title: "I Nostri Trainer | Unika Fitness Club",
  description:
    "Scopri il nostro team di professionisti qualificati, pronti ad accompagnarti nel tuo percorso verso il benessere.",
}

export default async function TrainersPage() {
  const trainers = await getAllTrainers()

  return <TrainersClientPage trainers={trainers} />
}
