"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Tracks which page section is active by scanning all observed sections
 * on every scroll and picking the one closest to the viewport centre.
 *
 * Uses a scroll listener (throttled via rAF) rather than
 * IntersectionObserver thresholds to avoid edge cases where sections
 * at viewport edges are missed.
 *
 * @param sections Record mapping element IDs → logical section names
 * @returns The logical name of the currently active section (or `null`)
 */
export function useActiveSection(
  sections: Record<string, string>
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    const ids = Object.keys(sections);
    const cleanups: (() => void)[] = [];
    let mo: MutationObserver | null = null;

    function update() {
      const centre = window.innerHeight / 2;
      let closest: string | null = null;
      let minDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // Skip sections fully off-screen
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

        const elCentre = rect.top + rect.height / 2;
        const dist = Math.abs(elCentre - centre);

        if (dist < minDist) {
          minDist = dist;
          closest = id;
        }
      }

      if (closest && sections[closest]) {
        setActiveId(sections[closest]);
      }
    }

    function attachScrollListener() {
      const onScroll = () => {
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf.current);
      });
    }

    function trySetup() {
      const found = ids.some((id) => document.getElementById(id));
      if (found) {
        update();
        attachScrollListener();
        return true;
      }
      return false;
    }

    // Try immediate setup; fall back to MutationObserver if sections
    // aren't in the DOM yet (e.g. lazy rendering)
    if (!trySetup()) {
      mo = new MutationObserver(() => {
        if (trySetup()) mo!.disconnect();
      });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => mo!.disconnect());
    }

    return () => {
      for (const fn of cleanups) fn();
    };
  }, [sections]);

  return activeId;
}

/**
 * Returns true once the component has mounted on the client.
 * Prevents hydration mismatch between server render and client render.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
