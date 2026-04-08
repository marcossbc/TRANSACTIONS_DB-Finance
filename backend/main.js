import mongoose from 'mongoose';
import dotenv from 'dotenv';


import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { handle } from './middleware/handle.js';
import { notFound } from './middleware/notFound.js';
import usersRoutes from "./routes/Users.js"
import transactionRoutes from "./routes/transaction.js"
import authRoutes from "./routes/Auth.js"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { limiter } from './middleware/ratelimiter.js';
const port =process.env.PORT || 3000;
const app = express();
app.use(cors(
  {
     origin: ["http://localhost:5173", "https://dugsiiye.com", "https://localhost:5173"]
  }
));
app.use(limiter)
app.use(logger)
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}



app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api/users",usersRoutes )
app.use("/api/transactions", transactionRoutes)
// app.use("/api/upload", userUploadRoutes)
app.use("/api/auth", authRoutes)

app.use("/api/health", (req, res) => {
  res.status(200).json({ status: "success", message: "API is healthy 😊" });
})

//server production

if (process.env.NODE_ENV === "production") {

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Serve the frontend app

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    })
}

app.use(notFound)
app.use(handle);


//connect to database
mongoose.connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)

// console.log("Mongo URI:", process.env.MONGO_URI_DEV)
// console.log("Mongo URI PRO:", process.env.MONGO_URI_PRO)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Error:", err));


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})