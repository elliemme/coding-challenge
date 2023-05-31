import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users-routes.js";
import cors from "cors";
import moviesRoutes from "./controllers/movies-controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`😍🤞server is running on port ${PORT}`);
});
