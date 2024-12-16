const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path');

const router = require('./Routes/index')
const ConnectDb = require('./Config/ConnectDb')
const errorUpload = require('./Middlewares/errorUpload')


require('dotenv').config()

// connect to db
ConnectDb();

const app = express()

app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    next();
});

//config
// Cấu hình CORS(Cross-Origin Resource Sharing) 
app.use(cors({
    origin: `${process.env.PORT_FRONTEND}`, // Cho phép truy cập từ frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Cho phép các phương thức
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Nếu bạn sử dụng cookies hoặc headers đặc biệt
}));

app.options('*', cors());

// Middleware helmet để thiết lập các tiêu đề HTTP bảo mật
app.use(helmet());

// Sử dụng path.join để tạo đường dẫn tuyệt đối tới thư mục public/Ucomics
app.use('/public', express.static(path.join(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cookier parser
app.use(cookieParser())

// morgan để ghi lại log của các yêu cầu HTTP
app.use(morgan('dev'));

//lỗi upload ảnh
app.use(errorUpload);

// Router
router(app)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Manga app listening on port ${port}`)
})