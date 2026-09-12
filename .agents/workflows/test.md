---
description: 
---

# ARTHIX Testing Workflow

Analyze the requested feature or current implementation and verify it systematically.

## 1. Identify Test Scope

Determine:
- affected frontend components
- API endpoints
- backend services
- database operations
- authentication
- AI/ML logic
- important user journeys

## 2. Test Cases

Cover:

### Happy Path
Normal successful usage.

### Validation
Invalid, missing, malformed, or unexpected input.

### Edge Cases
Boundary values, empty states, duplicate requests, unavailable data, and failure conditions.

### Authorization
Verify users cannot access data or actions they are not permitted to access.

### Error Handling
Verify meaningful failures rather than silent errors.

### Integration
Verify frontend → API → backend → database interactions where applicable.

## 3. Execute

Run the appropriate existing tests.

If tests are missing and adding tests is appropriate, create focused tests.

Do not create meaningless tests simply to increase coverage.

## 4. Fix Failures

For failed tests:
- identify the root cause
- fix the implementation
- re-run the affected tests

## 5. Report

Return:

Tests executed:
Passed:
Failed:
Fixed:
Remaining failures:
Unverified areas:
Overall result: