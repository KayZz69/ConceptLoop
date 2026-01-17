---
trigger: always_on
---

# Code style and structure

## Match existing code
- Follow the existing style in this project (naming, formatting, patterns). If unsure, copy the style of nearby files.
- Prefer small, focused functions and keep public APIs the same unless the user approves a change.

## Keep things modular
- New features go into their own file/module instead of making one huge file.
- Avoid big refactors unless specifically requested.

# Architecture rules

## Keep layers separate
- Respect existing architecture boundaries (UI, API/controllers, services, data layer). Do not mix concerns in the same file or layer.
- When adding new behavior, prefer creating or extending a service/module instead of putting logic directly in controllers or UI components.

## Stable contracts first
- Before changing public APIs, database schemas, or events, propose a short plan describing the new contract and get approval.
- If a change would break existing callers, suggest a backward-compatible option (feature flags, new endpoints, versioned APIs).

## Small, focused units
- Favor small functions/components with a single clear responsibility; avoid "god files" and huge components.
- If a file becomes large or multi-purpose, propose a split into clearly named modules and ask before doing the full refactor.
