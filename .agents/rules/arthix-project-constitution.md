---
trigger: always_on
---

# ARTHIX Project Constitution

## 1. Project Identity

ARTHIX is an AI-powered hyper-personalized banking intelligence layer for Bharat. It is not a new bank and not merely a chatbot.

Core principle:
"The right product. The right moment. Or no product at all."

ARTHIX prioritizes financial wellbeing first and products second.

The system uses consented financial and behavioral context to:
- understand the customer's financial situation
- personalize banking journeys
- assist users in Hindi, Gujarati, and English
- detect financial stress
- detect unusual/fraudulent activity
- recommend suitable products only when appropriate
- suppress harmful or unsuitable credit recommendations
- provide explanations, consent controls, and auditability

Do not change this core product philosophy without explicit instruction.

---

## 2. Core Architecture

The MVP architecture is:

React + Vite
        ↓
Node.js + Express
        ↓
SQLite / PostgreSQL
        ↓
Rules + scikit-learn + LLM API
        ↓
ARTHIX decision and assistance layer

Keep the architecture simple and hackathon-implementable.

Do not introduce microservices, Kubernetes, event buses, complex distributed infrastructure, or other production-scale architecture unless explicitly requested.

Production architecture may be discussed separately from the MVP.

---

## 3. Core Product Modules

ARTHIX consists of:

1. ArthBodh — Customer Intelligence
   - Builds a financial profile from consented transaction data.
   - Relevant features include income cadence, spending mix, EMI load, savings residual, and behavioral signals.

2. JeevanChakra — Hyper-personalization
   - Converts financial profile and life-stage signals into need hypotheses.
   - Determines product relevance, eligibility, and suitability.

3. Vivek Engine — Responsible Recommendation
   - This is the decision spine of ARTHIX.
   - It determines:
     - Recommend
     - Assist First
     - Suppress
     - Verify where applicable
   - Recommendation decisions must consider need, eligibility, suitability, stress, and leverage.

4. BhashaSahayak — Conversational Bharat Banking
   - Supports Hindi, Gujarati, and English text interactions in the MVP.
   - Uses intent recognition and constrained tool calling.
   - The assistant must remain grounded in actual system data.

5. Sahara — Financial Wellness
   - Detects financial stress.
   - Provides assistance instead of aggressive credit recommendations when the customer is vulnerable.

6. Kavach — Fraud and Anomaly Detection
   - Uses rules and Isolation Forest for unusual transaction detection.
   - MVP behavior is customer verification rather than silent automatic account freezing.

7. Nyay Layer — Responsible AI
   - Enforces consent, reason codes, risk/stress checks, fairness considerations, explainability, customer controls, and auditability.

Do not remove or redefine these modules without explicit instruction.

---

## 4. Decision Integrity

Vivek is deterministic decision intelligence, not a neural-network decision maker.

The system must preserve the decision contract:

Profile → Need / Eligibility / Suitability → Nyay Guardrails → Vivek Decision → Reasons → Customer Action

Every recommendation must have an explainable reason.

A product must not be shown simply because an AI model generated a high score.

The system must be able to legitimately return no recommendation.

An empty recommendation state is a valid product state, not an error.

---

## 5. Responsible Recommendation Rules

ARTHIX must never optimize blindly for product sales.

Before recommending a product, consider:

- customer need
- eligibility
- suitability
- financial stress
- leverage / repayment burden
- consent
- relevant financial context

When a customer is financially stressed:

- prioritize assistance
- suppress inappropriate new-credit recommendations
- provide practical next steps
- allow human escalation where applicable

Do not create countdowns, artificial urgency, manipulative nudges, or "last chance" credit messaging.

Never invent financial data, bureau scores, balances, eligibility, transaction history, or recommendation reasons.

---

## 6. Conversational AI Rules

BhashaSahayak is a conversational interface to ARTHIX intelligence, not an independent source of financial truth.

The LLM may:
- translate stored reasons
- explain verified information
- assist with supported banking journeys
- generate natural-language responses around grounded data

The LLM must not:
- invent balances
- invent transactions
- invent financial scores
- invent reason codes
- invent eligibility
- fabricate banking actions
- claim an external banking action occurred when it did not

Financial values and decision facts must come from application tools, APIs, database records, or deterministic logic.

For supported languages, preserve the user's selected language:
- Hindi
- Gujarati
- English

---

## 7. Fraud Detection Rules

Kavach uses rules plus Isolation Forest for anomaly detection.

Potential signals include:
- unusual amount
- new payee
- unusual hour
- transaction velocity
- deviation from historical behavior

The MVP should normally ask the customer to verify an unusual transaction.

Do not automatically freeze an account unless explicitly implemented and requested.

Customer confirmation must be recorded where applicable.

---

## 8. Data and Database Rules

Primary MVP entities include:

users
accounts
transactions
financial_profiles
financial_signals
products
recommendations
recommendation_reasons
chat_sessions
chat_messages
alerts
fraud_events
stress_indicators
consent_records
audit_logs

Use the existing database architecture and naming conventions.

Do not create duplicate entities when an existing entity can represent the required information.

Prefer migrations and controlled schema changes over destructive database modifications.

Never delete or reset existing data/schema without explicit instruction.

---

## 9. Privacy and Data Minimization

Treat financial information as sensitive.

MVP rules:
- use masked account numbers
- never store full PAN or Aadhaar
- do not expose credentials
- avoid unnecessary raw financial data
- minimize retained information
- require purpose-level consent for personalization-related processing
- allow personalization to be paused or withdrawn where implemented

Purpose limitation matters.

For example:

Transaction analysis ≠ sharing with insurers ≠ model improvement.

These purposes must not be silently treated as identical.

---

## 10. Security Rules

Never hardcode:
- API keys
- passwords
- JWT secrets
- database credentials
- LLM credentials
- private tokens

Use environment variables for secrets.

Never commit `.env` files or credentials.

Validate and sanitize user-controlled input.

Protect authenticated API routes.

Respect authorization boundaries so users can access only permitted data.

Do not expose sensitive financial information through frontend logs, URLs, errors, or debugging output.

Use secure authentication and authorization patterns appropriate for the MVP.

---

## 11. API Architecture

The API base path is:

/api/v1

Preserve consistent REST conventions.

Important existing routes include:

POST /auth/login
GET /me
GET /me/profile
GET /me/transactions
POST /intelligence/refresh
GET /recommendations
GET /recommendations/:id/why
POST /recommendations/:id/feedback
POST /chat
GET /wellness
GET /alerts
POST /fraud/:eventId/confirm
GET /consent
PUT /consent
GET /audit/me

Do not rename or break existing APIs unnecessarily.

When changing an API:
- inspect existing consumers
- update frontend/backend integration
- maintain consistent request/response structures
- test the affected flow

---

## 12. Frontend and UX Principles

ARTHIX follows a literacy-first and trust-first UX.

Prefer:
- clear language
- large readable text
- one primary action
- persistent language selection
- simple navigation
- transparent explanations
- visible consent controls
- clear financial amounts
- meaningful empty states

Avoid:
- unnecessary complexity
- deep navigation
- jargon
- aggressive sales UI
- misleading visual hierarchy
- dark patterns

The "Why this?" explanation is a first-class experience.

---

## 13. Coding Rules

Before modifying code:

1. Inspect the existing implementation.
2. Understand the current architecture.
3. Identify dependencies and affected files.
4. Reuse existing components, utilities, services, and APIs where appropriate.
5. Avoid unnecessary rewrites.
6. Implement the smallest maintainable change.

Do not introduce a new library when existing project functionality can solve the problem adequately.

Follow the project's existing:
- naming conventions
- folder structure
- component patterns
- API patterns
- state-management approach
- database conventions

---

## 14. AI/ML Integrity

Current MVP AI/ML may use:
- deterministic rules
- scikit-learn
- Isolation Forest
- K-Means where applicable
- LLM APIs for grounded conversational interaction

Do not claim that an ML model exists, was trained, or achieved a metric unless the implementation actually verifies it.

Keep:
- feature engineering
- model inference
- decision logic
- explanation
- UI presentation

logically separated.

Model output must not bypass Nyay/Vivek policy gates.

---

## 15. MVP Scope Discipline

The current MVP does not require:

- live CBS integration
- live UPI integration
- live CKYC integration
- live bureau integration
- voice banking
- video KYC replacement
- multi-bank aggregation
- rewards gamification
- formal RBI compliance certification
- formal DPDP certification

These may be future/production extensions.

Do not implement them unless explicitly requested.

Mock external banking integrations honestly and clearly.

Never represent mocked functionality as a live banking integration.

---

## 16. Prototype vs Production

Always distinguish between:

MVP / Hackathon implementation
and
Production banking architecture.

The MVP should remain:
- functional
- demonstrable
- explainable
- secure enough for the prototype
- simple enough to maintain

Production recommendations must not accidentally become unnecessary MVP complexity.

---

## 17. Verification Requirement

After implementing a significant change:

1. Check affected files.
2. Run relevant tests.
3. Run build/type checks where applicable.
4. Verify API integration.
5. Check database impact.
6. Check authentication/authorization impact.
7. Check privacy/security implications.
8. Verify the actual user flow.
9. Report what was changed.
10. Report what was actually verified.

Never claim "working", "tested", "secure", or "production-ready" without verification.

---

## 18. Conflict Resolution

When instructions conflict:

1. Preserve ARTHIX's core product principles.
2. Preserve security and privacy.
3. Preserve existing working architecture.
4. Follow explicit user instructions when they do not violate the above.
5. Prefer the smallest safe change.
6. Ask for clarification only when the ambiguity materially affects implementation.

Do not silently make major architectural decisions.