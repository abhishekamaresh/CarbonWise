import express from "express";
import {
  saveCarbonFootprint,
  getCarbonFootprintData,
  getEmissionBreakdown,
  getDailyEmissionTrends,
  getQuickStats,
} from "../controller/carbonFootprintcontroller";

const router = express.Router();

router.post("/save", saveCarbonFootprint);
router.post("/factor", getCarbonFootprintData);
router.get("/carbon-footprint/:userId", getCarbonFootprintData);
router.get("/emission-breakdown/:userId", getEmissionBreakdown);
router.get("/emission-trends/:userId", getDailyEmissionTrends);
router.get("/quick-stats/:userId", getQuickStats);

export default router;
