
import { getVendorMemory } from "../memory/vendorMemory.js";
import { getCorrectionMemory } from "../memory/correctionMemory.js";
import { logAudit } from "../memory/audit.js";

export function recall(invoice: any) {
  const vendorMemory = getVendorMemory(invoice.vendor);
  const correctionMemory = getCorrectionMemory();
  logAudit(invoice.id, "recall", "Loaded vendor and correction memory");
  return { vendorMemory, correctionMemory };
}
