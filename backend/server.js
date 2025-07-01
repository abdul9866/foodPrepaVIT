const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')
require('dotenv').config()

const cors = require('cors')

// Connect DB
connectDB()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://userfrontendvit-il02.onrender.com',
        'https://foodprepavitadmin.onrender.com'  // ✅ NEW: admin frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));




app.use("/image", express.static('uploads'))

// Routes
app.use('/api/food', require('./routes/foodRouter'))
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/cart', require('./routes/cartRouter'))
app.use('/api/order', require('./routes/orderRouter'))

app.get("/", (req, res) => {
    res.send("API Working")
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
