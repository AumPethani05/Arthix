---
description: 
---

# ARTHIX Deployment Verification Workflow

Before deployment, verify the application is configured correctly for the target environment.

## Configuration

Check:
- environment variables
- API URLs
- frontend URLs
- backend URLs
- database configuration
- authentication configuration
- CORS configuration

Never expose secrets.

## Build

Run the production build.

Check for:
- compilation errors
- type errors
- missing dependencies
- environment-variable failures

## Backend

Verify:
- API starts correctly
- database connection works
- authentication works
- required routes respond correctly
- errors are handled properly

## Frontend

Verify:
- application loads
- routes work
- API requests use the correct environment
- authentication flow works
- no critical console errors exist

## Production Safety

Check:
- debug mode
- secret exposure
- insecure configuration
- incorrect localhost references
- development-only dependencies/configuration

## Final Report

Return:

Build:
Backend:
Database:
Frontend:
Authentication:
Configuration:
Security:
Deployment readiness:

Clearly list blockers and unverified items.