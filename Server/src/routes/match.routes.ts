import { Router } from "express";

const router = Router();

// HOST
router.post("/create", (req, res) => {
  res.json({ message: "POST /match/create" });
});

router.delete("/cancel", (req, res) => {
  res.json({ message: `DELETE /match/cancel` });
});

router.post("/start", (req, res) => {
  res.json({ message: `POST /match/start` });
});

router.post("/end", (req, res) => {
  res.json({ message: `POST /match/end/` });
});

// PLAYER
router.post("/join", (req, res) => {
  res.json({ message: "POST /match/join" });
});

router.delete("/leave", (req, res) => {
  res.json({ message: "DELETE /match/leave" });
});

// SURVEY
router.post("/survey", (req, res) => {
  res.json({ message: "POST /survey" });
});
export default router;
