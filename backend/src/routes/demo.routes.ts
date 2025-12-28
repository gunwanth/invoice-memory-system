import { Router, Request, Response } from "express";
import { exec } from "child_process";

const router = Router();

router.post("/run", (_req: Request, res: Response) => {
  exec("npm run demo", (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.send(stdout);
  });
});

export default router;
