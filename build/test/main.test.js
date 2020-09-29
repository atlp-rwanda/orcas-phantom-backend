"use strict";

require("core-js/modules/es.promise");

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test the welcome API', () => {
  test('It should return Welcome to orcas-phanthom backend site', async () => {
    const response = await (0, _supertest.default)(_index.default).get('/');
    expect(response.statusCode).toBe(200);
  });
});