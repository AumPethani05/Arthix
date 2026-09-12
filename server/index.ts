import { app } from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[ARTHIX Core Intelligence Server] Express API running on http://localhost:${PORT}/api/v1`);
});
