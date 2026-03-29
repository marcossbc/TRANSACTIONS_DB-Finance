// import rateLimit  from "express-rate-limit";
import rateLimit from "express-rate-limit";
export const limiter = rateLimit({

  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 3,// limit each IP to 100 requests per windowMs
  message: "too many request from this IP, please try again after 15 minutes"
})