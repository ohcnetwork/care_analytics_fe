/**
 * Expands a context string into all possible hierarchical contexts.
 *
 * Features:
 * - Supports hierarchical contexts with ':' separator (e.g., "facility:patient:home")
 * - Supports multiple context hierarchies with '&' separator (e.g., "facility:patient & billing:invoice")
 * - Returns contexts in order from most general to most specific
 *
 * @param contextKey - The context string to expand
 * @param hierarchySeparator - Separator for hierarchy levels (default: ":")
 * @returns Array of expanded contexts
 *
 * @example
 * expandShortcutContext("facility:patient:home")
 * // Returns: ["facility", "facility:patient", "facility:patient:home"]
 *
 * @example
 * expandShortcutContext("facility:patient&billing:invoice")
 * // Returns: ["facility", "facility:patient", "billing", "billing:invoice"]
 */
export function expandShortcutContext(
  contextKey: string,
  hierarchySeparator = ":"
): string[] {
  if (!contextKey.trim()) {
    return [];
  }

  const normalizedKey = contextKey
    .trim()
    // Remove multiple consecutive separators
    .replace(new RegExp(`${hierarchySeparator}+`, "g"), hierarchySeparator)
    // Remove leading/trailing separators
    .replace(
      new RegExp(`^${hierarchySeparator}|${hierarchySeparator}$`, "g"),
      ""
    );

  if (!normalizedKey) {
    return [];
  }

  // Split by & to handle multiple context hierarchies
  const contextHierarchies = normalizedKey
    .split("&")
    .map((hierarchy) => hierarchy.trim())
    .filter(Boolean);

  const expandedContexts: string[] = [];

  for (const hierarchy of contextHierarchies) {
    const hierarchyParts = hierarchy.split(hierarchySeparator);

    // Build hierarchical contexts (e.g., ["a", "a:b", "a:b:c"])
    for (let i = 1; i <= hierarchyParts.length; i++) {
      const context = hierarchyParts.slice(0, i).join(hierarchySeparator);
      if (!expandedContexts.includes(context)) {
        expandedContexts.push(context);
      }
    }
  }

  return expandedContexts;
}

const clickDebounceMap = new Map<string, number>();
export function shortcutActionHandler(shortcutId: string) {
  return () => {
    const now = Date.now();
    const lastClick = clickDebounceMap.get(shortcutId) || 0;

    // Debounce clicks within 300ms
    if (now - lastClick < 300) {
      return;
    }

    clickDebounceMap.set(shortcutId, now);

    const element = document.querySelector(
      `[data-shortcut-id='${shortcutId}']`
    ) as HTMLElement;

    if (element) {
      if (element.tagName === "A" && "href" in element) {
        window.location.href = (element as HTMLAnchorElement).href;
      } else {
        element.click();
      }
    }
  };
}

export const isAppleDevice =
  /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);

export function formatKeyboardShortcut(key: string): string {
  if (key.includes("+")) {
    // Modifier key combination (ctrl+k -> CTRL + K or ⌘ + K)
    const parts = key.split("+");
    return parts
      .map((k) => {
        const lower = k.toLowerCase();
        if (lower === "ctrl" || lower === "cmd" || lower === "meta") {
          return isAppleDevice ? "⌘" : "CTRL";
        }
        if (lower === "shift") {
          return "⇧";
        }
        if (lower === "alt") {
          return isAppleDevice ? "⌥" : "ALT";
        }
        return k.toUpperCase();
      })
      .join(" + ");
  } else if (key.includes(" ")) {
    // Space-separated keys (g p -> G + P)
    return key
      .split(" ")
      .map((k) => k.toUpperCase())
      .join(" + ");
  } else {
    // Single key (a -> A)
    if (key === "arrowDown") {
      return "↓";
    }
    if (key === "escape") {
      return "ESC";
    } else if (key === "arrowLeft") {
      return "←";
    }
    return key.toUpperCase();
  }
}
