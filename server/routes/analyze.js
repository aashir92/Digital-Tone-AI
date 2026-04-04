import { Router } from "express";
import { analyzeMessageController } from "../controllers/analyzeController.js";

const router = Router();

router.post("/", analyzeMessageController);

export default router;