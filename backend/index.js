import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/Db.js";
import Authrouter from "./routes.js/Authroutes.js";
import Voterouter from "./routes.js/VoteRoutes.js";
import Complaintrouter from "./routes.js/complaintRoutes.js";
import Chatrouter from "./routes.js/chatRoutes.js";
import Castrouter from "./routes.js/CastRoutes.js";
dotenv.config();
const app = express();
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Increase Payload Limit
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Route
app.get("/", (req, res) => {
  res.send("🚀 VoteMitra Backend Running");
});

app.use("/api", Authrouter);
app.use("/api", Voterouter);
app.use('/api',Complaintrouter)

app.use("/api/chat",Chatrouter)
app.use("/api",Voterouter);
app.use('/api',Castrouter)
// PORT
const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Failed:", error.message);
  }
};

startServer();