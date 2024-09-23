const userRouter = require('./userRouter')

const router = (app) => {
    app.use('/user', userRouter);
}

module.exports = router;