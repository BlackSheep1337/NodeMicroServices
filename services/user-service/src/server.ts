import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app
  .listen(PORT)
  .on("listening", () => console.log(`User service running on port ${PORT}`));