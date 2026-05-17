"use client";

import { useEffect, useState } from "react";
import { Counter } from "@/components/ui/animated-counter";

const SEEN_KEY = "visitor_counted";
const ACCENT = "#E85F5C";

export default function ViewerCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(SEEN_KEY);

    if (alreadySeen) {
      fetch("/api/visitors")
        .then((r) => r.json())
        .then((data) => setCount(data.count ?? 0))
        .catch(() => { });
    } else {
      fetch("/api/visitors", { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          setCount(data.count ?? 0);
          localStorage.setItem(SEEN_KEY, "1");
        })
        .catch(() => { });
    }
  }, []);

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-xs shadow-xs"
      style={{
        backgroundColor: `${ACCENT}10`,
        color: ACCENT,
      }}
    >
      <Counter
        end={count}
        duration={2}
        fontSize={16}
        className="p-0 leading-none font-mono"
        style={{ color: ACCENT }}
      />
      <span className="text-[12px] leading-none" style={{ color: ACCENT }}>
        visitors
      </span>
    </div>
  );
}
