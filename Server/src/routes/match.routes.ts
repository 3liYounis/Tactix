import { Router } from "express";
import { createMatch, cancelMatch, startMatch, endMatch,
         joinMatch, leaveMatch, submitSurvey} from "../controllers/match.controller";
const router = Router();

// HOST
router.post("/create", createMatch);
router.delete("/cancel", cancelMatch);
router.post("/start", startMatch);
router.post("/end", endMatch);

// PLAYER
router.post("/join", joinMatch);
router.delete("/leave", leaveMatch);

// SURVEY
router.post("/survey", submitSurvey);

export default router;
