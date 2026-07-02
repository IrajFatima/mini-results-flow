import express from "express";
import cors from "cors";

import formRoutes from "./routes/formRoutes";
import resultRoutes from "./routes/resultRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", formRoutes);
app.use("/api/result", resultRoutes);

export default app;