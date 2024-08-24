const express = require("express");
const cookieParser = require("cookie-parser");

const { errorHandler } = require("./controllers/errorController");
const { auth, allowedRoles } = require("./controllers/usersController");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("./db");
const User = require("./models/User");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Middleware
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

app.use(hpp());
app.use(xss());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.google.com", "http://localhost:8000"],
      // add other directives as needed
    },
  })
);
//"http://localhost:8000",
//http://localhost:5173
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
});
app.use(limiter);

// routes
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const vaccineRouter = require("./routes/vaccine");
const seeder = require("./seeding/seeder");

const ApiPrefix = "/api/v1";
app.use(`${ApiPrefix}/order`, ordersRouter);
app.use(`${ApiPrefix}/vaccine`, vaccineRouter);
app.use(`${ApiPrefix}/user`, usersRouter);

// tmp data seeding
app.get(`${ApiPrefix}/seed`, seeder);

app.get(/^\/dashboard(\/.*)?$/, async (req, res, next) => {
  try {
    const token = req.cookies?.token;
   
    if (!token || !(await jwt.verify(token, process.env.JWT_SECRET)))
      return res.redirect("/login");
    const { id } = jwt.decode(token);
    if (!id || !(await User.findById(id))) return res.redirect("/login");
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  } catch (err) {
    next(err);
  }
});
app.use(express.static("../dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// Error handling
app.use(errorHandler);

module.exports = app;
