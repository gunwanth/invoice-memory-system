
import { db } from "../db/db.js";
import { now } from "../utils/time.js";

export function storeResolution(invoiceId: string, approved: boolean) {
  db.prepare(
    "INSERT INTO resolution_memory (invoiceId, resolution, approved, timestamp) VALUES (?,?,?,?)"
  ).run(invoiceId, approved ? "approved" : "rejected", approved ? 1 : 0, now());
}
