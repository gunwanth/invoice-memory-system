import { upsertVendorMemory } from "../memory/vendorMemory.js";
import { updateCorrection } from "../memory/correctionMemory.js";
import { storeResolution } from "../memory/resolutionMemory.js";
import { logAudit } from "../memory/audit.js";

export function learn(invoice: any, corrections: any, approved: boolean) {
  const text = invoice.rawText.toLowerCase();

  if (approved) {
    // --- SERVICE DATE LEARNING ---
    if (text.includes("leistungsdatum")) {
      upsertVendorMemory(
        invoice.vendor,
        "serviceDateLabel",
        "Leistungsdatum",
        0.85
      );
    }

    // --- VAT LOGIC ---
    if (text.includes("mwst") || text.includes("vat")) {
      upsertVendorMemory(
        invoice.vendor,
        "vatIncluded",
        "true",
        0.8
      );
    }

    // --- FREIGHT / SHIPPING ---
    if (text.includes("seefracht") || text.includes("shipping")) {
      upsertVendorMemory(
        invoice.vendor,
        "skuMapping",
        "FREIGHT",
        0.75
      );
    }

    // Generic "approved invoice" signal
    upsertVendorMemory(
      invoice.vendor,
      "lastApproved",
      new Date().toISOString(),
      0.6
    );
  }

  // Correction-based learning (optional)
  if (corrections?.pattern) {
    updateCorrection(
      corrections.pattern,
      corrections.fix || "",
      approved ? 0.1 : -0.2
    );
  }

  storeResolution(invoice.id, approved);

  logAudit(
    invoice.id,
    "learn",
    approved
      ? "Invoice approved — memory updated"
      : "Invoice rejected — confidence reduced"
  );
}