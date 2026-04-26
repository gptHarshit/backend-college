const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const collegeRoutes = require("./routes/collegeRoutes");

const app = express();

// DB connect
connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// routes
app.use("/api/colleges", collegeRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
