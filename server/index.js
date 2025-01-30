const express = require("express");
const db = require("./database.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require('dotenv').config();

db.connect();

const port = process.env.PORT_NUMBER;
const host = process.env.FRONTEND_HOST;
const app = express();

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      rolling: true
    }
  })
);
app.use(cors({ origin: host, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes/login.js"));
app.use("/api", require("./routes/register.js"));
app.use("/api", require("./routes/generateOtp.js"));
app.use("/api", require("./routes/logout.js"));
app.use("/api", require("./routes/credentials.js"));
app.use("/api", require("./routes/uploadOrDeletePhoto.js"));
app.use("/api", require("./routes/predictMaize.js"));
app.use("/api", require("./routes/chat.js"));
app.use("/api", require("./routes/maize/addOrUpdate.js"));

app.get("/api", (req, res) => {
  res.json({ success: true, message: 'app is running' })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});