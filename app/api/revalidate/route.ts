import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    // Estrai il token di sicurezza e il percorso dalla query string
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get("secret")
    const path = searchParams.get("path") || "/"

    // Verifica che il token di sicurezza sia valido
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        {
          revalidated: false,
          message: "Invalid revalidation token",
        },
        { status: 401 },
      )
    }

    // Revalida il percorso specificato
    revalidatePath(path)

    // Restituisci una risposta di successo
    return NextResponse.json({
      revalidated: true,
      message: `Path ${path} revalidated successfully`,
    })
  } catch (error) {
    // Gestisci eventuali errori
    console.error("Error during revalidation:", error)

    return NextResponse.json(
      {
        revalidated: false,
        message: "Error during revalidation",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
