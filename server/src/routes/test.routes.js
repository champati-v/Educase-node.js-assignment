import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/db-test", async (req, res) => {
  try {
    // Simple DB query
    await prisma.profile.findMany();

    res.status(200).json({
      success: true,
      message: "Database connected successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed!",
      error: error.message,
    });
  }
});

export default router;