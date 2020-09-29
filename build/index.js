"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _config = _interopRequireDefault(require("./database/config/config"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/swaggerDocument', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to orcas-phanthom backend site'
}));
app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  res.send({
    status: error.status,
    message: error.message
  });
}); // test db

const db = new _sequelize.default(_config.default.development.url, {
  dialect: _config.default.development.dialect
});
db.authenticate().then(() => console.log('Database connected...')).catch(err => console.log(`Error ${err}`));
var _default = app;
exports.default = _default;