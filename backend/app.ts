import express from "express";
import cors from "cors";

import formRoutes from "./routes/formRoutes";
import resultRoutes from "./routes/resultRoutes";
import aiRoutes from "./routes/aiRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", formRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/auth", authRoutes);

export default app;