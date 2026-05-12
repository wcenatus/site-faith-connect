// Formats an ISO date string into a short, human-friendly event label.
// Example: "2025-05-12T22:00:00.000Z" → "Sun, May 12 · 6:00 PM"
export function formatEventDate(iso: string, locale: string = "en-US"): string {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

// Formats an ISO date string as a full calendar date.
// Example: "2025-05-18T22:00:00.000Z" → "Sat, May 18, 2025"
export function formatEventDateLong(
  iso: string,
  locale: string = "en-US",
): string {
  return new Date(iso).toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Formats a start/end time pair as a clock range, with optional timezone label.
// Example: ("2025-05-18T23:00:00Z", "2025-05-19T00:30:00Z", "EDT")
//          → "7:00 PM – 8:30 PM EDT"
export function formatEventTimeRange(
  startIso: string,
  endIso?: string | null,
  timezone?: string | null,
  locale: string = "en-US",
): string {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };
  const start = new Date(startIso).toLocaleTimeString(locale, timeOptions);
  const end = endIso
    ? new Date(endIso).toLocaleTimeString(locale, timeOptions)
    : null;
  const range = end ? `${start} – ${end}` : start;
  return timezone ? `${range} ${timezone}` : range;
}
