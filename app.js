import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Nook Attendance App running at port " + port);
});
