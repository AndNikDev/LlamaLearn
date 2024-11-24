const express = require("express");
const aiRoutes = require("./routes/aiRoutes");
const agentRoutes = require("./routes/agentRoutes");
const storageRoutes = require("./routes/storageRoutes");

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use("/api/ai", aiRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/storage", storageRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
