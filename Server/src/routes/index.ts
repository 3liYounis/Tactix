import { Router } from "express";
import matchRoutes from "./match.routes";

export const router = Router();

router.use("/match", matchRoutes);
