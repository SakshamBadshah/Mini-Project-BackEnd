const express = require("express");
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: [
    "https://dash-delivery.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/userRoutes"));

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const addressRoutes = require("./routes/addressRoutes");
app.use("/api/addresses", addressRoutes);

app.use("/api/cart", require("./routes/cartRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});