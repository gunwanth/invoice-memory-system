import { Router, Request, Response } from "express";
import { db } from "../db/db.js";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const vendor = db.prepare("SELECT * FROM vendor_memory").all();
  const corrections = db.prepare("SELECT * FROM correction_memory").all();
  res.json({ vendor, corrections });
});

export default router;