import { Request, Response } from "express";
import * as matchService from "../services/match.service";

// HOST
export const createMatch = (req: Request, res: Response) => {
  const { match_info } = req.body;
  const result = matchService.createMatch(match_info);

  res.json({ message: "Match created", ...result });
};

export const cancelMatch = (req: Request, res: Response) => {
  const { gameCode } = req.body;

  const result = matchService.cancelMatch(gameCode);

  res.json({ message: `Match ${gameCode} canceled`, ...result });
};

export const startMatch = (req: Request, res: Response) => {
  const { matchId } = req.body;

  const result = matchService.startMatch(matchId);

  res.json({ message: `Match ${matchId} started`, ...result });
};

export const endMatch = (req: Request, res: Response) => {
  const { matchId } = req.body;

  const result = matchService.endMatch(matchId);

  res.json({ message: `Match ${matchId} ended`, ...result });
};

export const swap = (req: Request, res: Response) => {
  const { playerId1, playerId2, matchId } = req.body;

  const result = matchService.swap(playerId1, playerId2, matchId);

  res.json({ message: `Players Swapped`, ...result });
};

// PLAYER
export const joinMatch = (req: Request, res: Response) => {
  const { gameCode, playerId } = req.body;

  const result = matchService.joinMatch(gameCode, playerId);

  res.json({ message: `Player ${playerId} joined match ${gameCode}`, ...result });
};

export const leaveMatch = (req: Request, res: Response) => {
  const { matchId, playerId } = req.body;

  const result = matchService.leaveMatch(matchId, playerId);

  res.json({ message: `Player ${playerId} left match ${matchId}`, ...result });
};

// SURVEY
export const submitSurvey = (req: Request, res: Response) => {
  const { matchId, playerId, answers } = req.body;

  const result = matchService.submitSurvey(matchId, playerId, answers);

  res.json({ message: `Survey submitted for match ${matchId} by player ${playerId}`, ...result });
};
