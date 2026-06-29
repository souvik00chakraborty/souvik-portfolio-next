import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/auth";

export async function POST() {
  try {
    await logoutAdmin();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during logout." },
      { status: 500 }
    );
  }
}
