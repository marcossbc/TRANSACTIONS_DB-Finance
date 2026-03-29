import express from 'express';
// import { login, register } from '../controllers/AuthController.js';
import { validateZod } from '../middleware/volidateZode.js';
import { protect } from '../middleware/Auth.js';
import { registerSchema } from '../schema/authSchema.js';
import { login, register } from '../controllers/AuthControllers.js';
// import { login, register } from '../controllers/AuthControllers.js';

const router = express.Router();

// ✔️ Important: route `/register`
router.post("/register", validateZod(registerSchema), register);
router.post("/login", login);
router.get('/me', protect, async (req, res) => {
    console.log("req.user", req.user)
    // await new Promise(resolve => setTimeout(resolve, 5000))
    res.json(req.user)
})

export default router;