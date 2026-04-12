import User from "../modules/Users.js";
import { Token } from "../utils/Token.js";

//
// ===================== REGISTER =====================
//
export const register = async (req, res, next) => {
  try {
    let { name, email, password} = req.body;

    email = email.toLowerCase();

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const newUser = await User.create({
      name,
      email,
      password
    
    });

    // generate token
    const token = Token(newUser._id);

    // response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    next(error);
  }
};

//
// ===================== LOGIN =====================
//
// export const login = async (req, res, next) => {
//   try {
//     let { email, password } = req.body;

//     email = email.toLowerCase();

//     // find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // check password
//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // generate token
//     const token = Token(user._id);

//     // response
//     res.json({
//   user: {
//     id: existingUser._id,
//     name: existingUser.name,
//     email: existingUser.email,
//     role: existingUser.role
//   },
//   token
// });

//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = Token(user._id);

    // ✅ FIXED RESPONSE
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
       
      },
      token
    });

  } catch (error) {
    next(error);
  }
};