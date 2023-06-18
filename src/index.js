import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";
import root from "./routes/root.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors(corsOptions));
app.use(logger.logger);
// app.use(errorHandler);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", root);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not found" });
  } else {
    res.type('txt').send('404 Not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
