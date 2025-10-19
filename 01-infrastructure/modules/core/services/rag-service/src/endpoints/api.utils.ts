import { Request, Response,NextFunction } from 'express';

export const enableCors = (req: Request, res: Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // O específicamente 'app://obsidian.md'
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
}