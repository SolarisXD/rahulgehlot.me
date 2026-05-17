import { getCount, incrementCount } from "@/lib/visitors";

/**
 * GET /api/visitors — returns the current visitor count (no increment).
 */
export async function GET() {
  try {
    const count = await getCount();
    return Response.json({ count });
  } catch (err) {
    console.error("[visitors] GET error:", err);
    return Response.json({ count: 0 }, { status: 500 });
  }
}

/**
 * POST /api/visitors — increments the count and returns the new value.
 */
export async function POST() {
  try {
    const count = await incrementCount();
    return Response.json({ count });
  } catch (err) {
    console.error("[visitors] POST error:", err);
    return Response.json({ count: 0 }, { status: 500 });
  }
}
