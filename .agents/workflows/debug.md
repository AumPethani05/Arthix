---
description: 
---

# ARTHIX Debugging Workflow

Use this workflow when ARTHIX has a bug, error, unexpected behavior, broken feature, failed API, database issue, build failure, or runtime problem.

## 1. Reproduce

First understand and reproduce the problem where possible.

Collect:
- exact error
- affected feature
- affected route/component
- relevant logs
- network/API errors
- database errors
- reproduction steps

Do not immediately modify code.

## 2. Trace

Trace the complete failing path:

User Action
→ Frontend
→ API
→ Backend
→ Database / AI / External Service
→ Response
→ Frontend

Identify where the expected behavior diverges from the actual behavior.

## 3. Root Cause

Determine the actual root cause.

Distinguish between:
- root cause
- secondary symptoms
- unrelated warnings

Do not make speculative fixes without evidence when the issue can be investigated further.

## 4. Fix

Implement the smallest reliable fix.

Preserve existing functionality.

Avoid unrelated refactoring.

## 5. Regression Check

After fixing:

- Reproduce the original issue again.
- Run relevant tests.
- Run build/type checks where applicable.
- Check related functionality.
- Check API/database behavior where relevant.

## 6. Report

Provide:

### Root Cause
What actually caused the problem.

### Fix
What was changed.

### Files Changed
Important affected files.

### Verification
What was actually tested.

### Remaining Risk
Anything that could not be verified.