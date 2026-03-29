import User from "../modules/Users.js";
import { Token } from "../utils/Token.js";

export const register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;

    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password, role });
    const token = Token(newUser._id);

    res.status(201).json({ message: "User created", token });

  } catch (error) {
    next(error); // ✅ next waa in uu jiraa
  }
};

//login

export const login = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "No data sent" });
        }

        let { email, password } = req.body;

        email = email.toLowerCase();

        const existingUser = await User.findOne({ email });

        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        const token = Token(existingUser._id);

        res.json({ token });

    } catch (error) {
        next(error);
    }
};
