// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: false,
//       });
//     }
//     const decode = await jwt.verify(token, process.env.SECRET_KEY);
//     if (!decode) {
//       return res.status(401).json({
//         message: "Invalid token",
//         success: false,
//       });
//     }
//     req.id = decode.userId;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default isAuthenticated;

// export const isAdmin = (req, res, next) => {
//   // assuming you've added user data in previous middleware
//   if (req.user?.role !== "instructor") {
//     return res.status(403).json({ message: "Forbidden: Admin only" });
//   }
//   next();
// };

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = 
      req.cookies.token || 
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;

