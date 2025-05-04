import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import { contactAdvisor, sendEmail, submitInstructorApplication } from "../utils/sendEmail.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
router.post('/contact', sendEmail);
router.post('/submit-instructor-application', submitInstructorApplication);
router.post('/contact-advisor', contactAdvisor);

export default router;