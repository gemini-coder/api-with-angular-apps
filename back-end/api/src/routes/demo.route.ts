import { NextFunction, Request, Response } from "express";

const express = require('express');
const router = express();
router.get('', async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Request Received" });
  next();
});
export const demoRoute = router;