---
description: 
---

# ARTHIX Code Review Workflow

Review the current implementation without unnecessarily modifying it.

Check the following:

## Correctness
- Does the implementation satisfy the requested behavior?
- Are edge cases handled?
- Are errors handled correctly?

## Architecture
- Does it follow the existing ARTHIX architecture?
- Is code unnecessarily duplicated?
- Are responsibilities properly separated?
- Are unnecessary abstractions introduced?

## API
- Are endpoints consistent?
- Are request and response structures correct?
- Are authentication and authorization enforced?

## Database
- Are queries correct?
- Are transactions required?
- Are indexes or constraints needed?
- Could the change cause data corruption or duplication?

## Security
Check for:
- authentication issues
- authorization bypass
- injection
- XSS
- insecure input handling
- exposed secrets
- sensitive data leakage
- insecure error messages

## Privacy
Check that:
- financial information is not unnecessarily exposed
- sensitive information is not logged
- consent boundaries are respected
- unnecessary personal data is not collected

## AI/ML Integrity
Check that:
- model outputs are not fabricated
- financial facts come from verified application data
- AI does not bypass Vivek/Nyay controls
- explanations correspond to actual decision logic

## Performance
Check for:
- unnecessary database queries
- inefficient loops
- excessive API requests
- unnecessary frontend rendering
- large or unnecessary dependencies

## Maintainability
Check:
- naming
- readability
- duplication
- error handling
- documentation where genuinely needed

## Output

Return:

### Critical Issues
### High Priority Issues
### Medium Priority Issues
### Low Priority / Suggestions
### Overall Assessment

Do not claim that something is secure, tested, or production-ready unless it was actually verified.