import { Router } from 'express';
import { home, register, login, user } from '../controllers/auth-controller.js';
import {signupSchema, loginSchema } from '../validation/auth-validation.js';
import validate from '../middlewares/validate-middleware.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';


const router = Router();

router.route("/").get(home);

router.route("/register").post(validate(signupSchema), register);

router.route("/login").post(validate(loginSchema), login);

router.route("/user").get(authMiddleware, user);

export default router;
