const express = require("express");
const cors = require("cors");

require("dotenv").config();

const mongoConfig = require("./config");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const { authorize } = require("./middleware/authMiddleware");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authorize, userRoutes);

app.listen(port, () => {
  console.log("Listening on port:" + port);
  mongoConfig();
});
