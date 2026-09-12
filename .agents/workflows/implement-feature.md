---
description: 
---

# ARTHIX Feature Implementation Workflow

Use this workflow when implementing a new ARTHIX feature or making a significant feature change.

## Step 1 — Understand

- Read the user's request carefully.
- Identify the intended user outcome.
- Inspect the relevant existing code before making changes.
- Identify affected frontend, backend, database, API, AI/ML, and configuration components.

## Step 2 — Analyze

Determine:
- Existing implementation that can be reused
- Files that need modification
- New files that are genuinely necessary
- API dependencies
- Database dependencies
- Authentication and authorization implications
- Privacy and security implications
- Possible edge cases

Do not rewrite working components unnecessarily.

## Step 3 — Plan

Before coding, provide a concise implementation plan containing:

1. What will change
2. Which files will change
3. Why each change is required
4. Any database/API changes
5. Any important risks or trade-offs

For straightforward changes, keep the plan brief.

## Step 4 — Implement

Implement the feature incrementally.

Follow:
- ARTHIX Project Constitution
- existing project architecture
- existing coding conventions
- existing component patterns
- existing API conventions

Prefer the smallest maintainable implementation.

Do not introduce unnecessary dependencies.

Do not create mock functionality unless explicitly requested.

If an external integration is unavailable, clearly distinguish mocked/demo behavior from real functionality.

## Step 5 — Verify

After implementation:

- Inspect the changed files.
- Run relevant tests.
- Run linting where available.
- Run type checking where available.
- Run the production/build check where available.
- Verify affected API endpoints.
- Verify database changes.
- Check authentication and authorization.
- Check important error states and edge cases.

## Step 6 — Fix

If verification reveals errors:

- Identify the root cause.
- Fix the actual cause rather than hiding the symptom.
- Re-run the relevant verification.

Do not stop after the first successful-looking result.

## Step 7 — Final Report

Finish with:

### Implemented
- List the functionality added or changed.

### Files Changed
- List important files.

### Verification
- Tests:
- Type check:
- Lint:
- Build:
- API/integration verification:

Only report checks that were actually performed.

### Remaining Risks
Mention any known limitations, assumptions, or unverified areas.