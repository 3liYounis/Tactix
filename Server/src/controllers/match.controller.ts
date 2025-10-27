import { Request, Response } from "express";

// HOST
export const createMatch = (req: Request, res: Response) => {
  const { hostId, matchSettings } = req.body;

  res.json({ message: "Match created", hostId, matchSettings });
};

export const cancelMatch = (req: Request, res: Response) => {
  const { matchId } = req.body;

  res.json({ message: `Match ${matchId} canceled` });
};

export const startMatch = (req: Request, res: Response) => {
  const { matchId } = req.body;

  res.json({ message: `Match ${matchId} started` });
};

export const endMatch = (req: Request, res: Response) => {
  const { matchId } = req.body;

  res.json({ message: `Match ${matchId} ended` });
};

// PLAYER
export const joinMatch = (req: Request, res: Response) => {
  const { matchId, playerId } = req.body;

  res.json({ message: `Player ${playerId} joined match ${matchId}` });
};

export const leaveMatch = (req: Request, res: Response) => {
  const { matchId, playerId } = req.body;

  res.json({ message: `Player ${playerId} left match ${matchId}` });
};

// SURVEY
export const submitSurvey = (req: Request, res: Response) => {
  const { matchId, playerId, answers } = req.body;

  res.json({ message: `Survey submitted for match ${matchId} by player ${playerId}` });
};
