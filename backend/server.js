const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
require("colors");
const cors = require("cors");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./config/configdb");
const productRoutes = require("./routes/productsRoute");
const userRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");
dotenv.config();
//connect db
connectDb();

const app = express();

//bodyparser
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>ok</h1>");
});
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });

// app.get("/test-headers", (req, res) => {
//   console.log("Headers received at /test-headers:", req.headers);
//   res.send("Check server logs for headers");
// });

app.use(errorHandler);
const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on ${process.env.PORT}`.inverse);
});
