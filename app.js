import express from "express";
import connectDB from "./config/connection.js";
import 'dotenv/config'
import adminRoutes from './routes/adminRoutes.js'
import hospitalRoutes from './routes/hospitalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import donorRoutes from './routes/donorRoutes.js'
import donationDetails from "./routes/donationDetailsRouter.js";

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/admin",adminRoutes)
app.use("/hospital",hospitalRoutes)
app.use("/user",userRoutes)
app.use('/donor',donorRoutes)
app.use('/donationDetails',donationDetails)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

connectDB();