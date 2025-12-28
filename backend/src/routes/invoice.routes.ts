import { Router, Request, Response } from "express";
import { recall } from "../engine/recall.js";
import { applyMemory } from "../engine/apply.js";
import { decide } from "../engine/decide.js";
import { learn } from "../engine/learn.js";

const router = Router();

/**
 * Process invoice (preview / decision)
 */
router.post("/process", (req: Request, res: Response) => {
  const invoice = req.body;

  const memory = recall(invoice);
  const applied = applyMemory(invoice, memory);
  const requiresHumanReview = decide(invoice.id, applied.confidence);

  res.json({
    normalizedInvoice: applied.normalizedInvoice,
    proposedCorrections: applied.proposedCorrections,
    requiresHumanReview,
    reasoning: "Decision based on memory confidence",
    confidenceScore: applied.confidence,
    memoryUpdates: [],
    auditTrail: []
  });
});

/**
 * CONFIRM / LEARN endpoint (human-approved)
 */
router.post("/confirm", (req: Request, res: Response) => {
  const { invoice, corrections, approved } = req.body;

  learn(invoice, corrections || {}, approved);

  res.json({
    status: "stored",
    message: approved
      ? "Invoice corrections learned successfully"
      : "Invoice marked as rejected",
  });
});

export default router;