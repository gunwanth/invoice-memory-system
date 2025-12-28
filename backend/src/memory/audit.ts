
import { db } from "../db/db.js";
import { now } from "../utils/time.js";

export function logAudit(invoiceId: string, step: string, details: string) {
  db.prepare(
    "INSERT INTO audit_log (invoiceId, step, timestamp, details) VALUES (?, ?, ?, ?)"
  ).run(invoiceId, step, now(), details);
}
