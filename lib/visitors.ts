import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/** Fetch the current visitor count. */
export async function getCount(): Promise<number> {
  const { data, error } = await supabase
    .from("visitors")
    .select("count")
    .eq("id", 1)
    .single();

  if (error || !data) {
    console.error("[visitors] getCount error:", error);
    return 0;
  }

  return data.count as number;
}

/** Increment the visitor count and return the new value. */
export async function incrementCount(): Promise<number> {
  // Atomically increment via RPC (recommended) or fallback to read+write
  const { data, error } = await supabase.rpc("increment_visitor_count");

  if (error) {
    console.error("[visitors] RPC error, trying read+write fallback:", error.message);

    // Fallback: read + write
    const current = await getCount();
    const newCount = current + 1;

    const { error: updateError } = await supabase
      .from("visitors")
      .update({ count: newCount })
      .eq("id", 1);

    if (updateError) {
      console.error("[visitors] fallback update error:", updateError);
      return current;
    }

    return newCount;
  }

  return data as number;
}
