// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

// const router = express.Router();

// router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
// router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
// router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

// router.route("/").get(isAuthenticated,getAllPurchasedCourse);

// export default router;



import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  verifyPayment,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Razorpay: Create checkout session
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);


// Get course detail along with purchase status
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// Get all purchased courses (admin or user)
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

router.route("/payment/verify").post(isAuthenticated, verifyPayment);


export default router;





// for payU

// import express from "express";
// import {
//   createCheckoutSession,
//   handlePayuWebhook,
//   getCourseDetailWithPurchaseStatus,
//   getAllPurchasedCourse,
// } from "../controllers/purchaseCourse.controller.js";
// import { isAuthenticated } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // PayU webhook uses urlencoded format
// router.post("/webhook", express.urlencoded({ extended: true }), handlePayuWebhook);

// router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);
// router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);
// router.get("/", isAuthenticated, getAllPurchasedCourse);

// export default router;
