import express from "express";
import usersRoute from "./routes/usersRoute.js";
import connectDB from "./db.js";
const app = express();
const port = 3000;
//parse json
app.use(express.json());
//connectDB
connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//define the routes
app.use("/users", usersRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
