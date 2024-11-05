const userRouter = require('./userRouter')
const truyenRouter = require('./truyenRouter')
const AuthorRouter = require('./AuthorRouter')
const HomeRouter = require('./HomeRouter')

const router = (app) => {
    app.use('/user', userRouter);
    app.use('/truyen-tranh', truyenRouter);
    app.use('/author', AuthorRouter);
    app.use('/home', HomeRouter);
}

module.exports = router;