import express, { Request, Response } from "express";
import { ConnectDB } from "./db";
import UserRoute from "./routes/userRoute";
import carbonRoute from "./routes/carbonFootprintroutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001;

ConnectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CarbonWise API!");
});

app.use("/api", UserRoute);
app.use("/api/carbon", carbonRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
