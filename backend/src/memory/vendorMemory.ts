import { db } from "../db/db.js";
import { now } from "../utils/time.js";

interface VendorMemoryRow {
  id: number;
  vendor: string;
  key: string;
  value: string;
  confidence: number;
  usageCount: number;
  lastUpdated: string;
}

export function getVendorMemory(vendor: string): VendorMemoryRow[] {
  return db
    .prepare("SELECT * FROM vendor_memory WHERE vendor=?")
    .all(vendor) as VendorMemoryRow[];
}

export function upsertVendorMemory(
  vendor: string,
  key: string,
  value: string,
  confidence: number
) {
  const row = db
    .prepare("SELECT * FROM vendor_memory WHERE vendor=? AND key=?")
    .get(vendor, key) as VendorMemoryRow | undefined;

  if (!row) {
    db.prepare(
      `INSERT INTO vendor_memory
       (vendor, key, value, confidence, usageCount, lastUpdated)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(vendor, key, value, confidence, 1, now());
    return;
  }

  db.prepare(
    `UPDATE vendor_memory
     SET confidence=?, usageCount=usageCount+1, lastUpdated=?
     WHERE id=?`
  ).run(confidence, now(), row.id);
}