import express from "express";
import morgan from "morgan";
import studentRoutes from "./routes/students.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
