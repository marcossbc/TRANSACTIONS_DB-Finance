import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary
} from "../controllers/TransactionControlles.js";
import { protect } from "../middleware/Auth.js";

const router = express.Router();

router.post("/tran", protect, createTransaction);
router.get("/",  protect, getTransactions);
router.get("/tran/:id", protect, getTransaction);
router.put("/tran/:id", protect, updateTransaction);
router.delete("/tran/:id", protect, deleteTransaction);
router.get("/summary", protect, getMonthlySummary);

export default router;