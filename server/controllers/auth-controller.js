import User from '../models/user-model.js';

//homepage logic

export const home = async (req, res) => {
    try {
        res.status(200).send({ msg: "Hello home" });
    } catch (error) {
        res.status(400).send({ msg: "page not found" })
    }
}

//register logic
export const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already registered with this email, please Login" });
        }

        const newUser = await User.create({
            username,
            email,
            phone,
            password
        });

        res.status(201).json({
            msg: "User registered successfully",
            user: newUser,
            token: await newUser.generateToken(newUser),
            userId: newUser._id.toString(),
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
}


//login logic

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isValid = await userExist.comparePassword(password);

        if (isValid) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(userExist),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ msg: "Invalid credentials" });
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

//user logic

export const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({  userData });
    } catch (error) {
        console.log(`error from user route ${user}`)
    }
}



