---
description: 
---

# ARTHIX Pre-Submission Verification Workflow

Perform a final hackathon/demo readiness check.

## Application

Check:
- major routes
- navigation
- primary user journeys
- empty states
- loading states
- error states
- responsive behavior where practical

## Backend

Check:
- API availability
- authentication
- authorization
- validation
- error handling
- database connectivity

## Database

Check:
- migrations
- schema consistency
- required seed/demo data
- duplicate or destructive operations
- important queries

## AI/ML

Check:
- model/inference availability
- deterministic rules
- recommendation logic
- explanation/reason codes
- fraud/anomaly flow
- stress/wellness flow
- AI grounding

Never claim model metrics unless actually verified.

## Security

Check:
- secrets
- environment variables
- exposed credentials
- authentication
- authorization
- input validation
- sensitive financial data exposure

## Build

Run where available:
- tests
- lint
- type checking
- production build

## Demo Readiness

Check that the main ARTHIX journey can be demonstrated from beginning to end.

Clearly identify:
- working features
- mocked features
- partially implemented features
- known limitations

## Final Verdict

Return:

READY
or
NOT READY

If NOT READY, list blockers first.

Do not hide failures or downgrade serious issues to warnings merely to achieve READY status.