import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connection from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;
// const corsOptions = {
//   credentials: true,
//   ///..other options
// };
app.use(cors({ origin:"http://localhost:3000", credentials:true }));
app.use(express.json()); // to parse incoming requests with json payloads
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})


server.listen(PORT, () => {
  connection();
  console.log(`Server is listening on port ${PORT}`);
});
