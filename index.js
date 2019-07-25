const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "welcome to JWT auth" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
