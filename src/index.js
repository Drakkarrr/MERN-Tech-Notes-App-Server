import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoutes)
// app.use('/api/products', productRoutes)

app.get("/", (req, res) => {
    res.send("Server is now ready");
}
);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});