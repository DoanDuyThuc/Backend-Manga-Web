const userRouter = require('./userRouter')
const truyenRouter = require('./truyenRouter')

const router = (app) => {
    app.use('/user', userRouter);
    app.use('/truyen-tranh', truyenRouter);
}

module.exports = router;