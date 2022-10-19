require('express-async-errors');
const express = require('express');
const expressHttpProxy = require('express-http-proxy');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authController = require('../controllers/auth-controller');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.post('/login', authController.doLogin);

app.use(authController.validateBlackList);
app.post('/logout', authController.validateToken, authController.doLogout);

const options = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl;
  }
}
const movieServiceProxy = expressHttpProxy(process.env.MOVIES_API, options);
const cinemaCatalogServiceProxy = expressHttpProxy(process.env.CINEMA_CATALOG_API, options);
app.use('/movies', movieServiceProxy);
// Because app.use does not recognizes regular expressions
app.get(/cities|cinemas/, cinemaCatalogServiceProxy);

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`API Gateway is running at port ${port}`);
});

module.exports = server;