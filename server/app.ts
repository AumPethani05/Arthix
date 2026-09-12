import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "../lib/db";
import { getArthBodhProfile, refreshArthBodhProfile } from "../lib/services/arthbodh";
import { evaluateJeevanChakraCandidates } from "../lib/services/jeevanchakra";
import { evaluateVivekDecision } from "../lib/services/vivek";
import { getSaharaWellness, applySaharaRelief } from "../lib/services/sahara";
import { getKavachConsents, toggleKavachConsent, getKavachAlerts, confirmKavachFraudEvent } from "../lib/services/kavach";
import { processBhashaSahayakTurn } from "../lib/services/bhashasahayak";
import { getNyayAuditTrail, logNyayEvent } from "../lib/services/nyay";

export const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

// 1. POST /api/v1/auth/login
router.post("/auth/login", (req: Request, res: Response) => {
  const { personaId, persona } = req.body;
  const targetPersona = personaId || persona || "rahul";
  const profile = getArthBodhProfile(targetPersona);

  if (!profile) {
    return res.status(404).json({ error: "Persona not found" });
  }

  const token = `jwt-session-${profile.personaKey}-${Date.now()}`;
  logNyayEvent(profile.userId, "USER", "LOGIN", "RULE_AUTH_FIDUCIARY_V1", { persona: targetPersona });

  return res.json({
    token,
    user: {
      id: profile.userId,
      name: profile.name,
      personaKey: profile.personaKey,
      locale: profile.locale,
    },
  });
});

// 2. GET /api/v1/me
router.get("/me", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const profile = getArthBodhProfile(persona);
  if (!profile) return res.status(404).json({ error: "User not found" });

  return res.json({
    user: {
      id: profile.userId,
      name: profile.name,
      personaKey: profile.personaKey,
      locale: profile.locale,
    },
    locale: profile.locale,
  });
});

// 3. GET /api/v1/me/profile
router.get("/me/profile", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const profile = getArthBodhProfile(persona);
  if (!profile) return res.status(404).json({ error: "Profile not found" });

  return res.json(profile);
});

// 4. GET /api/v1/me/transactions
router.get("/me/transactions", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const profile = getArthBodhProfile(persona);
  if (!profile) return res.status(404).json({ error: "User not found" });

  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(profile.userId);

  return res.json({ transactions: txs });
});

// 5. POST /api/v1/intelligence/refresh
router.post("/intelligence/refresh", (req: Request, res: Response) => {
  const persona = req.body.persona || "rahul";
  const profile = getArthBodhProfile(persona);
  if (!profile) return res.status(404).json({ error: "Profile not found" });

  const updatedProfile = refreshArthBodhProfile(profile.userId);
  const decision = evaluateVivekDecision(profile.userId);

  logNyayEvent(profile.userId, "SYSTEM", "REFRESH_INTELLIGENCE", "RULE_FEATURE_ENGINEERING_V1", {
    newSurplus: updatedProfile.surplus,
    newAction: decision.action,
  });

  return res.json({ profile: updatedProfile, decision });
});

// 6. GET /api/v1/recommendations
router.get("/recommendations", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const profile = getArthBodhProfile(persona);
  if (!profile) return res.status(404).json({ error: "Profile not found" });

  const decision = evaluateVivekDecision(profile.userId);
  const candidates = evaluateJeevanChakraCandidates(profile);

  return res.json({
    action: decision.action,
    headline: decision.headline,
    subline: decision.subline,
    confidence: decision.confidence,
    ruleCode: decision.ruleCode,
    citation: decision.citation,
    metrics: decision.metrics,
    explanationEn: decision.explanationEn,
    explanationHi: decision.explanationHi,
    explanationGu: decision.explanationGu,
    items: candidates,
    reasons: [decision.ruleCode],
  });
});

// 7. GET /api/v1/recommendations/:id/why
router.get("/recommendations/:id/why", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const audit = getNyayAuditTrail(persona);
  return res.json({ id: String(req.params.id), auditRecord: audit });
});

// 8. POST /api/v1/recommendations/:id/feedback
router.post("/recommendations/:id/feedback", (req: Request, res: Response) => {
  const { persona, choice } = req.body;
  const profile = getArthBodhProfile(persona || "rahul");
  if (profile) {
    logNyayEvent(profile.userId, "CUSTOMER", "RECOMMENDATION_FEEDBACK", "RULE_FEEDBACK_AUDIT_V1", {
      recommendationId: String(req.params.id),
      choice,
    });
  }
  return res.json({ status: "OK", choice });
});

// 9. POST /api/v1/chat
router.post("/chat", (req: Request, res: Response) => {
  const { persona, text, locale, sessionId } = req.body;
  const result = processBhashaSahayakTurn({
    userIdOrPersona: persona || "rahul",
    userText: text || "",
    locale: locale || "en",
    sessionId,
  });

  return res.json({
    reply: result.replyText,
    replyText: result.replyText,
    locale: result.locale,
    cards: [],
    groundingToolsUsed: result.groundingToolsUsed,
  });
});

// 10. GET /api/v1/wellness & POST /api/v1/wellness/relief
router.get("/wellness", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "kamala";
  const data = getSaharaWellness(persona);
  return res.json(data);
});

router.post("/wellness/relief", (req: Request, res: Response) => {
  const { persona, actionId } = req.body;
  const data = applySaharaRelief(persona || "kamala", actionId || "action-moratorium-60d");
  return res.json(data);
});

// 11. GET /api/v1/alerts
router.get("/alerts", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "kamala";
  const alerts = getKavachAlerts(persona);
  return res.json({ alerts });
});

// 12. POST /api/v1/fraud/:eventId/confirm
router.post("/fraud/:eventId/confirm", (req: Request, res: Response) => {
  const { persona, recognized } = req.body;
  const eventId = String(req.params.eventId);
  const result = confirmKavachFraudEvent(persona || "kamala", eventId, !!recognized);
  return res.json(result);
});

// 13. GET & PUT /api/v1/consent
router.get("/consent", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const consents = getKavachConsents(persona);
  return res.json({ consents });
});

router.put("/consent", (req: Request, res: Response) => {
  const { persona, consentId, status } = req.body;
  const consents = toggleKavachConsent(persona || "rahul", consentId, status);
  return res.json({ consents });
});

// 14. GET /api/v1/audit/me
router.get("/audit/me", (req: Request, res: Response) => {
  const persona = (req.query.persona as string) || "rahul";
  const audit = getNyayAuditTrail(persona);
  return res.json({ auditRecord: audit, events: [audit] });
});

app.use("/api/v1", router);
