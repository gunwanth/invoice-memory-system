import express from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoice.routes.js";
import memoryRoutes from "./routes/memory.routes.js";
import demoRoutes from "./routes/demo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/invoice", invoiceRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/demo", demoRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});