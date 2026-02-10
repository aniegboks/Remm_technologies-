import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // Add empty options object to satisfy the type
  revalidateTag("prismic", {});

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
