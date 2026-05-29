import express from "express";
import cors from "cors";
import morgan from "morgan";

import testRoutes from "./routes/test.routes.js";
import githubRoutes from "./routes/github.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running!",
    });
});

//test route
app.use("/api/test", testRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/profiles", profileRoutes);

export default app;