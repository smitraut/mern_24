//BCRYPT AND JWT SWITCH FROM ./models/user-model.js to ./utils/utils.js







// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export async function hashPassword(password) {
//     try {
//         const saltRound = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, saltRound);
//         return hash;
//     } catch (error) {
//         throw error;
//     }
// }

// export async function comparePasswords(inputPassword, hashedPassword) {
//     try {
//         return await bcrypt.compare(inputPassword, hashedPassword);
//     } catch (error) {
//         throw error;
//     }
// }

// export function generateToken(user) {
//     try {
//         return jwt.sign(
//             {
//                 userId: user._id.toString(),
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//             },
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: "30d" }
//         );
//     } catch (error) {
//         throw error;
//     }
// }
