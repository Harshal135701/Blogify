const express = require('express')
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = 8000
const app = express()
app.use(cookieParser());
const connectdb = require('./config/server')
connectdb()
require('dotenv').config();
const staticRoute = require('./routes/staticRoutes')
const userRoute = require('./routes/user')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use('/', staticRoute)
app.use('/', userRoute)

app.listen(PORT, () => {
    console.log(`The express is running on port ${PORT}`)
})