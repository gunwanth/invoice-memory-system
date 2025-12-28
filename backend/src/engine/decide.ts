
import { logAudit } from "../memory/audit.js";

export function decide(invoiceId: string, confidence: number) {
  const requiresHumanReview = confidence < 0.75;
  logAudit(invoiceId, "decide", requiresHumanReview ? "Escalated" : "Auto accepted");
  return requiresHumanReview;
}
