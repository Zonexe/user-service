import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./utils/swagger";
import router from "./routes/userRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/users", router);

app.get("/ping", (req, res) => {
  res.json({ message: "Server is running!" });
});

export { app };
