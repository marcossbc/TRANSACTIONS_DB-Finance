import Transaction from "../modules/Transaction.js";

// CREATE TRANSACTION
export const createTransaction = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { amount, type, category, title, date } = req.body;

        const transaction = await Transaction.create({
            user: "699964d2947932791259b048", // ✅ fixed user
            amount,
            type,
            category,
            title,
            date
        });

        res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


// GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction
            .find({ user: "699964d2947932791259b048" }) // ✅ fixed
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET SINGLE TRANSACTION
export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: "699964d2947932791259b048" // ✅ fixed
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction lama helin"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// MONTHLY SUMMARY
export const getMonthlySummary = async (req, res) => {
    try {
        const summary = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId("699964d2947932791259b048") // ✅ muhiim
                }
            },
            {
                $group: {
                    _id: { category: "$category", type: "$type" },
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: summary
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            {
                _id: req.params.id,
                user: "699964d2947932791259b048" // ✅ fixed
            },
            req.body,
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: "699964d2947932791259b048" // ✅ fixed
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};