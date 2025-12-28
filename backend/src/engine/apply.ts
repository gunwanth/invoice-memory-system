
import { logAudit } from "../memory/audit.js";

export function applyMemory(invoice: any, memories: any) {
  const normalized: any = {};
  const proposed: string[] = [];
  let confidence = 0;

  for (const m of memories.vendorMemory) {
    if (m.key === "serviceDateLabel" && invoice.rawText.includes(m.value)) {
      normalized.serviceDate = "extracted-from-" + m.value;
      proposed.push(`Mapped service date using ${m.value}`);
      confidence += m.confidence;
    }
  }

  if (invoice.rawText.includes("MwSt")) {
    proposed.push("Detected prices include VAT");
    confidence += 0.3;
  }

  logAudit(invoice.id, "apply", "Applied memory heuristics");
  return { normalizedInvoice: normalized, proposedCorrections: proposed, confidence };
}
