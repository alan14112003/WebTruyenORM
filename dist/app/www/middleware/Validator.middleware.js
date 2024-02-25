"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ValidatorMiddleware = {
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var validateResult = schema.validate(req.body);
      if (validateResult.error) {
        return res.status(422).json(validateResult.error);
      }
      next();
    };
  }
};
var _default = exports["default"] = ValidatorMiddleware;