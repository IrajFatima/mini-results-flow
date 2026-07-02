import dotenv from "dotenv";
import { Request, Response } from "express";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;