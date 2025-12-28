import { db } from "../db/db.js";
import { now } from "../utils/time.js";

interface CorrectionRow {
  id: number;
  pattern: string;
  correction: string;
  confidence: number;
  timesApplied: number;
  lastSeen: string;
}

export function getCorrectionMemory(): CorrectionRow[] {
  return db
    .prepare("SELECT * FROM correction_memory")
    .all() as CorrectionRow[];
}

export function updateCorrection(
  pattern: string,
  correction: string,
  delta: number
) {
  const row = db
    .prepare("SELECT * FROM correction_memory WHERE pattern=?")
    .get(pattern) as CorrectionRow | undefined;

  if (!row) {
    db.prepare(
      `INSERT INTO correction_memory
       (pattern, correction, confidence, timesApplied, lastSeen)
       VALUES (?, ?, ?, ?, ?)`
    ).run(pattern, correction, 0.6, 1, now());
    return;
  }

  const newConfidence = Math.max(0.1, Math.min(0.95, row.confidence + delta));

  db.prepare(
    `UPDATE correction_memory
     SET confidence=?, timesApplied=timesApplied+1, lastSeen=?
     WHERE id=?`
  ).run(newConfidence, now(), row.id);
}