import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  referralSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = waitlistSchema.parse(body)

    // Get client IP and user agent
    const clientIP = request.ip ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"

    const userAgent = request.headers.get("user-agent") || "unknown"

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id, email, position")
      .eq("email", validatedData.email.toLowerCase())
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Database check error:", checkError)
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already registered",
          position: existingUser.position
        },
        { status: 400 }
      )
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email: validatedData.email.toLowerCase(),
        first_name: validatedData.firstName,
        last_name: validatedData.lastName || null,
        referral_source: validatedData.referralSource || null,
        utm_source: validatedData.utmSource || null,
        utm_medium: validatedData.utmMedium || null,
        utm_campaign: validatedData.utmCampaign || null,
        ip_address: clientIP,
        user_agent: userAgent,
      })
      .select("id, email, position")
      .single()

    if (error) {
      console.error("Insert error:", error)
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      email: data.email,
      position: data.position,
      message: "Successfully joined the waitlist!",
    })

  } catch (error) {
    console.error("Waitlist API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: error.errors.map(e => e.message).join(", ")
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const email = url.searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      )
    }

    // Get waitlist position for specific email
    const { data, error } = await supabase
      .from("waitlist")
      .select("email, position, status, created_at")
      .eq("email", email.toLowerCase())
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Email not found in waitlist" },
          { status: 404 }
        )
      }
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      email: data.email,
      position: data.position,
      status: data.status,
      joinedAt: data.created_at,
    })

  } catch (error) {
    console.error("Waitlist GET API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}