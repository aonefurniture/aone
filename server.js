import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";
import loginRouter from "./routes/logins.js";
import bestSellersRouter from "./routes/bestSellers.js";
import newLaunchesRouter from "./routes/newLaunches.js";
import subscribeRouter from "./routes/subscribe.js";
import feedRouter from "./routes/feeds.js";
import docCounts from "./routes/docCounts.js";
import orderRouter from "./routes/order.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

//database
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb coonected");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("database disconnected");
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/bestSeller", bestSellersRouter);
app.use("/api/newLaunch", newLaunchesRouter);
app.use("/api/products", productsRouter);
app.use("/api/login", loginRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/feed", feedRouter);
app.use("/api/order", orderRouter);
app.use("/api/count", docCounts);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./build"))); // Correct path to the build directory

// The catch-all route sends back the React app for any unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html")); // Correct path to index.html
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somethimg went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//server connect
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log("server is ready");
});
