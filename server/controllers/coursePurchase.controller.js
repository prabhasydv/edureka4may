// import Stripe from "stripe";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";
// import { sendEmail } from "../utils/sendEmail.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     // Create a new course purchase record
//     const newPurchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "pending",
//     });

//     // Create a Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: course.courseTitle,
//               images: [course.courseThumbnail],
//             },
//             unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/course-progress/${courseId}`,
//       cancel_url: `${process.env.CLIENT_URL}/course-detail/${courseId}`,
//       metadata: {
//         courseId: courseId,
//         userId: userId,
//       },
//       shipping_address_collection: {
//         allowed_countries: ["IN"], // Optionally restrict allowed countries
//       },
//     });

//     if (!session.url) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Error while creating session" });
//     }

//     // Save the purchase record
//     newPurchase.paymentId = session.id;
//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       url: session.url, // Return the Stripe checkout URL
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const stripeWebhook = async (req, res) => {
//   let event;

//   try {
//     const payloadString = JSON.stringify(req.body, null, 2);
//     const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

//     const header = stripe.webhooks.generateTestHeaderString({
//       payload: payloadString,
//       secret,
//     });

//     event = stripe.webhooks.constructEvent(payloadString, header, secret);
//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   // Handle the checkout session completed event
//   if (event.type === "checkout.session.completed") {
//     console.log("check session complete is called");

//     try {
//       const session = event.data.object;

//       const purchase = await CoursePurchase.findOne({
//         paymentId: session.id,
//       }).populate({ path: "courseId" });

//       if (!purchase) {
//         return res.status(404).json({ message: "Purchase not found" });
//       }

//       if (session.amount_total) {
//         purchase.amount = session.amount_total / 100;
//       }
//       purchase.status = "completed";

//       // Make all lectures visible by setting `isPreviewFree` to true
//       if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//         await Lecture.updateMany(
//           { _id: { $in: purchase.courseId.lectures } },
//           { $set: { isPreviewFree: true } }
//         );
//       }

//       await purchase.save();

//       // Update user's enrolledCourses
//       await User.findByIdAndUpdate(
//         purchase.userId,
//         { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
//         { new: true }
//       );

//       // Update course to add user ID to enrolledStudents
//       await Course.findByIdAndUpdate(
//         purchase.courseId._id,
//         { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
//         { new: true }
//       );


//       // added for geeting
//       // Update user's enrolledCourses
//       const user = await User.findByIdAndUpdate(
//         purchase.userId,
//         { $addToSet: { enrolledCourses: purchase.courseId._id } },
//         { new: true }
//       );

//       // Update course's enrolledStudents
//       await Course.findByIdAndUpdate(
//         purchase.courseId._id,
//         { $addToSet: { enrolledStudents: purchase.userId } },
//         { new: true }
//       );

//       // Send email
//       if (user) {
//         await sendEmail(
//           user.email,
//           "Course Purchase Successful",
//           `<h2>Thank you for your purchase!</h2>
//           <p>You are now enrolled in <strong>${purchase.courseId.courseTitle}</strong>.</p>
//           <p>You can start your course <a href="${process.env.CLIENT_URL}/course-progress/${purchase.courseId._id}">here</a>.</p>`
//         );
//       } else {
//         console.warn("User not found to send email.");
//       }
//     //added

//     } catch (error) {
//       console.error("Error handling event:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
//   res.status(200).send();
// };

// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId)
//       .populate({ path: "creator" })
//       .populate({ path: "lectures" });

//     const purchased = await CoursePurchase.findOne({ userId, courseId });
//     // const purchased = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
//     console.log(purchased);

//     if (!course) {
//       return res.status(404).json({ message: "course not found!" });
//     }

//     return res.status(200).json({
//       course,
//       purchased: !!purchased, // true if purchased, false otherwise
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllPurchasedCourse = async (_, res) => {
//   try {
//     const purchasedCourse = await CoursePurchase.find({
//       status: "completed",
//     }).populate("courseId");
//     if (!purchasedCourse) {
//       return res.status(404).json({
//         purchasedCourse: [],
//       });
//     }
//     return res.status(200).json({
//       purchasedCourse,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//⬆️ old Stripe code


// import Stripe from "stripe";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";
// import { sendEmail } from "../utils/sendEmail.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     // Create a new course purchase record
//     const newPurchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "pending",
//     });

//     // Create a Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: course.courseTitle,
//               images: [course.courseThumbnail],
//             },
//             unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/course-progress/${courseId}`,
//       cancel_url: `${process.env.CLIENT_URL}/course-detail/${courseId}`,
//       metadata: {
//         courseId: courseId,
//         userId: userId,
//       },
//       shipping_address_collection: {
//         allowed_countries: ["IN"], // Optionally restrict allowed countries
//       },
//     });

//     if (!session.url) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Error while creating session" });
//     }

//     // Save the purchase record
//     newPurchase.paymentId = session.id;
//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       url: session.url, // Return the Stripe checkout URL
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const stripeWebhook = async (req, res) => {
//   let event;

//   try {
//     const payloadString = JSON.stringify(req.body, null, 2);
//     const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

//     const header = stripe.webhooks.generateTestHeaderString({
//       payload: payloadString,
//       secret,
//     });

//     event = stripe.webhooks.constructEvent(payloadString, header, secret);
//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   // Handle the checkout session completed event
//   if (event.type === "checkout.session.completed") {
//     console.log("check session complete is called");

//     try {
//       const session = event.data.object;

//       const purchase = await CoursePurchase.findOne({
//         paymentId: session.id,
//       }).populate({ path: "courseId" });

//       if (!purchase) {
//         return res.status(404).json({ message: "Purchase not found" });
//       }

//       if (session.amount_total) {
//         purchase.amount = session.amount_total / 100;
//       }
//       purchase.status = "completed";

//       // Make all lectures visible by setting `isPreviewFree` to true
//       if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//         await Lecture.updateMany(
//           { _id: { $in: purchase.courseId.lectures } },
//           { $set: { isPreviewFree: true } }
//         );
//       }

//       await purchase.save();

//       // Update user's enrolledCourses
//       await User.findByIdAndUpdate(
//         purchase.userId,
//         { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
//         { new: true }
//       );

//       // Update course to add user ID to enrolledStudents
//       await Course.findByIdAndUpdate(
//         purchase.courseId._id,
//         { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
//         { new: true }
//       );


//       // added for geeting
//       // Update user's enrolledCourses
//       const user = await User.findByIdAndUpdate(
//         purchase.userId,
//         { $addToSet: { enrolledCourses: purchase.courseId._id } },
//         { new: true }
//       );

//       // Update course's enrolledStudents
//       await Course.findByIdAndUpdate(
//         purchase.courseId._id,
//         { $addToSet: { enrolledStudents: purchase.userId } },
//         { new: true }
//       );

//       // Send email
//       if (user) {
//         await sendEmail(
//           user.email,
//           "Course Purchase Successful",
//           `<h2>Thank you for your purchase!</h2>
//           <p>You are now enrolled in <strong>${purchase.courseId.courseTitle}</strong>.</p>
//           <p>You can start your course <a href="${process.env.CLIENT_URL}/course-progress/${purchase.courseId._id}">here</a>.</p>`
//         );
//       } else {
//         console.warn("User not found to send email.");
//       }
//     //added

//     } catch (error) {
//       console.error("Error handling event:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
//   res.status(200).send();
// };

// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId)
//       .populate({ path: "creator" })
//       .populate({ path: "lectures" });

//     const purchased = await CoursePurchase.findOne({ userId, courseId });
//     // const purchased = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
//     console.log(purchased);

//     if (!course) {
//       return res.status(404).json({ message: "course not found!" });
//     }

//     return res.status(200).json({
//       course,
//       purchased: !!purchased, // true if purchased, false otherwise
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllPurchasedCourse = async (_, res) => {
//   try {
//     const purchasedCourse = await CoursePurchase.find({
//       status: "completed",
//     }).populate("courseId");
//     if (!purchasedCourse) {
//       return res.status(404).json({
//         purchasedCourse: [],
//       });
//     }
//     return res.status(200).json({
//       purchasedCourse,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


// controllers/payment.controller.js

import Razorpay from "razorpay";
import nodemailer from 'nodemailer'; // Import nodemailer
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ------------------------------
// 1. CREATE CHECKOUT
// ------------------------------
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const courseId = typeof req.body.courseId === "object" ? req.body.courseId.courseId : req.body.courseId;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     const amountUSD = course.coursePrice || course.price;
//     const amountInCents = Math.round(amountUSD * 100);

//     const options = {
//       amount: amountInCents,
//       currency: "USD",
//       receipt: `rcpt_${courseId}_${Date.now()}`.slice(0, 40),
//       payment_capture: 1,
//     };

//     const order = await razorpay.orders.create(options);

//     // DO NOT SAVE PURCHASE YET — wait for webhook
//     return res.status(200).json({
//       success: true,
//       orderId: order.id,
//       amount: amountInCents,
//       currency: "USD",
//       key: process.env.RAZORPAY_KEY_ID,
//       courseTitle: course.courseTitle,
//       thumbnail: course.courseThumbnail,
//     });
//   } catch (error) {
//     console.error("Checkout Error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Inside backend route: purchaseController.js or route handler
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId;
    const selectedOptionName = req.body.selectedOptionName;

    // Logging request details for debugging
    console.log('Request body:', req.body);
    console.log('Received courseId:', courseId);
    console.log('Received selectedOptionName:', selectedOptionName);

    // Validate if selectedOptionName is provided
    if (!selectedOptionName) {
      return res.status(400).json({ message: "Selected option name is required!" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    console.log('Course pricing options:', course.pricingOptions);

    const selectedOption = course.pricingOptions?.find(option => option.optionName === selectedOptionName);
    if (!selectedOption) {
      return res.status(400).json({ message: "Selected pricing option not found!" });
    }

    const amountUSD = selectedOption.price;
    const amountInCents = Math.round(amountUSD * 100);

    // Construct the receipt ID ensuring it is no more than 40 characters
    let receipt = `${courseId}-${selectedOptionName}`;
    if (receipt.length > 40) {
      receipt = receipt.substring(0, 40);  // Truncate to 40 characters
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInCents,
      currency: "USD",
      receipt: receipt,
      payment_capture: 1,
    });

    return res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: amountInCents,
      currency: "USD",
      key: process.env.RAZORPAY_KEY_ID,
      courseTitle: course.courseTitle,
      thumbnail: course.courseThumbnail,
      selectedOptionName: selectedOption.optionName,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({
      message: "Razorpay error",
      error: error.message,
      stack: error.stack,
      razorpayError: error.error, // This may contain detailed Razorpay error
    });
  }
};

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId, selectedOptionName } = req.body;

//     // Validate required fields
//     if (!selectedOptionName || !courseId) {
//       return res.status(400).json({ message: "Course ID and selected option name are required!" });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found!" });
//     }

//     const selectedOption = course.pricingOptions?.find(
//       option => option.optionName === selectedOptionName
//     );

//     if (!selectedOption || typeof selectedOption.price !== "number") {
//       return res.status(400).json({ message: "Selected pricing option not found or invalid price!" });
//     }

//     const amountUSD = selectedOption.price;
//     const amountInCents = Math.round(amountUSD * 100); // Razorpay expects amount in smallest currency unit

//     // Sanitize and truncate receipt
//     let receipt = `${courseId}-${selectedOptionName}`.replace(/[^a-zA-Z0-9]/g, '').substring(0, 40);

//     console.log("Creating Razorpay order with:", {
//       amountInCents,
//       currency: "USD",
//       receipt
//     });

//     // Create Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: amountInCents,
//       currency: "USD",
//       receipt: receipt, // sanitized and truncated receipt
//       payment_capture: 1,
//     });

//     return res.status(200).json({
//       success: true,
//       orderId: razorpayOrder.id,
//       amount: amountInCents,
//       currency: "USD",
//       key: process.env.RAZORPAY_KEY_ID,
//       courseTitle: course.courseTitle,
//       thumbnail: course.courseThumbnail,
//       selectedOptionName: selectedOption.optionName,
//     });

//   } catch (error) {
//     console.error("Checkout Error:", JSON.stringify(error, null, 2));

//     return res.status(500).json({
//       message: "Razorpay error",
//       error: error.message || "Unknown error",
//       raw: error, // full object
//       razorpayError: error.error || null,
//     });
//   }
// };









// ------------------------------
// 2. RAZORPAY WEBHOOK
// ------------------------------
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, courseId } = req.body;
//     const userId = req.id;

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const payment = await razorpay.payments.fetch(razorpay_payment_id);

//     if (payment.status === 'captured') {
//       // Get user email and course name from database
//       const user = await User.findById(userId);  // make sure you have User model
//       const course = await Course.findById(courseId); // make sure you have Course model

//       // Save the purchase
//       await CoursePurchase.create({
//         courseId,
//         userId,
//         amount: 0,
//         status: "completed",
//         paymentId: razorpay_payment_id,
//       });

//       // Setup nodemailer transporter
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: process.env.SMTP_EMAIL, // your email
//           pass: process.env.SMTP_PASSWORD, // your email password or app password
//         },
//       });

//       // Prepare email
//       const mailOptions = {
//         from: process.env.SMTP_EMAIL,
//         to: process.env.ADMIN_EMAIL, // your admin email
//         subject: 'New Course Purchase',
//         html: `
//           <h3>New Course Purchase</h3>
//           <p><strong>User Email:</strong> ${user.email}</p>
//           <p><strong>Course Name:</strong> ${course.courseTitle}</p>
//         `,
//       };

//       // Send email
//       await transporter.sendMail(mailOptions);

//       res.status(200).json({ message: "Payment verified and email sent successfully!" });
//     } else {
//       res.status(400).json({ message: "Payment verification failed!" });
//     }
//   } catch (error) {
//     console.error("Payment Verify Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, courseId } = req.body;
//     const userId = req.id;

//     // Validate required fields
//     if (!razorpay_order_id || !razorpay_payment_id || !courseId || !userId) {
//       return res.status(400).json({ message: "Missing required parameters!" });
//     }

//     // Create Razorpay instance with credentials
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     // Fetch payment details using Razorpay API
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
    
//     // Check if payment was successful
//     if (payment.status === 'captured') {
//       // Get user and course details from the database
//       const user = await User.findById(userId);
//       const course = await Course.findById(courseId);

//       if (!user || !course) {
//         return res.status(404).json({ message: "User or Course not found!" });
//       }

//       // Save the purchase in the CoursePurchase model
//       await CoursePurchase.create({
//         courseId,
//         userId,
//         amount: payment.amount / 100,  // Convert amount from cents to USD
//         status: "completed",
//         paymentId: razorpay_payment_id,
//       });

//       // Setup nodemailer transporter for email sending
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: process.env.SMTP_EMAIL, // your email
//           pass: process.env.SMTP_PASSWORD, // your email password or app password
//         },
//       });

//       // Prepare email content
//       const mailOptions = {
//         from: process.env.SMTP_EMAIL,
//         to: process.env.ADMIN_EMAIL,  // admin email
//         subject: 'New Course Purchase',
//         html: `
//           <h3>New Course Purchase</h3>
//           <p><strong>User Email:</strong> ${user.email}</p>
//           <p><strong>Course Name:</strong> ${course.courseTitle}</p>
//         `,
//       };

//       // Send email notification
//       await transporter.sendMail(mailOptions);

//       return res.status(200).json({ message: "Payment verified and email sent successfully!" });
//     } else {
//       return res.status(400).json({ message: "Payment verification failed!" });
//     }
//   } catch (error) {
//     console.error("Payment Verify Error:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, courseId } = req.body;
    const userId = req.id;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !courseId || !userId) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    // Create Razorpay instance with credentials
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Fetch payment details using Razorpay API
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Check if payment was successful
    if (payment.status === 'captured') {
      // Get user and course details from the database
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ message: "User or Course not found!" });
      }

      // Select the first pricing option from the course (or loop through all)
      const pricingOptions = course.pricingOptions;  // All pricing options

      if (!pricingOptions || pricingOptions.length === 0) {
        return res.status(404).json({ message: "No pricing options found!" });
      }

      // Save the purchase in the CoursePurchase model
      await CoursePurchase.create({
        courseId,
        userId,
        amount: payment.amount / 100,  // Convert amount from cents to USD
        status: "completed",
        paymentId: razorpay_payment_id,
        pricingOption: pricingOptions.map(option => option.optionName).join(", "), // Store all option names
      });

      // Setup nodemailer transporter for email sending
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_EMAIL, // your email
          pass: process.env.SMTP_PASSWORD, // your email password or app password
        },
      });

      // Prepare email content
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.ADMIN_EMAIL,  // admin email
        subject: 'New Course Purchase',
        html: `
          <h3>New Course Purchase</h3>
          <p><strong>User Email:</strong> ${user.email}</p>
          <p><strong>Course Name:</strong> ${course.courseTitle}</p>
          <p><strong>Pricing Options:</strong> ${pricingOptions.map(option => option.optionName).join(", ")}</p>
          <p><strong>Price:</strong> $${(payment.amount / 100).toFixed(2)}</p>  <!-- Display price in USD -->
        `,
      };

      // Send email notification
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Payment verified and email sent successfully!" });
    } else {
      return res.status(400).json({ message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error("Payment Verify Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// ------------------------------
// 3. COURSE DETAIL WITH STATUS CHECK
// ------------------------------
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) return res.status(404).json({ message: "Course not found!" });

    const purchase = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed", // ✅ Only completed purchases
    });

    return res.status(200).json({
      course,
      purchased: !!purchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------------------
// 4. GET ALL PURCHASED COURSES
// ------------------------------
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
