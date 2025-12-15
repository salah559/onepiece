import express, { type Request, Response, NextFunction } from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}