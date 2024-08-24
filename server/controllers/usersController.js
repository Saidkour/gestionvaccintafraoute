const User = require("../models/User");
const asyncWrapper = require("express-async-wrapper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const createJwt = (user, res, statusCode) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("token", token, {
    httpOnly: true,
    // sameSite: "None",
    secure: false,
    credentials: true,
    expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
    },
    token,
  });
};

exports.auth = asyncWrapper(async (req, res, next) => {
  // httpOnly token
  const token = req.cookies?.token;

  if (!token || !(await jwt.verify(token, process.env.JWT_SECRET)))
    return res.status(401).json({
      status: "error",
      message: "unautorized",
    });

  // jwt{id}
  const { id } = jwt.decode(token);

  // verify the id
  if (!id || !(await User.findById(id)))
    return res.status(401).json({
      status: "error",
      message: "unautorized",
    });

  const user = await User.findById(id);
  req.user = user;
  next();
});

exports.getCurrentUser = asyncWrapper(async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    email: req.user.email,
  };
  res.json({
    status: "success",
    user,
  });
});

exports.login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return handleFaildLogin(res);

  if (!(await bcrypt.compare(password, user.password)))
    return handleFaildLogin(res);

  createJwt(user, res, 200);
});

const handleFaildLogin = (res) => {
  return res.status(401).json({
    status: "unautorized",
    message: "Invalide User name or password",
  });
};

exports.signUp = asyncWrapper(async (req, res, next) => {
  const { name, lastName, role, email, password } = req.body;
  if (!name || !lastName || !role || !email || !password)
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
    });

  const user = await User.create({
    name,
    lastName,
    role,
    email,
    password,
  });

  createJwt(user, res, 201);
});

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
  });
};

exports.allowedRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user.role))
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    next();
  };
};

exports.passwordResetToken = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ status: "error", message: "Bad Request" });

  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ status: "error", message: "Not Found" });
  const { id } = user;
  // random token
  const token = crypto.randomBytes(32).toString("hex");

  const result = await User.findByIdAndUpdate(id, {
    passwordReset: {
      token: await bcrypt.hash(token, 12),
      expires: Date.now() + 60 * 60 * 1000,
    },
  });
  console.log(result);
  if (!result)
    res.status(500).json({
      status: "error",
      message: "Couldn't generate passwordReset token for this user ",
    });

  sendEmailNodeMailer(token, email, res);
});

exports.passwordResetTokenVerify = asyncWrapper(async (req, res, next) => {
  const { newPassword, token, email } = req.body;

  // console.log(newPassword, token, email);
  if (!token || !email || !newPassword)
    return res.status(400).json({ status: "error", message: "Bad Request" });

  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ status: "error", message: "Not Found" });

  if (user.passwordReset.expires < Date.now())
    res.status(401).json({ status: "error", message: "Expired token" });

  if (!(await bcrypt.compare(token, user.passwordReset.token)))
    res.status(401).json({ status: "error", message: "Invalid token" });

  if (
    await User.findByIdAndUpdate(user.id, {
      password: newPassword,
      passwordReset: { token: null, expires: null },
    })
  )
    res.json({
      status: "success",
      message: "Password reset successful",
    });
  else
    res
      .status(500)
      .json({ status: "error", message: "Couldn't reset password" });
});

const sendEmailNodeMailer = async (token, email, res) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    port: 587,
    host: "smtp.gmail.com",
    subject: "Password Reset",
    html: `<h1>Click on the link to reset your password</h1>
      <p>${process.env.CLIENT_URL}/newpassword?token=${token}&email=${email}</p>`,
    secure: false,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    if (result) res.json({ status: "success", message: "Email sent" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", error, message: "Couldn't send email" });
  }
};

exports.updateUser = asyncWrapper(async (req, res) => {
  const { name, lastName, email, password, newPassword } = req.body;

  let newUser = {};

  if (newPassword) {
    newUser = { password: newPassword };
  } else {
    if (!name || !lastName || !email || !password)
      return res.status(400).json({ status: "error", message: "Bad Request" });
    newUser = { name, lastName, email };
  }

  if (!(await bcrypt.compare(password, req.user.password)))
    return res
      .status(401)
      .json({ status: "error", message: "Invalid password" });

  const user = await User.findById(req.user.id);
  if (!user)
    return res.status(404).json({ status: "error", message: "Not Found" });

  const resUser = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
  });

  console.log(resUser);
  if (!resUser)
    return res.status(500).json({
      status: "error",
      message: "Couldn't update user",
    });

  createJwt(resUser, res, 200);
});
