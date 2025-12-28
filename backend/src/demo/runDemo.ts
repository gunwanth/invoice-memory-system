import { invoices } from "./invoices.js";
import { corrections } from "./humanCorrections.js";
import { recall } from "../engine/recall.js";
import { applyMemory } from "../engine/apply.js";
import { decide } from "../engine/decide.js";
import { learn } from "../engine/learn.js";

for (const invoice of invoices) {
  console.log("\n--- Processing", invoice.id, "---");

  const memory = recall(invoice);
  const applied = applyMemory(invoice, memory);
  const requiresHumanReview = decide(invoice.id, applied.confidence);

  console.log({
    normalizedInvoice: applied.normalizedInvoice,
    proposedCorrections: applied.proposedCorrections,
    requiresHumanReview,
    confidenceScore: applied.confidence
  });

  if (requiresHumanReview && corrections[invoice.id]) {
    console.log("Applying human correction...");
    learn(invoice, corrections[invoice.id], true);
  }
}