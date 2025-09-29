# GLOBALS

## Product Truth

- SILO pillars: AEGIS, COMPASS, LENS, VANTA.
- Always reflect the latest SPEC docs under agents/contexts/\*_/ _\_SPEC.md and \*\_MASTER.md.
- Do not invent features not in SPEC.

## Security & Privacy

- No PII in logs.
- Only call external APIs when keys are present.
- Respect RLS policies when accessing Supabase.

## UI Rules

- Use design tokens in agents/contexts/ui/tokens.md.
- Meet WCAG AA; keyboard and screen reader friendly.

## Testing

- When changing behavior, add/adjust unit + integration + e2e as appropriate.
- Keep CLS < 0.1 for UI changes impacting layout.

## Performance

- Prefer incremental rendering.
- Cache safe gets; avoid caching user-specific responses without keys.
