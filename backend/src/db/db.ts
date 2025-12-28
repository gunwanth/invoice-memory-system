import Database from "better-sqlite3";

export const db = new Database("memory.db");

/**
 * Database schema embedded directly to avoid runtime FS issues
 */
const schema = `
CREATE TABLE IF NOT EXISTS vendor_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vendor TEXT,
  key TEXT,
  value TEXT,
  confidence REAL,
  usageCount INTEGER,
  lastUpdated TEXT
);

CREATE TABLE IF NOT EXISTS correction_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pattern TEXT,
  correction TEXT,
  confidence REAL,
  timesApplied INTEGER,
  lastSeen TEXT
);

CREATE TABLE IF NOT EXISTS resolution_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoiceId TEXT,
  resolution TEXT,
  approved INTEGER,
  timestamp TEXT
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoiceId TEXT,
  step TEXT,
  timestamp TEXT,
  details TEXT
);
`;

db.exec(schema);